import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, History } from 'lucide-react';

export default function HistoryScrollQuestion({
  question, answeredIdx, isAnswered, isCorrect, onAnswer, onContinue
}) {
  return (
    <div style={{ width: '100%' }}>
      {/* HUD */}
      <div className="q-tag" style={{ marginBottom: 10 }}>
        <div className="q-tag-dot" />{question.tag}
      </div>
      <div className="q-text" style={{ marginBottom: 6 }}>{question.question_text}</div>

      {/* Antique Scroll Scene */}
      <div style={{
        position: 'relative', width: '100%', height: 260,
        borderRadius: 22, overflow: 'hidden',
        background: 'linear-gradient(135deg, #09090b 0%, #18181b 100%)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 20px 60px rgba(0,0,0,0.8)',
        marginBottom: 16,
        display: 'flex', alignItems: 'center', justifyContent: 'center'
      }}>
        {/* Parchment Background */}
        <motion.div
           initial={{ width: 60, opacity: 0.5 }}
           animate={isAnswered && isCorrect ? { width: '85%', opacity: 1 } : { width: 80, opacity: 0.6 }}
           transition={{ duration: 1, type: 'spring', stiffness: 60 }}
           style={{
             height: '75%', background: '#e5e1d3', // Aged parchment color
             borderRadius: 4, position: 'relative',
             boxShadow: '0 8px 32px rgba(0,0,0,0.5), inset 0 0 40px rgba(100,80,40,0.2)',
             overflow: 'hidden', border: '1px solid #c4b58d'
           }}
        >
          {/* Scroll Rods/Edges */}
          <div style={{ position: 'absolute', top: '-5%', left: -5, width: 10, height: '110%', background: '#451a03', borderRadius: 4 }} />
          <div style={{ position: 'absolute', top: '-5%', right: -5, width: 10, height: '110%', background: '#451a03', borderRadius: 4 }} />

          {/* Decorative Borders */}
          <div style={{ position: 'absolute', inset: 8, border: '1px solid rgba(139, 92, 24, 0.2)', pointerEvents: 'none' }} />

          {/* Paper Texture Overlay */}
          <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundImage: 'url("https://www.transparenttextures.com/patterns/papyros.png")', pointerEvents: 'none' }} />

          {/* Content (Visible only when unfolded) */}
          <div style={{ padding: '20px 25px', color: '#451a03', opacity: isAnswered && isCorrect ? 1 : 0, transition: 'opacity 0.6s 0.4s' }}>
             <div style={{ fontFamily: 'serif', fontStyle: 'italic', fontSize: 16, borderBottom: '1px solid rgba(69, 26, 3, 0.2)', paddingBottom: 4, marginBottom: 10 }}>Chronicle of Macao</div>
             <div style={{ fontSize: 11, lineHeight: 1.6, fontFamily: 'var(--font-body)' }}>
               Since 1557, this enclave thrived as a Portuguese trading post, blending the arts and architectures of Occident and Orient.
             </div>
             <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
               <div style={{ fontSize: 28 }}>🏛️</div>
               <div style={{ fontSize: 28 }}>⚓</div>
               <div style={{ fontSize: 28 }}>📜</div>
             </div>
             {/* Red Handover Stamp */}
             <motion.div
               animate={isAnswered && isCorrect ? { scale: [2, 1], opacity: [0, 0.7], rotate: [20, -15] } : { opacity: 0 }}
               transition={{ delay: 1.2, duration: 0.4, type: 'spring' }}
               style={{
                 position: 'absolute', bottom: 15, right: 15,
                 width: 80, height: 40, border: '3px solid #b91c1c', borderRadius: 8,
                 display: 'flex', alignItems: 'center', justifyContent: 'center',
                 color: '#b91c1c', fontWeight: 900, fontFamily: 'var(--font-mono)', fontSize: 10,
                 opacity: 0.7, transform: 'rotate(-15deg)', zIndex: 5
               }}
             >
               TRANSFER 1999
             </motion.div>
          </div>

          {/* Idle Emoji */}
          {!isAnswered && (
             <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 30, opacity: 0.4 }}>📜</div>
          )}
        </motion.div>

        {/* Floating Icons */}
        <div style={{ position: 'absolute', right: 20, top: 20, color: 'rgba(255,255,255,0.2)' }}>
          <History size={18} />
        </div>
      </div>

      {/* Options */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
        {HOTEL_OPTS.map((opt, i) => {
           const isSelected = i === answeredIdx;
           const isCorrectSel = isAnswered && isSelected && isCorrect;
           const isWrongSel = isAnswered && isSelected && !isCorrect;
           const isDimmed = isAnswered && !isSelected;

           return (
             <motion.button
               key={i}
               onClick={() => !isAnswered && onAnswer(i)}
               style={{
                 all: 'unset', padding: '16px 12px', borderRadius: 18,
                 background: isSelected ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255,255,255,0.03)',
                 border: `1.5px solid ${isSelected ? (isCorrectSel ? '#d97706' : '#ef4444') : 'rgba(255,255,255,0.1)'}`,
                 color: isSelected ? (isCorrectSel ? '#fbbf24' : '#f87171') : '#fff',
                 fontFamily: 'var(--font-head)', fontWeight: 800, fontSize: 13, textAlign: 'center',
                 cursor: isAnswered ? 'default' : 'pointer', opacity: isDimmed ? 0.35 : 1,
                 transition: 'all 0.3s'
               }}
             >
               {opt}
             </motion.button>
           );
        })}
      </div>

      {/* Feedback Overlay */}
      {isAnswered && (
        <motion.div
          initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
          style={{
            marginTop: 18, padding: '12px 18px', borderRadius: 14,
            background: isCorrect ? 'rgba(217, 119, 6, 0.1)' : 'rgba(244, 63, 94, 0.1)',
            border: `1px solid ${isCorrect ? '#d97706' : '#f43f5e'}`,
            display: 'flex', alignItems: 'center', gap: 12
          }}
        >
          <div style={{ fontSize: 24 }}>{isCorrect ? '🇵🇹' : '📜'}</div>
          <div style={{ flex: 1, fontSize: 11, fontFamily: 'var(--font-body)', color: 'rgba(255,255,255,0.6)' }}>
             {isCorrect ? 'Correct! Macao was established by Portugal in 1557.' : 'The answer is Portugal, reflecting the unique Luso-Chinese heritage.'}
          </div>
          {isCorrect && (
            <button onClick={onContinue} className="next-btn-q" style={{ padding: '8px 12px', fontSize: 11, marginTop: 0 }}>NEXT <ArrowRight size={14}/></button>
          )}
        </motion.div>
      )}
    </div>
  );
}

const HOTEL_OPTS = ["Spain", "France", "Portugal", "Netherlands"];
