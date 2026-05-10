// ─────────────────────────────────────────────
// PhotoPreviewCard.jsx — Individual Photo Card
// ─────────────────────────────────────────────
import React from 'react';
import { motion } from 'framer-motion';
import { X, RefreshCw, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const statusConfig = {
  compressing: { label: 'Optimizing…',  color: '#38bdf8', icon: <Loader2 size={14} className="spin-icon" /> },
  ready:       { label: 'Ready',         color: '#10b981', icon: <CheckCircle2 size={14} /> },
  uploading:   { label: 'Uploading…',   color: '#a78bfa', icon: <Loader2 size={14} className="spin-icon" /> },
  success:     { label: 'Uploaded ✓',   color: '#10b981', icon: <CheckCircle2 size={14} /> },
  error:       { label: 'Failed',        color: '#f87171', icon: <AlertCircle size={14} /> }
};

const PhotoPreviewCard = ({ photo, onRemove, onRetry, isUploading }) => {
  const cfg = statusConfig[photo.status] || statusConfig.compressing;
  const isProcessing = photo.status === 'compressing' || photo.status === 'uploading';

  return (
    <motion.div
      className="photo-preview-card"
      layout
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.85 }}
      transition={{ type: 'spring', damping: 22, stiffness: 280 }}
    >
      {/* Shimmer overlay while compressing */}
      {photo.status === 'compressing' && (
        <div className="photo-shimmer-overlay">
          <div className="photo-shimmer-bar" />
        </div>
      )}

      {/* Image Preview */}
      {photo.preview ? (
        <img src={photo.preview} alt="Preview" className="photo-thumbnail" />
      ) : (
        <div className="photo-placeholder">
          <Loader2 size={28} className="spin-icon" style={{ color: '#38bdf8' }} />
        </div>
      )}

      {/* Upload progress overlay */}
      {photo.status === 'uploading' && (
        <div className="photo-uploading-overlay">
          <div className="photo-upload-spinner" />
        </div>
      )}

      {/* Success checkmark overlay */}
      {photo.status === 'success' && (
        <div className="photo-success-overlay">
          <CheckCircle2 size={36} color="#10b981" />
        </div>
      )}

      {/* Status Badge */}
      <div className="photo-status-badge" style={{ background: `${cfg.color}22`, borderColor: `${cfg.color}55`, color: cfg.color }}>
        {cfg.icon}
        <span>{cfg.label}</span>
      </div>

      {/* Action Buttons */}
      {!isUploading && !isProcessing && photo.status !== 'success' && (
        <div className="photo-actions">
          {photo.status === 'error' && onRetry && (
            <button
              className="photo-action-btn retry-btn"
              onClick={() => onRetry(photo.id)}
              title="Retry"
            >
              <RefreshCw size={14} />
            </button>
          )}
          <button
            className="photo-action-btn remove-btn"
            onClick={() => onRemove(photo.id)}
            title="Remove"
          >
            <X size={14} />
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default PhotoPreviewCard;
