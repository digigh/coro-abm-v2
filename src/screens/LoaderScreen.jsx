import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import './screens.css';

export default function LoaderScreen({ employee, onNext }) {
  const firstName = employee?.name?.split(' ')[0] ?? 'Explorer';

  useEffect(() => {
    const timer = setTimeout(() => onNext(), 3000);
    return () => clearTimeout(timer);
  }, [onNext]);

  return (
    <div className="loader-content-minimal">
      <style>{`
        .loader-content-minimal {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          width: 100vw;
          background: #000;
          position: relative;
          overflow: hidden;
        }
        .scan-laser {
          position: absolute;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--gold), transparent);
          box-shadow: 0 0 20px var(--gold);
          z-index: 10;
          top: 0;
          animation: scanVertical 3s ease-in-out forwards;
        }
        @keyframes scanVertical {
          0% { top: 30%; opacity: 0; }
          20% { opacity: 1; }
          80% { opacity: 1; }
          100% { top: 70%; opacity: 0; }
        }
        .welcome-name {
          font-family: var(--font-head);
          font-size: clamp(3rem, 10vw, 6rem);
          font-weight: 200;
          color: #fff;
          text-transform: uppercase;
          letter-spacing: 15px;
          margin: 0;
          text-align: center;
          opacity: 0.8;
          filter: blur(8px);
          animation: textClear 2s ease-out forwards;
        }
        @keyframes textClear {
          0% { filter: blur(8px); letter-spacing: 30px; opacity: 0; }
          100% { filter: blur(0px); letter-spacing: 15px; opacity: 1; }
        }
        .loading-tag {
          font-family: var(--font-mono);
          font-size: 12px;
          letter-spacing: 4px;
          color: var(--gold);
          margin-top: 20px;
          text-transform: uppercase;
          opacity: 0.6;
        }
      `}</style>

      <div className="scan-laser"></div>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <h1 className="welcome-name">{firstName}</h1>
        <div className="loading-tag">Identity Verified • Initiating Session</div>
      </motion.div>
    </div>
  );
}
