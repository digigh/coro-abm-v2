// ─────────────────────────────────────────────
// imageUtils.js — Production Image Processing
// ─────────────────────────────────────────────

const MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10MB hard limit
const MAX_DIMENSION = 1600;                    // px — longest side
const JPEG_QUALITY = 0.82;                     // Tuned for <700KB output
const VALID_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

/**
 * Validates a file before any processing.
 * Returns { valid: bool, error: string|null }
 */
export const validateFile = (file) => {
  if (!file) return { valid: false, error: 'No file provided.' };

  if (!VALID_TYPES.includes(file.type)) {
    return {
      valid: false,
      error: `"${file.name}" is not a supported format. Use JPG, PNG, or WEBP.`
    };
  }

  if (file.size === 0) {
    return { valid: false, error: `"${file.name}" appears to be empty or corrupted.` };
  }

  if (file.size > MAX_FILE_SIZE_BYTES) {
    const mb = (file.size / (1024 * 1024)).toFixed(1);
    return {
      valid: false,
      error: `"${file.name}" is ${mb}MB. Maximum allowed size is 10MB.`
    };
  }

  return { valid: true, error: null };
};

/**
 * Compresses and resizes an image file.
 * Returns Promise<{ dataUrl: string, base64: string, sizeKB: number }>
 */
export const compressImage = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = (event) => {
      const img = new Image();

      img.onload = () => {
        try {
          const canvas = document.createElement('canvas');
          let { width, height } = img;

          // Scale down proportionally if too large
          if (width > height && width > MAX_DIMENSION) {
            height = Math.round((height * MAX_DIMENSION) / width);
            width = MAX_DIMENSION;
          } else if (height > MAX_DIMENSION) {
            width = Math.round((width * MAX_DIMENSION) / height);
            height = MAX_DIMENSION;
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          // White background for transparent PNGs converted to JPEG
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);

          const dataUrl = canvas.toDataURL('image/jpeg', JPEG_QUALITY);
          const base64 = dataUrl.split(',')[1];
          const sizeKB = Math.round((base64.length * 3) / 4 / 1024);

          // Free canvas memory immediately
          canvas.width = 0;
          canvas.height = 0;

          resolve({ dataUrl, base64, sizeKB });
        } catch (err) {
          reject(new Error(`Failed to process image "${file.name}". It may be corrupted.`));
        }
      };

      img.onerror = () => {
        reject(new Error(`Cannot read "${file.name}". The file may be corrupted.`));
      };

      img.src = event.target.result;
    };

    reader.onerror = () => {
      reject(new Error(`Cannot read "${file.name}". Please try again.`));
    };

    reader.readAsDataURL(file);
  });
};

/**
 * Generates the standardized image name per the naming spec:
 * employeeid_cleanname_YYYYMMDD_HHMMSS_photonum_sessionnum
 */
export const generateImageName = (employeeId, name, photoNum, sessionNum) => {
  const now = new Date();
  const pad = (n) => String(n).padStart(2, '0');

  const date = `${now.getFullYear()}${pad(now.getMonth() + 1)}${pad(now.getDate())}`;
  const time = `${pad(now.getHours())}${pad(now.getMinutes())}${pad(now.getSeconds())}`;
  const cleanName = name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const cleanId = String(employeeId).toUpperCase().replace(/[^A-Z0-9]/g, '');

  return `${cleanId}_${cleanName}_${date}_${time}_${photoNum}_${sessionNum}`;
};
