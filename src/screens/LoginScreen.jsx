import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { UserCircle, AlertCircle } from 'lucide-react';
import { supabase } from '../supabaseClient';
import './screens.css';

export default function LoginScreen({ currentSet, onNext, onAlreadyPlayed }) {
  const [empId, setEmpId] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

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

      // 2. Check if they have already played THIS specific question set
      const { data: progressData, error: progressError } = await supabase
        .from('user_progress')
        .select('*')
        .eq('employee_id', data.employee_id)
        .eq('question_set_id', currentSet)
        .single();

      if (progressData && progressData.is_completed) {
        // They already completed this set, calculate their past time and route them!
        const timeStarted = new Date(progressData.started_at).getTime();
        const timeCompleted = new Date(progressData.completed_at).getTime();
        const timeTaken = timeCompleted - timeStarted;
        
        // Push as record for already completed user
        try {
          fetch('https://aiautomation.digicides.com/webhook/abm-web', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              status: 'already_played',
              employee_id: data.employee_id,
              name: data.name,
              division: data.division,
              business_unit: data.business_unit,
              score: progressData.score,
              current_step: progressData.current_question_index,
              is_completed: true,
              started_at: progressData.started_at,
              completed_at: progressData.completed_at,
              date: new Date().toLocaleDateString()
            })
          });
        } catch (webhookErr) {
          console.error('Webhook push failed:', webhookErr);
        }

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

      // Webhook Trigger: Started vs Resumed
      try {
        fetch('https://aiautomation.digicides.com/webhook/abm-web', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            status: progressData ? 'resumed' : 'started',
            employee_id: data.employee_id,
            name: data.name,
            division: data.division,
            business_unit: data.business_unit,
            score: finalProgress.score,
            current_step: finalProgress.current_question_index,
            is_completed: false,
            started_at: finalProgress.started_at,
            date: new Date().toLocaleDateString()
          })
        });
      } catch (err) { /* silent fail */ }

      onNext(data, finalProgress);
    } catch (err) {
      setError('Connection error or database issue. Please try again.');
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  }

  return (
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
          placeholder="e.g. EMP-1042" 
          value={empId}
          onChange={(e) => setEmpId(e.target.value.toUpperCase())}
          onKeyDown={handleKeyDown}
          autoComplete="off"
          disabled={loading}
        />
      </div>

      <div style={{
        marginTop: 20, marginBottom: 20, padding: 16,
        background: 'rgba(255,255,255,0.03)',
        border: '1px solid rgba(255,255,255,0.08)',
        borderRadius: 12,
        fontSize: 13, color: 'rgba(255,255,255,0.6)',
        lineHeight: 1.5,
        fontFamily: 'var(--font-body)'
      }}>
        <div style={{ color: 'var(--gold)', fontWeight: 600, marginBottom: 8, fontSize: 12, letterSpacing: 1, textTransform: 'uppercase' }}>
          How to Play ✦
        </div>
        <ul style={{ margin: 0, paddingLeft: 18, display: 'flex', flexDirection: 'column', gap: 6 }}>
          <li>You have <strong>10 seconds</strong> to answer each question.</li>
          <li>The quiz will automatically move to the next question—<strong>you cannot go back.</strong></li>
          <li>If time runs out, the question will be marked as <strong>0 (no score).</strong></li>
          <li>If you leave the game midway, it will <strong>resume from where you left off</strong> when you return.</li>
        </ul>
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
        disabled={loading}
      >
        {loading ? 'Verifying...' : 'Begin My Journey ✦'}
      </button>
    </motion.div>
  );
}
