import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Camera, Upload, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import './PhotosAdventure.css';

// Components
import EmployeeStep from '../components/photos/EmployeeStep';
import RegisterStep from '../components/photos/RegisterStep';
import UploadStep from '../components/photos/UploadStep';
import SuccessScreen from '../components/photos/SuccessScreen';
import AdventureBackground from '../components/photos/AdventureBackground';

// Hooks
import useEmployeeAuth from '../hooks/useEmployeeAuth';
import usePhotoUpload from '../hooks/usePhotoUpload';

const PhotosScreen = ({ onBack }) => {
  const [step, setStep] = useState(1);
  const [employeeId, setEmployeeId] = useState('');
  const [userData, setUserData] = useState({ name: '', division: '', business_unit: '' });
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const carouselImages = [
    '/inner_bg_vibrant.png',
    '/carousel_1.png',
    '/carousel_2.png'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const { 
    loading: authLoading, 
    error: authError, 
    checkEmployee, 
    registerEmployee,
    clearError: clearAuthError
  } = useEmployeeAuth();

  const {
    photos,
    isUploading,
    globalError: uploadError,
    processFiles,
    removePhoto,
    retryCompress,
    uploadAll,
    clearAll: resetUploads
  } = usePhotoUpload();

  const handleBackNavigation = () => {
    if (step > 1 && step < 4) {
      setStep(step - 1);
      clearAuthError();
    } else {
      onBack();
    }
  };

  const handleCheckEmployee = async (e) => {
    if (e) e.preventDefault();
    const result = await checkEmployee(employeeId);
    if (result.found) {
      setUserData(result.data);
      setStep(3); // Skip registration if found
    } else if (result.data === null && !authError) {
      setStep(2); // Go to registration if not found
    }
  };

  const handleRegisterSubmit = async (e) => {
    if (e) e.preventDefault();
    const result = await registerEmployee(employeeId, userData);
    if (result.success) setStep(3);
  };

  const handleUserDataChange = (key, value) => {
    setUserData(prev => ({ ...prev, [key]: value }));
  };

  const steps = [
    { num: 1, label: 'Identity' },
    { num: 2, label: 'Register' },
    { num: 3, label: 'Upload' }
  ];

  return (
    <div className="photos-screen-container">
      {/* Dynamic Adventure Background */}
      <div className="photos-bg-aurora" />
      <AdventureBackground />

      <div className="photos-content-wrapper">
        {/* Animated Header */}
        <motion.header 
          className="photos-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: 'spring', damping: 20 }}
        >
          <motion.button 
            className="photos-back-btn" 
            onClick={handleBackNavigation}
            whileHover={{ scale: 1.1, rotate: -10 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={20} />
            <span className="back-btn-text">Back</span>
          </motion.button>
          
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="photos-title">Photo Contest</h1>
            <p className="photos-subtitle">ABM 2026 Summit · Share Your Moments</p>
          </motion.div>
        </motion.header>

        {/* Step Indicator */}
        {step < 4 && (
          <motion.div 
            className="step-progress"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {steps.map(({ num, label }, index) => {
              const isActive = step === num;
              const isComplete = step > num;
              return (
                <React.Fragment key={label}>
                  <div className={`step-node ${isActive ? 'active' : ''} ${isComplete ? 'complete' : ''}`}>
                    <div className="step-circle">
                      <span>{isComplete ? '✓' : num}</span>
                    </div>
                    <span className="step-label">{label}</span>
                  </div>
                  {index < steps.length - 1 && (
                    <div className="step-connector" />
                  )}
                </React.Fragment>
              );
            })}
          </motion.div>
        )}

        {/* Main Glass Panel with Image Carousel */}
        <motion.main 
          className="glass-panel"
          layout
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 25, stiffness: 120 }}
        >
          <div className="inner-carousel-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentImageIndex}
                className="carousel-slide"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                style={{ backgroundImage: `url(${carouselImages[currentImageIndex]})` }}
              />
            </AnimatePresence>
            <div className="carousel-overlay" />
          </div>

          <div className="glass-panel-content">
            <AnimatePresence mode="wait">
              {step === 1 && (
                <EmployeeStep 
                  employeeId={employeeId}
                  onChange={setEmployeeId}
                  onSubmit={handleCheckEmployee}
                  loading={authLoading}
                  error={authError}
                />
              )}
              {step === 2 && (
                <RegisterStep 
                  employeeId={employeeId}
                  userData={userData}
                  onChange={handleUserDataChange}
                  onSubmit={handleRegisterSubmit}
                  onBack={() => setStep(1)}
                  loading={authLoading}
                  error={authError}
                />
              )}
              {step === 3 && (
                <UploadStep 
                  userData={{ employee_id: employeeId, ...userData }}
                  photos={photos}
                  isUploading={isUploading}
                  globalError={uploadError}
                  onFilesSelected={processFiles}
                  onRemove={removePhoto}
                  onRetryCompress={retryCompress}
                  onSubmit={async () => {
                    try {
                      await uploadAll(userData, employeeId);
                      setStep(4);
                    } catch (err) {
                      console.error('[PhotosScreen] Upload failed, staying on step 3:', err);
                    }
                  }}
                />
              )}
              {step === 4 && (
                <SuccessScreen 
                  userData={userData}
                  onUploadMore={() => {
                    resetUploads();
                    setStep(3);
                  }}
                  onHome={onBack}
                />
              )}
            </AnimatePresence>
          </div>
        </motion.main>
      </div>
    </div>
  );
};

export default PhotosScreen;
