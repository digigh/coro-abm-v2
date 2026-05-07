// ─────────────────────────────────────────────
// PhotosScreen.jsx — Slim Step Orchestrator (v2)
// ─────────────────────────────────────────────
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

import useEmployeeAuth from '../hooks/useEmployeeAuth';
import usePhotoUpload  from '../hooks/usePhotoUpload';
import useDraftPersist, { loadDraft, clearDraft } from '../hooks/useDraftPersist';

import EmployeeStep  from '../components/photos/EmployeeStep';
import RegisterStep  from '../components/photos/RegisterStep';
import UploadStep    from '../components/photos/UploadStep';
import SuccessScreen from '../components/photos/SuccessScreen';

import './PhotosScreen.css';

// Step indicator labels
const STEPS = ['Verify', 'Profile', 'Upload'];

const PhotosScreen = ({ onBack }) => {
  const [step, setStep]             = useState(1);
  const [employeeId, setEmployeeId] = useState('');
  const [userData, setUserData]     = useState({ name: '', division: '', business_unit: '' });
  
  useEffect(() => {
    auth.clearError();
  }, [step]);

  const auth   = useEmployeeAuth();
  const upload = usePhotoUpload();

  // ── Draft restore on mount ──
  useEffect(() => {
    const draft = loadDraft();
    if (draft) {
      if (draft.employeeId) setEmployeeId(draft.employeeId);
      if (draft.userData)   setUserData(draft.userData);
      if (draft.step && draft.step <= 3) setStep(draft.step);
    }
  }, []);

  // ── Auto-save draft on every change ──
  useDraftPersist({ step, employeeId, userData });

  // ── Step 1: Check employee ──
  const handleCheckEmployee = async (e) => {
    e.preventDefault();
    auth.clearError();
    const result = await auth.checkEmployee(employeeId);
    if (result.found) {
      setUserData({
        name:          result.data.name,
        division:      result.data.division,
        business_unit: result.data.business_unit
      });
      setStep(3);
    } else if (!auth.error) {
      // No error = user simply not found → show registration
      setStep(2);
    }
  };

  // ── Step 2: Register new user ──
  const handleRegister = async (e) => {
    e.preventDefault();
    auth.clearError();
    const result = await auth.registerEmployee(employeeId, userData);
    if (result.success) setStep(3);
  };

  const handleUserDataChange = (key, value) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  // ── Step 3: Upload ──
  const handleSubmit = () => {
    upload.uploadAll(userData, employeeId);
  };

  const handleUploadMore = () => {
    upload.clearAll();
    // Stay on step 3 — user stays logged in
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
      auth.clearError();
    } else {
      clearDraft();
      onBack();
    }
  };

  const isDone = upload.uploadPhase === 'done';

  return (
    <div className="photos-screen-container">
      {/* Ambient background */}
      <div className="photos-bg-aurora" />
      <div className="photos-bg-grid" />

      <div className="photos-content-wrapper">

        {/* ── Header ── */}
        <header className="photos-header">
          <motion.button
            className="photos-back-btn"
            onClick={handleBack}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            aria-label="Go back"
          >
            <ArrowLeft size={22} />
          </motion.button>

          <div className="photos-header-titles">
            <h1 className="photos-title">Photo Contest</h1>
            <p className="photos-subtitle">ABM 2026 Summit · Share Your Moments</p>
          </div>
        </header>

        {/* ── Step Progress Indicator ── */}
        {!isDone && (
          <motion.div
            className="step-progress"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {STEPS.map((label, i) => {
              const stepNum    = i + 1;
              const isActive   = step === stepNum;
              const isComplete = step > stepNum;
              return (
                <React.Fragment key={label}>
                  <div className={`step-node ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}>
                    <div className="step-circle">
                      {isComplete ? '✓' : stepNum}
                    </div>
                    <span className="step-label">{label}</span>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={`step-connector ${isComplete ? 'filled' : ''}`} />
                  )}
                </React.Fragment>
              );
            })}
          </motion.div>
        )}

        {/* ── Main Card ── */}
        <main className="photos-main-card glass-panel">
          <AnimatePresence mode="wait">

            {isDone ? (
              <SuccessScreen
                key="success"
                userData={userData}
                onUploadMore={handleUploadMore}
              />
            ) : step === 1 ? (
              <EmployeeStep
                key="step1"
                employeeId={employeeId}
                onChange={setEmployeeId}
                onSubmit={handleCheckEmployee}
                loading={auth.loading}
                error={auth.error}
              />
            ) : step === 2 ? (
              <RegisterStep
                key="step2"
                employeeId={employeeId}
                userData={userData}
                onChange={handleUserDataChange}
                onSubmit={handleRegister}
                onBack={() => { setStep(1); auth.clearError(); }}
                loading={auth.loading}
                error={auth.error}
              />
            ) : (
              <UploadStep
                key="step3"
                userData={userData}
                photos={upload.photos}
                isUploading={upload.isUploading}
                uploadPhase={upload.uploadPhase}
                globalError={upload.globalError}
                onFilesSelected={upload.processFiles}
                onRemove={upload.removePhoto}
                onRetryCompress={upload.retryCompress}
                onSubmit={handleSubmit}
              />
            )}

          </AnimatePresence>
        </main>

      </div>
    </div>
  );
};

export default PhotosScreen;
