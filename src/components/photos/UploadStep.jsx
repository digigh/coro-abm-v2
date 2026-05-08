// ─────────────────────────────────────────────
// UploadStep.jsx — Step 3: Photo Upload Dashboard
// ─────────────────────────────────────────────
import React, { useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UploadCloud, Image as ImageIcon, AlertCircle, Loader2 } from 'lucide-react';
import PhotoPreviewCard from './PhotoPreviewCard';

const UploadStep = ({
  userData,
  photos,
  isUploading,
  uploadPhase,
  globalError,
  onFilesSelected,
  onRemove,
  onRetryCompress,
  onSubmit
}) => {
  const fileInputRef = useRef(null);
  const [dragActive, setDragActive] = React.useState(false);

  const readyCount     = photos.filter((p) => p.status === 'ready').length;
  const allPhotosReady = photos.length > 0 && photos.every((p) => p.status === 'ready');
  const hasError       = photos.some((p) => p.status === 'error');
  const isProcessing   = photos.some((p) => p.status === 'compressing');
  const canSubmit      = allPhotosReady && !isUploading;
  const dropzoneFull   = photos.length >= 2;

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (dropzoneFull || isUploading) return;
    setDragActive(e.type === 'dragenter' || e.type === 'dragover');
  }, [dropzoneFull, isUploading]);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (dropzoneFull || isUploading) return;
    if (e.dataTransfer.files?.length) {
      onFilesSelected(e.dataTransfer.files);
    }
  }, [dropzoneFull, isUploading, onFilesSelected]);

  const handleFileInputChange = (e) => {
    if (e.target.files?.length) {
      onFilesSelected(e.target.files);
      e.target.value = ''; // reset so same file can be re-selected after remove
    }
  };

  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
      className="photos-step-container photos-upload-step"
    >
      <motion.div
        className="photos-user-badge"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="badge-avatar">
          {userData.name?.charAt(0)?.toUpperCase() || 'U'}
        </div>
        <div className="badge-info">
          <div className="badge-name">{userData.name}</div>
          <div className="badge-details">
            {userData.division} <span className="badge-sep">•</span> {userData.business_unit}
          </div>
        </div>
      </motion.div>

      {/* ─── Processing / Uploading Loader ─── */}
      <AnimatePresence>
        {(isProcessing || isUploading) && (
          <motion.div
            className="photos-processing-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="processing-card">
              {/* Pulsing ring loader */}
              <div className="processing-spinner-wrapper">
                <div className="processing-ring ring-1" />
                <div className="processing-ring ring-2" />
                <div className="processing-ring ring-3" />
                <div className="processing-center-dot">
                  {isUploading
                    ? <UploadCloud size={28} style={{ color: '#38bdf8' }} />
                    : <Loader2 size={28} className="spin-icon" style={{ color: '#a78bfa' }} />
                  }
                </div>
              </div>

              <motion.p
                className="processing-label"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
              >
                {isUploading
                  ? 'Submitting your photos…\nThis may take a moment.'
                  : 'Optimizing your images…\nPlease wait.'}
              </motion.p>

              {isUploading && (
                <p className="processing-sublabel">
                  Do not close this window
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drop Zone */}
      <motion.div
        className={`photos-dropzone ${dragActive ? 'dz-active' : ''} ${dropzoneFull ? 'dz-full' : ''} ${isUploading ? 'dz-locked' : ''}`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => !dropzoneFull && !isUploading && fileInputRef.current?.click()}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp"
          multiple
          style={{ display: 'none' }}
          onChange={handleFileInputChange}
          disabled={dropzoneFull || isUploading}
        />

        <motion.div
          animate={dragActive ? { scale: 1.08 } : { scale: 1 }}
          transition={{ type: 'spring', stiffness: 400 }}
          className="dropzone-inner"
        >
          <div className="dropzone-icon-wrapper">
            <UploadCloud size={40} className={`dropzone-icon ${dragActive ? 'dz-icon-active' : ''}`} />
          </div>
          <h4>
            {dropzoneFull
              ? '2 photos selected — ready to submit'
              : dragActive
                ? 'Drop it here!'
                : 'Click or drag photos here'}
          </h4>
          <p>JPG · PNG · WEBP &nbsp;|&nbsp; Max 2 photos &nbsp;|&nbsp; Max 10 MB each</p>
        </motion.div>
      </motion.div>

      {/* Global Error */}
      <AnimatePresence>
        {globalError && (
          <motion.div
            className="photos-error-msg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <AlertCircle size={16} />
            <span>{globalError}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Photo Preview Grid */}
      <AnimatePresence>
        {photos.length > 0 && (
          <motion.div
            className="photos-preview-section"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <div className="preview-header">
              <span className="preview-count">{photos.length} / 2 photos selected</span>
              {hasError && <span className="preview-error-hint">Retry or remove failed photos</span>}
            </div>

            <div className="photos-grid">
              <AnimatePresence mode="popLayout">
                {photos.map((photo) => (
                  <PhotoPreviewCard
                    key={photo.id}
                    photo={photo}
                    onRemove={onRemove}
                    onRetry={onRetryCompress}
                    isUploading={isUploading}
                  />
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit Button */}
      <motion.button
        className="photos-btn-primary"
        onClick={onSubmit}
        disabled={!canSubmit}
        whileHover={canSubmit ? { scale: 1.05 } : {}}
        whileTap={canSubmit ? { scale: 0.95 } : {}}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ marginTop: '1rem' }}
      >
        {isUploading ? (
          <>
            <Loader2 size={22} className="spin-icon" />
            <span>Uploading…</span>
          </>
        ) : (
          <>
            <ImageIcon size={22} />
            <span>
              {photos.length === 0
                ? 'Upload'
                : `Submit ${readyCount} Photo${readyCount !== 1 ? 's' : ''}`}
            </span>
          </>
        )}
      </motion.button>
    </motion.div>
  );
};

export default UploadStep;
