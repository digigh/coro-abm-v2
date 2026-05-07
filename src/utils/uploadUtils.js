// ─────────────────────────────────────────────
// uploadUtils.js — Production Upload Utilities
// ─────────────────────────────────────────────

/**
 * Strips HTML tags and dangerous characters from user input.
 * Prevents XSS in Supabase writes and API payloads.
 */
export const sanitizeInput = (str) => {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<[^>]*>/g, '')           // strip HTML tags
    .replace(/[<>"'`]/g, '')           // strip remaining dangerous chars
    .trim()
    .slice(0, 200);                    // hard length cap
};

/**
 * Retries an async function with exponential backoff.
 * Delays: 1s → 2s → 4s
 * @param {Function} fn  — async function that may throw
 * @param {number} maxRetries
 * @returns Promise
 */
export const retryWithBackoff = async (fn, maxRetries = 3) => {
  let lastError;
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    try {
      return await fn();
    } catch (err) {
      lastError = err;
      if (attempt < maxRetries - 1) {
        const delay = Math.pow(2, attempt) * 1000; // 1000, 2000, 4000ms
        await new Promise((res) => setTimeout(res, delay));
      }
    }
  }
  throw lastError;
};

/**
 * Builds the validated upload payload per the API spec.
 */
export const buildPayload = (userData, employeeId, photosWithNames) => {
  return {
    employee_id: sanitizeInput(employeeId),
    name: sanitizeInput(userData.name),
    division: sanitizeInput(userData.division),
    business_unit: sanitizeInput(userData.business_unit),
    upload_session: photosWithNames.sessionNum,
    photos: photosWithNames.items.map((p) => ({
      photo_number: p.photoNum,
      image_name: p.imageName,
      image_base64: p.base64
    }))
  };
};

/**
 * Gets the current upload session number from localStorage (per user).
 * Session starts at 1 and increments on each successful upload.
 */
export const getUploadSession = (employeeId) => {
  const key = `pcs_${employeeId}`;
  return parseInt(localStorage.getItem(key) || '0', 10) + 1;
};

/**
 * Increments and persists the upload session counter.
 */
export const incrementUploadSession = (employeeId) => {
  const key = `pcs_${employeeId}`;
  const current = parseInt(localStorage.getItem(key) || '0', 10);
  localStorage.setItem(key, String(current + 1));
};

/**
 * Simulates a minimum realistic processing delay (ms).
 * Ensures the loading UI feels intentional, not instant.
 * This also gives time for Supabase writes to settle.
 */
export const minimumDelay = (ms = 1800) =>
  new Promise((resolve) => setTimeout(resolve, ms));
