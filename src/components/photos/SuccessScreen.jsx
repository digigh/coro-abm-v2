// ─────────────────────────────────────────────
// SuccessScreen.jsx — Upload Success Celebration
// ─────────────────────────────────────────────
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Sparkles, Camera } from 'lucide-react';

// Generate random confetti particles
const generateParticles = (count = 30) =>
  Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    duration: 1.2 + Math.random() * 1.4,
    color: ['#38bdf8', '#a78bfa', '#f472b6', '#34d399', '#fbbf24', '#fb923c'][
      Math.floor(Math.random() * 6)
    ],
    size: 4 + Math.random() * 6
  }));

const SuccessScreen = ({ userData, onUploadMore, onHome }) => {
  const [particles] = useState(() => generateParticles(45));
  const [showMsg, setShowMsg]   = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setShowMsg(true), 400);
    return () => clearTimeout(t);
  }, []);

  const firstName = userData?.name?.split(' ')[0] || 'Friend';

  return (
    <motion.div
      className="success-screen"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Confetti Particles */}
      <div className="confetti-container" aria-hidden="true">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="confetti-particle"
            style={{
              left: `${p.x}%`,
              width: p.size,
              height: p.size,
              backgroundColor: p.color,
              borderRadius: Math.random() > 0.5 ? '50%' : '2px'
            }}
            initial={{ y: -20, opacity: 1, rotate: 0 }}
            animate={{
              y: ['0%', '110vh'],
              opacity: [1, 1, 0],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)]
            }}
            transition={{
              delay: p.delay,
              duration: p.duration,
              ease: 'easeIn'
            }}
          />
        ))}
      </div>

      {/* Success Card */}
      <div className="success-card">
        {/* Animated Check Icon */}
        <motion.div
          className="success-icon-ring"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 280, damping: 20, delay: 0.15 }}
        >
          <div className="success-ring-pulse" />
          <CheckCircle2 size={60} className="success-check-icon" />
        </motion.div>

        {/* Sparkle Icons */}
        <div className="success-sparkles">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1.3, 1], opacity: [0, 1, 0.7] }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.5 }}
              className={`sparkle sparkle-${i}`}
            >
              <Sparkles size={20} />
            </motion.div>
          ))}
        </div>

        {/* Headline */}
        <motion.h2
          className="success-headline"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, type: 'spring', stiffness: 250 }}
        >
          Congratulations, {firstName}! 🎉
        </motion.h2>

        {/* Message */}
        <motion.p
          className="success-message"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          You have successfully uploaded your photo(s) for the
          <strong> ABM 2026 Summit Photo Contest</strong>.
          <br /><br />
          Your participation has been registered and your
          memories are now part of the Summit gallery. ✨
        </motion.p>

        {/* Info Pill */}
        <motion.div
          className="success-info-pill"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.65 }}
        >
          <Camera size={16} />
          <span>Submitted by <strong>{userData?.name}</strong> · {userData?.division}</span>
        </motion.div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%', alignItems: 'center' }}>
          <motion.button
            className="success-more-btn"
            onClick={onUploadMore}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Camera size={20} />
            <span>Upload Another Photo</span>
          </motion.button>

          <motion.button
            className="photos-btn-secondary-text"
            onClick={onHome}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            style={{ marginTop: '0.5rem' }}
          >
            Return to Dashboard
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export default SuccessScreen;
