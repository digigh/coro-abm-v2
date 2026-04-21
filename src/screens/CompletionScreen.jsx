import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './screens.css';

// CSS-based confetti pieces — no library needed, no crashes
const CONFETTI_COLORS = ['#FACC15','#8B5CF6','#2DD4BF','#F43F5E','#fb923c','#ffffff'];

function ConfettiPiece({ i }) {
  const color = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
  const left = Math.random() * 100;
  const delay = Math.random() * 1.5;
  const size = 6 + Math.random() * 8;
  const duration = 2 + Math.random() * 2;

  return (
    <div style={{
      position: 'fixed',
      top: -20,
      left: `${left}%`,
      width: size,
      height: size * (Math.random() > 0.5 ? 1 : 2.5),
      borderRadius: Math.random() > 0.5 ? '50%' : 2,
      background: color,
      zIndex: 998,
      pointerEvents: 'none',
      animation: `confettiFall ${duration}s ${delay}s ease-in forwards`,
      opacity: 0,
    }} />
  );
}

export default function CompletionScreen({ employee, score, timeTaken, onRestart }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const firstName = employee?.name?.split(' ')[0] ?? 'Explorer';
  const safeTime = Math.floor((timeTaken || 0) / 1000);

  useEffect(() => {
    // Small delay so the entry animation plays first then confetti fires
    const t = setTimeout(() => setShowConfetti(true), 400);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="completion-content">

      {/* CSS Confetti */}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>

      {showConfetti && Array.from({ length: 60 }).map((_, i) => (
        <ConfettiPiece key={i} i={i} />
      ))}

      {/* Trophy */}
      <motion.div
        className="trophy-wrap"
        initial={{ scale: 0, rotate: -20, opacity: 0 }}
        animate={{ scale: 1, rotate: 0, opacity: 1 }}
        transition={{ type: 'spring', damping: 15, delay: 0.1 }}
      >
        <div className="trophy-glow"></div>
        <div style={{ fontSize: 90, lineHeight: 1, position: 'relative', zIndex: 1 }}>🏆</div>
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
      >
        <div className="badge"><div className="badge-dot"></div>Journey Complete</div>
      </motion.div>

      {/* Title */}
      <motion.h1
        className="comp-title"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
      >
        <span className="shine">Thank You,</span><br />{firstName}!
      </motion.h1>

      {/* Subtitle */}
      <motion.p
        className="comp-sub"
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
      >
        Your answers have been securely recorded. Results and the ultimate champion will be revealed at our grand finale!
      </motion.p>



      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
        style={{ marginTop: 32, fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)', fontFamily: 'var(--font-head)' }}
      >
        You may now safely close this window.
      </motion.div>
    </div>
  );
}
