import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const HOTELS = [
  { name: 'The Venetian Macao', icon: '🛶' },
  { name: 'MGM Cotai', icon: '🦁' },
  { name: 'Wynn Macau', icon: '⛲' },
  { name: 'Galaxy Macau', icon: '💎' }
];

export default function DiamondRiseQuestion({
  question, answeredIdx, isAnswered, isCorrect, onAnswer, onContinue
}) {
  const [ diamondState, setDiamondState ] = useState('idle'); // idle, rising, wrong

  const handlePick = (idx) => {
    if (isAnswered) return;
    onAnswer(idx);
    if (idx === 3) setDiamondState('rising');
    else setDiamondState('wrong');
  };

  return (
    <div style={{ width: '100%' }}>
      {/* HUD: Tag + Question */}
      <div className="q-tag" style={{ marginBottom: 12 }}>
        <div className="q-tag-dot" />{question.tag}
      </div>
      <div className="q-text" style={{ marginBottom: 8 }}>{question.question_text}</div>

      {/* Atmospheric Scene */}
      <div style={{
        position: 'relative', width: '100%', height: 260,
        borderRadius: 24, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.7)',
        background: '#050a1a',
        marginBottom: 16,
      }}>
        {/* Background Image */}
        <img
          src="/diamond_atrium.png"
          alt="Atrium"
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: 0.6, filter: 'brightness(0.7)',
          }}
        />

        {/* Atrium Overlay (Ambient Lighting) */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(circle at 50% 100%, rgba(80,120,255,0.15) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />

        {/* The Fountain Base (CSS) */}
        <div style={{
          position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          width: 140, height: 30, borderRadius: '50%',
          background: 'rgba(255,255,255,0.05)', border: '2px solid rgba(255,255,255,0.1)',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
        }}>
          {/* Water Surface shimmer */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              position: 'absolute', inset: 4, borderRadius: '50%',
              background: 'rgba(34,211,238,0.2)',
            }}
          />
        </div>

        {/* ── THE DIAMOND ── */}
        <AnimatePresence>
          {(isAnswered && isCorrect) && (
            <motion.div
              initial={{ y: 20, opacity: 0, scale: 0.5 }}
              animate={{ y: -80, opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 50, damping: 12, delay: 0.2 }}
              style={{
                position: 'absolute', bottom: 60, left: '50%', marginLeft: -45,
                width: 90, height: 110, zIndex: 10,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                filter: 'drop-shadow(0 0 25px rgba(34,211,238,0.8))',
              }}
            >
              <div style={{ fontSize: 75, filter: 'hue-rotate(180deg)' }}>💎</div>
              {/* Shine Beams */}
              {[0, 45, 90, 135].map((ang, i) => (
                <motion.div
                  key={i}
                  animate={{ opacity: [0, 0.8, 0], scale: [0.8, 1.5, 0.8] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }}
                  style={{
                    position: 'absolute', width: 2, height: 160,
                    background: 'linear-gradient(to top, transparent, rgba(255,255,255,0.8), transparent)',
                    transform: `rotate(${ang}deg)`,
                  }}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Laser Lights on success */}
        {isAnswered && isCorrect && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {[15, 35, 65, 85].map((x, i) => (
              <motion.div
                key={i}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 300, opacity: [0, 0.4, 0] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }}
                style={{
                  position: 'absolute', left: `${x}%`, top: 0,
                  width: 1, background: '#2DD4BF',
                  transform: `rotate(${i % 2 === 0 ? '-15deg' : '15deg'})`,
                  boxShadow: '0 0 10px #2DD4BF',
                }}
              />
            ))}
          </div>
        )}

        {/* Incorrect Shake Feedback */}
        {isAnswered && !isCorrect && (
          <motion.div
            animate={{ x: [-8, 8, -8, 8, 0] }}
            transition={{ duration: 0.4 }}
            style={{ position: 'absolute', inset: 0, background: 'rgba(244,63,94,0.1)', pointerEvents: 'none' }}
          />
        )}

        {/* Legend */}
        <div style={{
          position: 'absolute', bottom: 10, left: 0, right: 0,
          textAlign: 'center', fontFamily: 'var(--font-mono)', fontSize: 9,
          color: 'rgba(255,255,255,0.3)', letterSpacing: 2,
        }}>
          FORTUNE DIAMOND SHOW · GALAXY MACAU
        </div>
      </div>

      {/* Options Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {HOTELS.map((hotel, idx) => {
          const isSelected = idx === answeredIdx;
          const isWrongSel = isAnswered && isSelected && !isCorrect;
          const isCorrectSel = isAnswered && isSelected && isCorrect;
          const isDimmed = isAnswered && !isSelected;

          return (
            <motion.button
              key={idx}
              onClick={() => handlePick(idx)}
              whileHover={!isAnswered ? { y: -4, scale: 1.04 } : {}}
              whileTap={!isAnswered ? { scale: 0.96 } : {}}
              style={{
                all: 'unset', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                padding: '14px 8px', borderRadius: 16,
                background: isSelected
                  ? (isCorrectSel ? 'rgba(34,211,238,0.15)' : 'rgba(244,63,94,0.15)')
                  : 'rgba(255,255,255,0.04)',
                border: `1.5px solid ${isSelected ? (isCorrectSel ? '#22D3EE' : '#F43F5E') : 'rgba(255,255,255,0.1)'}`,
                opacity: isDimmed ? 0.35 : 1,
                cursor: isAnswered ? 'default' : 'pointer',
                transition: 'all 0.3s',
              }}
            >
              <span style={{ fontSize: 24 }}>{hotel.icon}</span>
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 11,
                color: isSelected ? (isCorrectSel ? '#22D3EE' : '#F43F5E') : '#fff',
                textAlign: 'center',
              }}>
                {hotel.name}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Continue */}
      {isAnswered && isCorrect && (
        <motion.button
          className="next-btn-q"
          onClick={() => onContinue()}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: 16, width: '100%' }}
        >
          Continue <ArrowRight size={18} />
        </motion.button>
      )}
      {isAnswered && !isCorrect && (
        <div style={{ marginTop: 16, textAlign: 'center', color: '#F43F5E', fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 600 }}>
          The Diamond rises at Galaxy Macau!
        </div>
      )}
    </div>
  );
}
