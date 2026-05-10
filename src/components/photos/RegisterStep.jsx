// ─────────────────────────────────────────────
// RegisterStep.jsx — Step 2: New User Registration
// ─────────────────────────────────────────────
import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, AlertCircle, Loader2 } from 'lucide-react';

const fields = [
  { key: 'name',          label: 'Full Name',      placeholder: 'e.g. Ankush Sharma',    type: 'text' },
  { key: 'division',      label: 'Division',        placeholder: 'e.g. Sales & Marketing', type: 'text' },
  { key: 'business_unit', label: 'Business Unit',   placeholder: 'e.g. ABM North',         type: 'text' }
];

const RegisterStep = ({ employeeId, userData, onChange, onSubmit, onBack, loading, error }) => {
  return (
    <motion.div
      key="step2"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ type: 'spring', damping: 28, stiffness: 260 }}
      className="photos-step-container"
    >
      <motion.div
        className="photos-icon-container"
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.1, type: 'spring', stiffness: 300 }}
      >
        <UserPlus size={32} className="photos-primary-icon" />
      </motion.div>

      <h2 className="step-heading">Complete Your Profile</h2>
      <p className="photos-hint">
        Welcome! You're registered as <strong className="emp-id-highlight">{employeeId}</strong>.
        <br />Fill in your details to join the Photo Contest.
      </p>

      <form onSubmit={onSubmit} className="photos-form" noValidate>
        {fields.map((field, i) => (
          <motion.div
            key={field.key}
            className="photos-input-group-centered"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 + i * 0.07 }}
          >
            <label className="photos-label-minimal" htmlFor={`reg-${field.key}`}>{field.label}</label>
            <input
              id={`reg-${field.key}`}
              type={field.type}
              className={`photos-input ${error && !userData[field.key]?.trim() ? 'input-error' : ''}`}
              placeholder={field.placeholder}
              value={userData[field.key] || ''}
              onChange={(e) => onChange(field.key, e.target.value)}
              disabled={loading}
              maxLength={100}
              autoComplete="off"
            />
          </motion.div>
        ))}

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
          disabled={loading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <>
              <Loader2 size={20} className="spin-icon" />
              <span>Saving…</span>
            </>
          ) : (
            <span>Register & Continue →</span>
          )}
        </motion.button>

        <motion.button
          type="button"
          className="photos-btn-secondary-text"
          onClick={onBack}
          disabled={loading}
          whileHover={{ opacity: 1, x: -5 }}
        >
          ← Change ID
        </motion.button>
      </form>
    </motion.div>
  );
};

export default RegisterStep;
