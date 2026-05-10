/**
 * Cloudinary Utility to generate optimized URLs
 * Standard transformations: f_auto (auto format), q_auto (auto quality)
 */

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dznmvg8v3';

/**
 * Generates an optimized Cloudinary URL for an image
 * @param {string} publicId - The public ID of the image in Cloudinary
 * @param {object} options - Transformation options (width, height, crop, etc.)
 * @returns {string} - The full optimized URL
 */
export const getOptimizedImageUrl = (publicId, options = {}) => {
  if (!publicId) return '';
  
  // If it's already a full URL (not from Cloudinary), return it as is
  if (publicId.startsWith('http')) return publicId;

  const { width, height, crop = 'fill', gravity = 'auto' } = options;
  
  const transformations = ['f_auto', 'q_auto'];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (width && height) transformations.push(`c_${crop}`, `g_${gravity}`);

  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transformations.join(',')}/${publicId}`;
};

/**
 * Generates an optimized Cloudinary URL for a video
 * @param {string} publicId - The public ID of the video in Cloudinary
 * @returns {string} - The full optimized URL
 */
export const getOptimizedVideoUrl = (publicId) => {
  if (!publicId) return '';
  if (publicId.startsWith('http')) return publicId;

  // For videos, we use f_auto to get the best container (mp4/webm) and q_auto
  return `https://res.cloudinary.com/${CLOUD_NAME}/video/upload/f_auto,q_auto/${publicId}`;
};
