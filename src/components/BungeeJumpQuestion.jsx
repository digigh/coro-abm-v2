import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Wind } from 'lucide-react';

export default function BungeeJumpQuestion({
  question, answeredIdx, isAnswered, isCorrect, onAnswer, onContinue
}) {
  const [jumpStarted, setJumpStarted] = useState(false);

  const handlePick = (idx) => {
    if (isAnswered) return;
    onAnswer(idx);
    if (idx === 1) { // 338m is correct height (id 11)
       setTimeout(() => setJumpStarted(true), 400);
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {/* HUD */}
      <div className="q-tag" style={{ marginBottom: 10 }}>
        <div className="q-tag-dot" />{question.tag}
      </div>
      <div className="q-text" style={{ marginBottom: 6 }}>{question.question_text}</div>

      {/* Jump Perspective Scene */}
      <div style={{
        position: 'relative', width: '100%', height: 280,
        borderRadius: 26, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.15)',
        boxShadow: '0 24px 70px rgba(0,0,0,0.8)',
        background: '#0a0a1a',
        marginBottom: 16,
      }}>
        {/* Background Skyline (Blurry distance) */}
        <motion.div
          animate={jumpStarted ? { scale: 2.5, y: -400, filter: 'blur(8px)' } : {}}
          transition={{ duration: 1.8, ease: 'easeIn' }}
          style={{ position: 'absolute', inset: 0, zIndex: 1 }}
        >
          <div style={{
            width: '100%', height: '100%',
            background: 'linear-gradient(180deg, #1e293b 0%, #0f172a 100%)',
          }} />
          {/* City lights */}
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} style={{
              position: 'absolute', top: `${Math.random() * 100}%`, left: `${Math.random() * 100}%`,
              width: 3, height: 3, background: '#fff', opacity: 0.3, borderRadius: '50%'
            }} />
          ))}
        </motion.div>

        {/* The Edge / Platform (First Person) */}
        <motion.div
          animate={jumpStarted ? { y: 600, rotateX: 60 } : {}}
          transition={{ duration: 1.5, ease: 'easeIn' }}
          style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 120,
            background: 'linear-gradient(to top, #334155, #1e293b)',
            borderTop: '4px solid #FACC15',
            zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center',
            transformOrigin: 'bottom center'
          }}
        >
          <div style={{
            width: 80, height: 10, background: '#fbbf24', borderRadius: '0 0 10px 10px',
            boxShadow: '0 4px 0 rgba(0,0,0,0.3)'
          }} />
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#000', fontWeight: 900, marginTop: 10 }}>READY TO JUMP</div>
          <div style={{ fontSize: 40, marginTop: 10 }}>🥾🥾</div>
        </motion.div>

        {/* Wind / Motion Blur lines during jump */}
        {jumpStarted && (
          <div style={{ position: 'absolute', inset: 0, zIndex: 15, pointerEvents: 'none' }}>
            {Array.from({ length: 15 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 500, opacity: [0, 0.7, 0] }}
                transition={{ duration: 0.4, repeat: Infinity, delay: i * 0.05 }}
                style={{
                  position: 'absolute', left: `${Math.random() * 100}%`,
                  width: 1, height: 80, background: 'rgba(255,255,255,0.4)'
                }}
              />
            ))}
          </div>
        )}

        {/* Landing/Bounce effect */}
        <AnimatePresence>
          {isCorrect && isAnswered && !jumpStarted && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                style={{
                  position: 'absolute', inset: 0, zIndex: 20,
                  display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                  background: 'rgba(5, 150, 105, 0.4)', backdropFilter: 'blur(4px)'
                }}
              >
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                  style={{ fontSize: 60 }}
                >🪂</motion.div>
                <div style={{ fontFamily: 'var(--font-head)', fontWeight: 900, fontSize: 24, color: '#fff', textShadow: '0 4px 12px rgba(0,0,0,0.5)' }}>NAILED IT!</div>
                <div style={{ fontFamily: 'var(--font-body)', fontSize: 13, color: 'rgba(255,255,255,0.8)' }}>233m Freefall Complete</div>
              </motion.div>
          )}
        </AnimatePresence>

        {/* Height Meter */}
        <div style={{
          position: 'absolute', left: 20, top: '40%', zIndex: 30,
          padding: '4px 10px', borderRadius: 8, background: 'rgba(0,0,0,0.6)', border: '1px solid #FACC15',
          display: 'flex', alignItems: 'center', gap: 6, color: '#FACC15'
        }}>
          <Wind size={14} /> <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700 }}>233m EDGE</span>
        </div>
      </div>

      {/* Options */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
        {question.options.map((opt, idx) => {
          const isSelected = idx === answeredIdx;
          const isCorrectSel = isAnswered && isSelected && isCorrect;
          const isWrongSel = isAnswered && isSelected && !isCorrect;
          const isDimmed = isAnswered && !isSelected;

          return (
            <motion.button
              key={idx}
              onClick={() => handlePick(idx)}
              whileHover={!isAnswered ? { y: -5, background: 'rgba(250,204,21,0.1)' } : {}}
              whileTap={!isAnswered ? { scale: 0.95 } : {}}
              style={{
                all: 'unset', padding: '16px 12px', borderRadius: 18,
                background: isSelected ? 'rgba(250,204,21,0.1)' : 'rgba(255,255,255,0.04)',
                border: `2px solid ${isSelected ? (isCorrectSel ? '#FACC15' : '#F43F5E') : 'rgba(255,255,255,0.08)'}`,
                cursor: isAnswered ? 'default' : 'pointer',
                opacity: isDimmed ? 0.3 : 1, transition: 'all 0.3s',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4
              }}
            >
              <div style={{ fontSize: 10, color: 'var(--muted2)', fontWeight: 700 }}>HEIGHT</div>
              <div style={{ fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 15, color: isSelected ? '#FACC15' : '#fff' }}>{opt}</div>
            </motion.button>
          );
        })}
      </div>

      {/* Next Flow */}
      {isAnswered && isCorrect && (
        <motion.button
          className="next-btn-q"
          onClick={() => onContinue()}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          style={{ marginTop: 20, width: '100%', background: '#FACC15', color: '#000' }}
        >
          Next Challenge <ArrowRight size={18} />
        </motion.button>
      )}
    </div>
  );
}
