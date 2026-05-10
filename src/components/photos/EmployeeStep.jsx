// ─────────────────────────────────────────────
// EmployeeStep.jsx — Step 1: Employee ID Entry
// ─────────────────────────────────────────────
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, AlertCircle, Loader2 } from 'lucide-react';

const EmployeeStep = ({ employeeId, onChange, onSubmit, loading, error }) => {
  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
      className="photos-step-container"
    >
      {/* Animated Icon */}
      <motion.div
        className="photos-icon-container"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.15, type: 'spring', stiffness: 300 }}
      >
        <div className="icon-glow-ring" />
        <Camera size={44} className="photos-primary-icon" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="step-heading">Enter Employee ID</h2>
        <p className="photos-hint">Verify your identity to participate in the Photo Contest.</p>
      </motion.div>

      <form onSubmit={onSubmit} className="photos-form" noValidate>
        <motion.div
          className="photos-input-group"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.28 }}
        >
          <input
            id="employee-id-input"
            type="text"
            className={`photos-input ${error ? 'input-error' : ''}`}
            placeholder="e.g. EMP12345"
            value={employeeId}
            onChange={(e) => onChange(e.target.value.toUpperCase().replace(/[^A-Z0-9]/g, ''))}
            disabled={loading}
            maxLength={20}
            autoComplete="off"
            autoFocus
          />
        </motion.div>

        {error && (
          <motion.div
            className="photos-error-msg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </motion.div>
        )}

        <motion.button
          type="submit"
          className="photos-btn-primary"
          disabled={loading || !employeeId.trim()}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="spin-icon" />
              <span>Verifying…</span>
            </>
          ) : (
            <span>Continue →</span>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default EmployeeStep;
