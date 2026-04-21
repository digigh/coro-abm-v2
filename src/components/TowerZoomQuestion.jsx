import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function TowerZoomQuestion({
  question, answeredIdx, isAnswered, isCorrect, onAnswer, onContinue
}) {
  return (
    <div style={{ width: '100%' }}>
      {/* Tag */}
      <div className="q-tag" style={{ marginBottom: 12 }}>
        <div className="q-tag-dot" />{question.tag}
      </div>
      <div className="q-text" style={{ marginBottom: 8 }}>{question.question_text}</div>

      {/* Paris Atrium Scene */}
      <div style={{
        position: 'relative', width: '100%', height: 260,
        borderRadius: 24, overflow: 'hidden',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
        background: '#000',
        marginBottom: 16,
      }}>
        {/* Tower Background Image */}
        <motion.img
          src="/parisian_tower.png"
          alt="Eiffel Tower"
          animate={isAnswered && isCorrect ? { scale: 1.25, y: -20, filter: 'brightness(1.1) saturate(1.1)' } : {}}
          transition={{ duration: 3, ease: 'easeOut' }}
          style={{
            width: '100%', height: '100%', objectFit: 'cover',
            opacity: 0.7,
          }}
        />

        {/* Night Vignette */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 50% 50%, transparent 20%, rgba(0,0,0,0.4) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Particle Overlay (Sparkles) on correct */}
        {isAnswered && isCorrect && (
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
            {Array.from({ length: 40 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{
                  opacity: [0, 0.8, 0],
                  scale: [0, 1.2, 0],
                  x: [Math.random() * 300 - 150, Math.random() * 300 - 150],
                  y: [Math.random() * 300 - 150, Math.random() * 300 - 150],
                }}
                transition={{
                  duration: 1.5 + Math.random(),
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
                style={{
                  position: 'absolute', top: '40%', left: '50%',
                  width: 4, height: 4, borderRadius: '50%',
                  background: i % 2 === 0 ? '#FACC15' : '#fff',
                  boxShadow: '0 0 8px #FACC15',
                }}
              />
            ))}
          </div>
        )}

        {/* Floating Label */}
        {isAnswered && isCorrect && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              position: 'absolute', bottom: 20, right: 20,
              padding: '6px 14px', borderRadius: 12,
              background: 'rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255,255,255,0.2)',
              display: 'flex', alignItems: 'center', gap: 8,
            }}
          >
            <Sparkles size={14} color="#FACC15" />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#fff' }}>LIGHT SHOW ACTIVE</span>
          </motion.div>
        )}
      </div>

      {/* Option Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {question.options.map((opt, idx) => {
          const isSelected = idx === answeredIdx;
          const isCorrectSel = isAnswered && isSelected && isCorrect;
          const isWrongSel = isAnswered && isSelected && !isCorrect;
          const isDimmed = isAnswered && !isSelected;

          const borderColor = isCorrectSel ? '#FACC15' : isWrongSel ? '#F43F5E' : 'rgba(255,255,255,0.15)';
          const bgColor = isSelected
            ? (isCorrectSel ? 'rgba(250,204,21,0.15)' : 'rgba(244,63,94,0.15)')
            : 'rgba(255,255,255,0.05)';

          return (
            <motion.button
              key={idx}
              onClick={() => !isAnswered && onAnswer(idx)}
              whileHover={!isAnswered ? { scale: 1.02 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              style={{
                all: 'unset', padding: '16px 12px', borderRadius: 18,
                background: bgColor, border: `1.5px solid ${borderColor}`,
                cursor: isAnswered ? 'default' : 'pointer',
                opacity: isDimmed ? 0.3 : 1, transition: 'all 0.3s',
                display: 'flex', alignItems: 'center', gap: 10,
              }}
            >
              <div style={{
                width: 24, height: 24, borderRadius: 6, flexShrink: 0,
                background: isCorrectSel ? '#FACC15' : isWrongSel ? '#F43F5E' : 'rgba(255,255,255,0.1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 12,
                color: isSelected ? '#000' : '#fff',
              }}>
                {String.fromCharCode(65 + idx)}
              </div>
              <span style={{
                fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13,
                color: isCorrectSel ? '#FACC15' : '#fff',
                lineHeight: 1.2,
              }}>
                {opt}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Footer */}
      {isAnswered && isCorrect && (
        <motion.button
          className="next-btn-q"
          onClick={() => onContinue()}
          initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
          style={{ marginTop: 16 }}
        >
          Explore More <ArrowRight size={18} />
        </motion.button>
      )}
    </div>
  );
}
