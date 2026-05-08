// ─────────────────────────────────────────────
// usePhotoUpload.js — Core Upload Hook
// ─────────────────────────────────────────────

import { useState, useCallback, useRef } from 'react';
import { validateFile, compressImage, generateImageName } from '../utils/imageUtils';
import {
  retryWithBackoff,
  buildPayload,
  getUploadSession,
  incrementUploadSession,
  minimumDelay
} from '../utils/uploadUtils';

const UPLOAD_API_URL   = import.meta.env.VITE_UPLOAD_API_URL || '';
const UPLOAD_API_TOKEN = import.meta.env.VITE_UPLOAD_API_TOKEN || '';
const MAX_PHOTOS       = 2;

console.info('[usePhotoUpload] Hook loaded with URL:', UPLOAD_API_URL ? 'PRESENT' : 'MISSING', 'Token:', UPLOAD_API_TOKEN ? 'PRESENT' : 'MISSING');

// Photo status lifecycle:
// idle → compressing → ready → uploading → success | error

const makePhotoId = () => Math.random().toString(36).slice(2, 10);

const usePhotoUpload = () => {
  const [photos, setPhotos]             = useState([]);
  const [isUploading, setIsUploading]   = useState(false);
  const [globalError, setGlobalError]   = useState('');
  const [uploadPhase, setUploadPhase]   = useState('idle'); // idle | processing | uploading | done
  const isUploadingRef                  = useRef(false);    // ref to block duplicate clicks

  const updatePhoto = useCallback((id, patch) => {
    setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, ...patch } : p)));
  }, []);

  const removePhoto = useCallback((id) => {
    setPhotos((prev) => prev.filter((p) => p.id !== id));
    setGlobalError('');
  }, []);

  const clearAll = useCallback(() => {
    setPhotos([]);
    setGlobalError('');
    setUploadPhase('idle');
  }, []);

  /**
   * Processes new files: validates → adds to list → compresses in parallel.
   */
  const processFiles = useCallback(async (files) => {
    setGlobalError('');
    const fileArr = Array.from(files);

    const availableSlots = MAX_PHOTOS - photos.length;
    if (availableSlots <= 0) {
      setGlobalError('Maximum 2 images already selected.');
      return;
    }

    const toProcess = fileArr.slice(0, availableSlots);
    if (fileArr.length > availableSlots) {
      setGlobalError(`Only ${availableSlots} more image(s) can be added. Extra files were ignored.`);
    }

    // Validate all first, before adding to list
    const validatedFiles = [];
    for (const file of toProcess) {
      const { valid, error } = validateFile(file);
      if (!valid) {
        setGlobalError(error);
        return; // Stop on first invalid file
      }
      validatedFiles.push(file);
    }

    // Add all as 'compressing' entries simultaneously
    const newEntries = validatedFiles.map((file) => ({
      id: makePhotoId(),
      file,
      status: 'compressing',
      preview: null,
      base64: null,
      sizeKB: null,
      error: null
    }));

    setPhotos((prev) => [...prev, ...newEntries]);
    setUploadPhase('processing');

    // Compress all in parallel — non-blocking
    await Promise.all(
      newEntries.map(async (entry) => {
        try {
          const { dataUrl, base64, sizeKB } = await compressImage(entry.file);
          updatePhoto(entry.id, { status: 'ready', preview: dataUrl, base64, sizeKB });
        } catch (err) {
          console.error('[usePhotoUpload] compress:', err);
          updatePhoto(entry.id, { status: 'error', error: err.message });
          setGlobalError(err.message);
        }
      })
    );

    setUploadPhase('idle');
  }, [photos.length, updatePhoto]);

  /**
   * Retries compression on an errored photo.
   */
  const retryCompress = useCallback(async (id) => {
    const photo = photos.find((p) => p.id === id);
    if (!photo) return;

    updatePhoto(id, { status: 'compressing', error: null });
    try {
      const { dataUrl, base64, sizeKB } = await compressImage(photo.file);
      updatePhoto(id, { status: 'ready', preview: dataUrl, base64, sizeKB });
    } catch (err) {
      updatePhoto(id, { status: 'error', error: err.message });
    }
  }, [photos, updatePhoto]);

  /**
   * Main upload: builds payload → POST to API with retry → success.
   * Includes minimum delay for UX and Supabase write settling.
   */
  const uploadAll = useCallback(async (userData, employeeId) => {
    console.log('[usePhotoUpload] uploadAll initiated', { userData, employeeId, photosCount: photos.length });

    // Guard against double-clicks
    if (isUploadingRef.current) {
      console.warn('[usePhotoUpload] Upload already in progress, ignoring.');
      return;
    }

    const readyPhotos = photos.filter((p) => p.status === 'ready');
    console.log('[usePhotoUpload] Ready photos:', readyPhotos.length);

    if (readyPhotos.length === 0) {
      setGlobalError('Please select at least one photo first.');
      return;
    }

    if (photos.some((p) => p.status === 'compressing')) {
      setGlobalError('Please wait — images are still being processed.');
      return;
    }

    console.log('[usePhotoUpload] Guards passed, starting upload...');
    setGlobalError('');
    setIsUploading(true);
    setUploadPhase('uploading');
    isUploadingRef.current = true;

    if (!UPLOAD_API_URL) {
      setGlobalError('Upload API URL is not configured.');
      setIsUploading(false);
      isUploadingRef.current = false;
      return;
    }

    // Mark each photo as uploading
    readyPhotos.forEach((p) => updatePhoto(p.id, { status: 'uploading' }));

    try {
      const sessionNum = getUploadSession(employeeId);

      const photosWithNames = {
        sessionNum,
        items: readyPhotos.map((p, i) => ({
          photoNum: i + 1,
          imageName: generateImageName(employeeId, userData.name, i + 1, sessionNum),
          base64: p.base64
        }))
      };

      const payload = buildPayload(userData, employeeId, photosWithNames);

      // Run upload + minimum delay in parallel — whichever takes longer wins
      await Promise.all([
        retryWithBackoff(async () => {
          console.info('[usePhotoUpload] Sending payload to:', UPLOAD_API_URL, payload);

          const res = await fetch(UPLOAD_API_URL, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${UPLOAD_API_TOKEN}`
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(30000) // 30s timeout
          });

          if (!res.ok) {
            throw new Error(`Server error ${res.status}: ${res.statusText}`);
          }

          const result = await res.json();
          console.info('[usePhotoUpload] Server response:', result);

          if (!result.status) {
            throw new Error(result.message || 'Upload failed');
          }
        }, 3),

        // Minimum 2.2s so the loading UI feels intentional (not a flash)
        minimumDelay(2200)
      ]);

      // Success — increment session, mark photos done
      incrementUploadSession(employeeId);
      readyPhotos.forEach((p) => updatePhoto(p.id, { status: 'success', base64: null })); // clear base64 from memory
      setUploadPhase('done');

    } catch (err) {
      console.error('[usePhotoUpload] CRITICAL UPLOAD ERROR:', err);
      readyPhotos.forEach((p) => updatePhoto(p.id, { status: 'error', error: 'Upload failed. Tap retry.' }));
      setGlobalError(`Upload failed: ${err.message}`);
      setUploadPhase('idle');
      throw err; // Re-throw so the caller (PhotosScreen) knows it failed
    } finally {
      setIsUploading(false);
      isUploadingRef.current = false;
    }
  }, [photos, updatePhoto]);

  return {
    photos,
    isUploading,
    globalError,
    uploadPhase,
    processFiles,
    removePhoto,
    retryCompress,
    uploadAll,
    clearAll,
    setGlobalError
  };
};

export default usePhotoUpload;
