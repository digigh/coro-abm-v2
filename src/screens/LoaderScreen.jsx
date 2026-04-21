import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './screens.css';

export default function LoaderScreen({ employee, onNext }) {
  const firstName = employee?.name?.split(' ')[0] ?? 'Explorer';

  useEffect(() => {
    const timer = setTimeout(() => onNext(), 2800);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="loader-content">
      <style>{`
        @keyframes planeFly {
          0%   { transform: translateX(-80px) translateY(20px) rotate(-5deg); opacity: 0; }
          20%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateX(80px) translateY(-20px) rotate(8deg); opacity: 0; }
        }
        @keyframes trailFade {
          0%   { opacity: 0; width: 0; }
          40%  { opacity: 0.5; }
          100% { opacity: 0; width: 120px; }
        }
        .plane-wrap {
          position: relative;
          width: 180px;
          height: 120px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
        }
        .plane-emoji {
          font-size: 56px;
          animation: planeFly 2s ease-in-out infinite;
          display: inline-block;
          position: relative;
          z-index: 2;
        }
        .plane-trail {
          position: absolute;
          left: 10%;
          top: 50%;
          height: 2px;
          background: linear-gradient(90deg, transparent, rgba(250,204,21,0.6), transparent);
          border-radius: 2px;
          animation: trailFade 2s ease-in-out infinite;
        }
        @keyframes dotPulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
          40% { transform: scale(1); opacity: 1; }
        }
        .dot-loader { display: flex; gap: 8px; justify-content: center; margin-top: 20px; }
        .dot-loader span {
          width: 8px; height: 8px; border-radius: 50%; background: var(--gold);
          animation: dotPulse 1.4s ease-in-out infinite;
        }
        .dot-loader span:nth-child(2) { animation-delay: 0.2s; }
        .dot-loader span:nth-child(3) { animation-delay: 0.4s; }
      `}</style>

      {/* Plane Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
      >
        <div className="plane-wrap">
          <div className="plane-trail"></div>
          <span className="plane-emoji">✈️</span>
        </div>
      </motion.div>

      {/* Text */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        style={{ textAlign: 'center' }}
      >
        <div className="badge" style={{ marginBottom: 18, display: 'inline-flex' }}>
          <div className="badge-dot"></div>
          Preparing your experience
        </div>
        <h2 className="loader-title">Welcome, {firstName}!</h2>
        <p className="loader-sub">Booking your first-class quiz experience</p>
        <div className="dot-loader">
          <span></span><span></span><span></span>
        </div>
      </motion.div>
    </div>
  );
}
