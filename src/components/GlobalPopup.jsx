import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, AlertTriangle, CheckCircle, Bell, Megaphone } from 'lucide-react';

const ICON_MAP = {
  info: <Info size={40} />,
  alert: <AlertTriangle size={40} />,
  success: <CheckCircle size={40} />,
  bell: <Bell size={40} />,
  megaphone: <Megaphone size={40} />
};

export default function GlobalPopup({ config, onClose }) {
  if (!config || !config.enabled) return null;

  return (
    <AnimatePresence>
      <div className="global-popup-overlay">
        <motion.div 
          className="global-popup-card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <button className="popup-close-btn" onClick={onClose}>
            <X size={20} />
          </button>

          <div className="popup-icon-wrapper">
            {ICON_MAP[config.icon] || <Megaphone size={40} />}
          </div>

          <div className="popup-content">
            <h2>{config.heading}</h2>
            <p>{config.text}</p>
          </div>

          <motion.button 
            className="popup-action-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClose}
          >
            DISMISS
          </motion.button>
        </motion.div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .global-popup-overlay {
          position: fixed;
          inset: 0;
          background: rgba(2, 6, 23, 0.85);
          backdrop-filter: blur(12px);
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }

        .global-popup-card {
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(251, 191, 36, 0.3);
          border-radius: 32px;
          padding: 40px;
          max-width: 450px;
          width: 100%;
          text-align: center;
          position: relative;
          box-shadow: 0 30px 60px rgba(0,0,0,0.5), 0 0 100px rgba(251, 191, 36, 0.1);
          backdrop-filter: blur(20px);
        }

        .popup-close-btn {
          position: absolute;
          top: 20px;
          right: 20px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.4);
          cursor: pointer;
          transition: color 0.3s;
        }

        .popup-close-btn:hover {
          color: var(--accent, #fbbf24);
        }

        .popup-icon-wrapper {
          width: 80px;
          height: 80px;
          background: rgba(251, 191, 36, 0.1);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 24px;
          color: var(--accent, #fbbf24);
          box-shadow: 0 10px 30px rgba(251, 191, 36, 0.2);
        }

        .popup-content h2 {
          font-family: 'Oswald', sans-serif;
          font-size: 2rem;
          color: #fff;
          margin-bottom: 12px;
          text-transform: uppercase;
          letter-spacing: 2px;
        }

        .popup-content p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
          line-height: 1.6;
          margin-bottom: 30px;
        }

        .popup-action-btn {
          width: 100%;
          background: var(--accent, #fbbf24);
          color: #000;
          border: none;
          padding: 16px;
          border-radius: 16px;
          font-weight: 800;
          letter-spacing: 2px;
          cursor: pointer;
          text-transform: uppercase;
          box-shadow: 0 10px 25px rgba(251, 191, 36, 0.3);
        }
      `}} />
    </AnimatePresence>
  );
}
