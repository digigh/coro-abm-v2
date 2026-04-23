import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UserCircle, AlertCircle, Clock } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './screens.css';

const HowToPlayModal = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(10);

  useEffect(() => {
    if (timeLeft === 0) {
      onComplete();
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft, onComplete]);

  return (
    <motion.div 
      className="how-to-play-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="how-to-play-card"
        initial={{ scale: 0.8, y: 20 }}
        animate={{ scale: 1, y: 0 }}
      >
        <div className="scanning-beam"></div>
        <div className="timer-section">
          <div className="clock-icon">
            <Clock size={40} className="pulse-icon" />
          </div>
          <div className="timer-display">
            {timeLeft <= 3 ? (
              <motion.span 
                key="ready"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1.2, opacity: 1 }}
                className="get-ready-text"
              >
                Get ready to play!
              </motion.span>
            ) : (
              <span className="seconds-text">{timeLeft}s</span>
            )}
          </div>
        </div>

        <div className="instructions-section">
          <h2>How to Play ✦</h2>
          <ul>
            <li>You have 10 seconds to answer each question.</li>
            <li>The quiz will automatically move to the next question—you cannot go back.</li>
            <li>If time runs out, the question will be marked as 0 (no score).</li>
            <li>If you leave the game midway, it will resume from where you left off when you return.</li>
          </ul>
        </div>

        <div className="progress-track">
          <motion.div 
            className="progress-fill"
            initial={{ width: "100%" }}
            animate={{ width: "0%" }}
            transition={{ duration: 10, ease: "linear" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function LoginScreen({ currentSet, onNext, onAlreadyPlayed }) {
  const [empId, setEmpId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showHowToPlay, setShowHowToPlay] = useState(false);
  const [pendingData, setPendingData] = useState(null);

  const handleLogin = async () => {
    if (!empId.trim()) {
      setError('Please enter your Employee ID');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Check Supabase allowlist
      const { data, error: dbError } = await supabase
        .from('users')
        .select('*')
        .eq('employee_id', empId.trim())
        .single();

      if (dbError || !data) {
        setError('Employee ID not found. Please verify and try again.');
        setLoading(false);
        return;
      }

      // Check if they have already played THIS specific question set
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('employee_id', data.employee_id)
        .eq('question_set_id', currentSet)
        .single();

      if (progressData && progressData.is_completed) {
        const timeStarted = new Date(progressData.started_at).getTime();
        const timeCompleted = new Date(progressData.completed_at).getTime();
        const timeTaken = timeCompleted - timeStarted;
        
        onAlreadyPlayed(data, progressData.score, timeTaken);
        return;
      }

      // Success! Pass the user data back to App state
      const { data: finalProgress, error: upsertError } = await supabase
        .from('user_progress')
        .upsert({
          employee_id: data.employee_id,
          question_set_id: currentSet,
          score: progressData?.score || 0,
          current_question_index: progressData?.current_question_index || 0,
          is_completed: false,
          answers_json: progressData?.answers_json || {},
          started_at: progressData?.started_at || new Date().toISOString(),
          current_question_start_time: new Date().toISOString()
        }, { onConflict: 'employee_id, question_set_id' })
        .select('*')
        .single();
      
      if (upsertError) throw upsertError;

      // Instead of calling onNext, we show the How to Play modal
      setPendingData({ user: data, progress: finalProgress });
      setShowHowToPlay(true);
    } catch (err) {
      setError('Connection error or database issue. Please try again.');
      setLoading(false);
    }
  };

  const handleModalComplete = () => {
    if (pendingData) {
      onNext(pendingData.user, pendingData.progress);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }

  return (
    <>
      <AnimatePresence>
        {showHowToPlay && <HowToPlayModal onComplete={handleModalComplete} />}
      </AnimatePresence>

      <motion.div 
        className="glass input-card"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="input-header">
          <div className="badge" style={{ marginBottom: 16 }}>
            <div className="badge-dot"></div>
            Secure Access
          </div>
          <h2 className="input-title">Who's exploring?</h2>
          <p className="input-sub">Enter your Coromandel ID to sync your journey.</p>
        </div>

        <div className="field">
          <label className="field-label" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <UserCircle size={14} /> Employee ID
          </label>
          <input 
            className="field-input" 
            type="text" 
            placeholder="e.g. 98765" 
            value={empId}
            onChange={(e) => setEmpId(e.target.value.toUpperCase())}
            onKeyDown={handleKeyDown}
            autoComplete="off"
            disabled={loading || showHowToPlay}
          />
        </div>

        {error && (
          <motion.div 
            className="error-msg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <AlertCircle size={16} /> {error}
          </motion.div>
        )}

        <button 
          className="submit-btn" 
          onClick={handleLogin}
          disabled={loading || showHowToPlay}
        >
          {loading ? 'Verifying...' : 'Begin My Journey ✦'}
        </button>
      </motion.div>
    </>
  );
}
