import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Settings, 
  List, 
  Trophy, 
  ToggleLeft, 
  ToggleRight, 
  Save, 
  RefreshCcw, 
  Search,
  ChevronRight,
  Clock,
  User,
  ShieldCheck,
  Map,
  Megaphone,
  Plus,
  Trash2,
  ExternalLink,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { supabase } from '../supabaseClient';
import { DEFAULT_BATCH_DATA } from '../data/itineraryData';
import './screens.css';

export default function AdminPanel({ onExit }) {
  const [activeTab, setActiveTab] = useState('questions');
  const [questions, setQuestions] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [settings, setSettings] = useState({ max_questions: 13 });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState(null);

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    if (activeTab === 'questions') {
      const { data } = await supabase
        .from('questions')
        .select('*')
        .order('id', { ascending: true });
      if (data) setQuestions(data);
    } else if (activeTab === 'leaderboard') {
      const { data } = await supabase
        .from('user_progress')
        .select(`
          *,
          users (name, division, business_unit)
        `)
        .eq('is_completed', true)
        .order('score', { ascending: false })
        .order('completed_at', { ascending: true });
      if (data) setLeaderboard(data);
    } else if (activeTab === 'settings') {
      const { data } = await supabase
        .from('quiz_settings')
        .select('*')
        .single();
      if (data) setSettings(data);
    } else if (activeTab === 'announcements') {
      const { data } = await supabase
        .from('abm_global_settings')
        .select('*')
        .eq('key', 'popup_config')
        .single();
      if (data) setPopupConfig(data.value);
    } else if (activeTab === 'itinerary') {
      const { data, error } = await supabase
        .from('abm_itinerary')
        .select('*')
        .order('batch_id', { ascending: true });
      
      if (data && data.length > 0) {
        const mapped = data.reduce((acc, curr) => ({ ...acc, [curr.batch_id]: curr.data }), {});
        setItineraryData({ ...DEFAULT_BATCH_DATA, ...mapped });
      } else {
        // Fallback to local default data if DB is empty or error occurs
        setItineraryData(DEFAULT_BATCH_DATA);
      }
    }
    setLoading(false);
  };

  const [popupConfig, setPopupConfig] = useState({
    enabled: false,
    icon: 'megaphone',
    heading: '',
    text: ''
  });

  const [itineraryData, setItineraryData] = useState(null);
  const [selectedBatch, setSelectedBatch] = useState(1);
  const [selectedDay, setSelectedDay] = useState(0);

  const saveAnnouncements = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('abm_global_settings')
      .upsert({ key: 'popup_config', value: popupConfig });
    
    if (error) alert('Error: ' + error.message);
    setSaving(false);
  };

  const saveItinerary = async () => {
    setSaving(true);
    const batchData = itineraryData[selectedBatch];
    const { error } = await supabase
      .from('abm_itinerary')
      .upsert({ batch_id: selectedBatch, data: batchData });
    
    if (error) alert('Error: ' + error.message);
    setSaving(false);
  };

  const toggleQuestion = async (id, currentState) => {
    const { error } = await supabase
      .from('questions')
      .update({ is_active: !currentState })
      .eq('id', id);
    
    if (!error) {
      setQuestions(questions.map(q => q.id === id ? { ...q, is_active: !currentState } : q));
    }
  };

  const startEditing = (q) => {
    setEditingId(q.id);
    setEditForm({ ...q });
  };

  const cancelEditing = () => {
    setEditingId(null);
    setEditForm(null);
  };

  const saveQuestion = async () => {
    if (!editForm) return;
    setSaving(true);
    
    // Ensure index is an integer
    const updatedData = {
      ...editForm,
      correct_answer_index: parseInt(editForm.correct_answer_index)
    };

    // Remove id from update payload
    const { id, ...payload } = updatedData;

    const { error } = await supabase
      .from('questions')
      .update(payload)
      .eq('id', id);

    if (!error) {
      setQuestions(questions.map(q => q.id === id ? updatedData : q));
      setEditingId(null);
      setEditForm(null);
    } else {
      alert('Error saving question: ' + error.message);
    }
    setSaving(false);
  };

  const saveSettings = async () => {
    setSaving(true);
    const { error } = await supabase
      .from('quiz_settings')
      .update({ max_questions: settings.max_questions })
      .eq('id', 1);
    
    setSaving(false);
  };


  const filteredQuestions = questions.filter(q => 
    q.question_text.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.tag?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isDummySupabase = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL.includes('dummy');

  return (
    <div className="admin-container">
      {isDummySupabase && (
        <div className="supabase-warning-banner">
          <AlertTriangle size={18} />
          <span>Supabase not configured. Please add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.</span>
        </div>
      )}
      <aside className="admin-sidebar">
        <div className="admin-logo">
          <div className="logo-icon"><ShieldCheck size={24} /></div>
          <span>Control Panel</span>
        </div>

        <nav className="admin-nav">
          <button 
            className={`nav-item ${activeTab === 'questions' ? 'active' : ''}`}
            onClick={() => setActiveTab('questions')}
          >
            <List size={18} /> Questions
          </button>
          <button 
            className={`nav-item ${activeTab === 'leaderboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('leaderboard')}
          >
            <Trophy size={18} /> Leaderboard
          </button>
          <button 
            className={`nav-item ${activeTab === 'itinerary' ? 'active' : ''}`}
            onClick={() => setActiveTab('itinerary')}
          >
            <Map size={18} /> Itinerary
          </button>
          <button 
            className={`nav-item ${activeTab === 'announcements' ? 'active' : ''}`}
            onClick={() => setActiveTab('announcements')}
          >
            <Megaphone size={18} /> Announcements
          </button>
          <button 
            className={`nav-item ${activeTab === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveTab('settings')}
          >
            <Settings size={18} /> Settings
          </button>
        </nav>

        <button className="admin-exit" onClick={onExit}>
          Exit Dashboard
        </button>
      </aside>

      <main className="admin-main">
        <header className="admin-header">
          <h1>{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management</h1>
          <div className="header-actions">
            <button className="refresh-btn" onClick={fetchData} disabled={loading}>
              <RefreshCcw size={16} className={loading ? 'spinning' : ''} />
            </button>
          </div>
        </header>

        <div className="admin-content">
          <AnimatePresence mode="wait">
            {activeTab === 'questions' && (
              <motion.div 
                key="questions"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="search-bar">
                  <Search size={18} />
                  <input 
                    type="text" 
                    placeholder="Search questions or tags..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                <div className="questions-grid">
                  {filteredQuestions.map((q) => {
                    const isEditing = editingId === q.id;
                    return (
                      <div key={q.id} className={`admin-card q-card-mini ${!q.is_active ? 'inactive' : ''} ${isEditing ? 'editing' : ''}`}>
                        {isEditing ? (
                          <div className="edit-form-mini">
                            <div className="form-row">
                              <input 
                                className="edit-input"
                                value={editForm.tag} 
                                onChange={e => setEditForm({...editForm, tag: e.target.value})}
                                placeholder="Tag"
                              />
                            </div>
                            <textarea 
                              className="edit-textarea"
                              value={editForm.question_text}
                              onChange={e => setEditForm({...editForm, question_text: e.target.value})}
                              placeholder="Question Text"
                            />
                            <div className="options-edit">
                              {editForm.options.map((opt, idx) => (
                                <div key={idx} className="option-row">
                                  <input 
                                    type="radio" 
                                    name="correct" 
                                    checked={editForm.correct_answer_index === idx}
                                    onChange={() => setEditForm({...editForm, correct_answer_index: idx})}
                                  />
                                  <input 
                                    className="edit-input"
                                    value={opt} 
                                    onChange={e => {
                                      const newOpts = [...editForm.options];
                                      newOpts[idx] = e.target.value;
                                      setEditForm({...editForm, options: newOpts});
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                            <div className="edit-actions">
                              <button className="cancel-btn" onClick={cancelEditing}>Cancel</button>
                              <button className="save-btn-mini" onClick={saveQuestion} disabled={saving}>
                                {saving ? '...' : 'Save'}
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="card-header">
                              <div className="header-left">
                                <span className="card-tag">{q.tag}</span>
                              </div>
                              <div className="card-actions">
                                <button className="edit-icon-btn" onClick={() => startEditing(q)}>
                                  Edit
                                </button>
                                <button 
                                  className={`toggle-btn ${q.is_active ? 'on' : 'off'}`}
                                  onClick={() => toggleQuestion(q.id, q.is_active)}
                                >
                                  {q.is_active ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                                </button>
                              </div>
                            </div>
                            <p className="card-text">{q.question_text}</p>
                            <div className="card-footer">
                              <span className="style-badge">{q.ui_style}</span>
                            </div>
                          </>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {activeTab === 'leaderboard' && (
              <motion.div 
                key="leaderboard"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="leaderboard-table-wrap">
                  <table className="admin-table">
                    <thead>
                      <tr>
                        <th>Rank</th>
                        <th>Player</th>
                        <th>Division</th>
                        <th>Score</th>
                        <th>Time</th>
                        <th>Completed At</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, idx) => {
                        const timeTaken = new Date(entry.completed_at).getTime() - new Date(entry.started_at).getTime();
                        const seconds = Math.floor(timeTaken / 1000);
                        return (
                          <tr key={entry.id}>
                            <td className="rank-cell">#{idx + 1}</td>
                            <td>
                              <div className="player-info">
                                <div className="player-avatar"><User size={14} /></div>
                                <span>{entry.users?.name || entry.employee_id}</span>
                              </div>
                            </td>
                            <td>{entry.users?.division}</td>
                            <td className="score-cell">{entry.score} pts</td>
                            <td><div className="time-cell"><Clock size={12} /> {seconds}s</div></td>
                            <td className="date-cell">{new Date(entry.completed_at).toLocaleString()}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </motion.div>
            )}

            {activeTab === 'settings' && (
              <motion.div 
                key="settings"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="admin-card settings-form">
                  <div className="form-group">
                    <label>Maximum Questions per Quiz</label>
                    <p className="form-help">Users will be presented with this many questions (chosen from active ones).</p>
                    <input 
                      type="number" 
                      value={settings.max_questions}
                      onChange={(e) => setSettings({ ...settings, max_questions: parseInt(e.target.value) })}
                    />
                  </div>

                  <button className="save-btn" onClick={saveSettings} disabled={saving}>
                    {saving ? <RefreshCcw size={16} className="spinning" /> : <Save size={16} />}
                    Save Changes
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'announcements' && (
              <motion.div 
                key="announcements"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                <div className="admin-card settings-form">
                  <div className="form-group-row">
                    <label>Enable Global Popup</label>
                    <button 
                      className={`toggle-btn ${popupConfig.enabled ? 'on' : 'off'}`}
                      onClick={() => setPopupConfig({ ...popupConfig, enabled: !popupConfig.enabled })}
                    >
                      {popupConfig.enabled ? <ToggleRight size={32} /> : <ToggleLeft size={32} />}
                    </button>
                  </div>

                  <div className="form-group">
                    <label>Popup Icon</label>
                    <select 
                      value={popupConfig.icon}
                      onChange={(e) => setPopupConfig({ ...popupConfig, icon: e.target.value })}
                      className="admin-select"
                    >
                      <option value="megaphone">Megaphone</option>
                      <option value="bell">Bell</option>
                      <option value="info">Info</option>
                      <option value="alert">Alert</option>
                      <option value="success">Success</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Heading</label>
                    <input 
                      type="text" 
                      value={popupConfig.heading}
                      onChange={(e) => setPopupConfig({ ...popupConfig, heading: e.target.value })}
                      placeholder="Enter heading..."
                    />
                  </div>

                  <div className="form-group">
                    <label>Message Text</label>
                    <textarea 
                      value={popupConfig.text}
                      onChange={(e) => setPopupConfig({ ...popupConfig, text: e.target.value })}
                      placeholder="Enter announcement message..."
                      rows={4}
                    />
                  </div>

                  <button className="save-btn" onClick={saveAnnouncements} disabled={saving}>
                    {saving ? <RefreshCcw size={16} className="spinning" /> : <Save size={16} />}
                    Update Popup
                  </button>
                </div>
              </motion.div>
            )}

            {activeTab === 'itinerary' && (
              <motion.div 
                key="itinerary"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
              >
                {!itineraryData ? (
                  <div className="loading-state">
                    <RefreshCcw size={24} className="spinning" />
                    <p>Fetching itinerary data...</p>
                  </div>
                ) : (
                  <div className="itinerary-editor">
                    <div className="editor-sidebar">
                      <h3>Batches</h3>
                      {[1, 2].map(b => (
                        <button 
                          key={b}
                          className={`batch-selector ${selectedBatch === b ? 'active' : ''}`}
                          onClick={() => { setSelectedBatch(b); setSelectedDay(0); }}
                        >
                          Batch {b}
                        </button>
                      ))}

                      <h3 style={{ marginTop: '20px' }}>Days</h3>
                      {itineraryData[selectedBatch].itinerary.map((day, idx) => (
                        <button 
                          key={idx}
                          className={`day-selector ${selectedDay === idx ? 'active' : ''}`}
                          onClick={() => setSelectedDay(idx)}
                        >
                          Day {day.day}: {day.date}
                        </button>
                      ))}
                    </div>

                    <div className="editor-main">
                      <div className="admin-card">
                        <div className="form-group">
                          <label>Day Title</label>
                          <input 
                            type="text"
                            value={itineraryData[selectedBatch].itinerary[selectedDay].title}
                            onChange={(e) => {
                              const newData = { ...itineraryData };
                              newData[selectedBatch].itinerary[selectedDay].title = e.target.value;
                              setItineraryData(newData);
                            }}
                          />
                        </div>

                        <div className="activities-list">
                          <label>Activities</label>
                          {itineraryData[selectedBatch].itinerary[selectedDay].activities.map((act, idx) => (
                            <div key={idx} className="activity-edit-card">
                              <div className="act-header">
                                <input 
                                  className="time-input"
                                  value={act.time}
                                  onChange={(e) => {
                                    const newData = { ...itineraryData };
                                    newData[selectedBatch].itinerary[selectedDay].activities[idx].time = e.target.value;
                                    setItineraryData(newData);
                                  }}
                                />
                                <button 
                                  className="delete-btn"
                                  onClick={() => {
                                    const newData = { ...itineraryData };
                                    newData[selectedBatch].itinerary[selectedDay].activities.splice(idx, 1);
                                    setItineraryData(newData);
                                  }}
                                >
                                  <Trash2 size={14} />
                                </button>
                              </div>
                              <textarea 
                                value={act.text}
                                onChange={(e) => {
                                  const newData = { ...itineraryData };
                                  newData[selectedBatch].itinerary[selectedDay].activities[idx].text = e.target.value;
                                  setItineraryData(newData);
                                }}
                              />
                              <div className="form-group" style={{ marginTop: '10px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                  <label style={{ fontSize: '0.7rem' }}>Map Link (Optional)</label>
                                  {act.map && (
                                    <button 
                                      onClick={() => window.open(act.map, '_blank')}
                                      style={{ background: 'none', border: 'none', color: '#fbbf24', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                                      title="Test Link"
                                    >
                                      <ExternalLink size={12} />
                                    </button>
                                  )}
                                </div>
                                <input 
                                  type="text"
                                  placeholder="Google Maps URL"
                                  value={act.map || ''}
                                  onChange={(e) => {
                                    const newData = { ...itineraryData };
                                    newData[selectedBatch].itinerary[selectedDay].activities[idx].map = e.target.value;
                                    setItineraryData(newData);
                                  }}
                                />
                              </div>
                            </div>
                          ))}
                          <button 
                            className="add-btn"
                            onClick={() => {
                              const newData = { ...itineraryData };
                              newData[selectedBatch].itinerary[selectedDay].activities.push({
                                time: "New Time",
                                text: "New Activity",
                                icon: "Compass"
                              });
                              setItineraryData(newData);
                            }}
                          >
                            <Plus size={16} /> Add Activity
                          </button>
                        </div>

                        <button className="save-btn" style={{ marginTop: '20px' }} onClick={saveItinerary} disabled={saving}>
                          {saving ? <RefreshCcw size={16} className="spinning" /> : <Save size={16} />}
                          Save Batch {selectedBatch}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
