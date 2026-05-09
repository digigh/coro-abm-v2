import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Play, Image as ImageIcon, Video, Calendar, MapPin, Users, Star, ExternalLink, Trophy } from 'lucide-react';
import './GalleryScreen.css';

const GALLERY_DATA = {
  2025: {
    year: "2025",
    theme: "REACHING NEW HEIGHTS",
    location: "Singapore & Bali",
    stats: { attendees: "450+", highlights: "Skyline Gala", rewards: "25 Awards" },
    media: [
      { id: 1, type: 'image', url: 'https://images.unsplash.com/photo-1525624905535-d46c31b81b7c?q=80&w=800&auto=format&fit=crop', title: 'Singapore Skyline' },
      { id: 2, type: 'video', url: 'https://images.unsplash.com/photo-1548625361-195fe576b510?q=80&w=800&auto=format&fit=crop', title: 'Bali Beach Retreat' },
      { id: 3, type: 'image', url: 'https://images.unsplash.com/photo-1518391846015-55a9cc003b25?q=80&w=800&auto=format&fit=crop', title: 'Grand Ballroom Setup' },
      { id: 4, type: 'image', url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop', title: 'Evening Gala Performance' },
      { id: 5, type: 'video', url: 'https://images.unsplash.com/photo-1514525253361-bee8718a300c?q=80&w=800&auto=format&fit=crop', title: 'Awards Ceremony Highlights' },
      { id: 6, type: 'image', url: 'https://images.unsplash.com/photo-1505232458627-41bed68113ad?q=80&w=800&auto=format&fit=crop', title: 'Team Building Adventure' },
    ]
  },
  2024: {
    year: "2024",
    theme: "STRATEGY UNLEASHED",
    location: "Dubai & Abu Dhabi",
    stats: { attendees: "400+", highlights: "Desert Safari", rewards: "20 Awards" },
    media: [
      { id: 7, type: 'image', url: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=800&auto=format&fit=crop', title: 'Burj Khalifa View' },
      { id: 8, type: 'image', url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop', title: 'Tech Innovation Summit' },
      { id: 9, type: 'video', url: 'https://images.unsplash.com/photo-1527269534026-c86f4009eace?q=80&w=800&auto=format&fit=crop', title: 'Desert Camp Night' },
      { id: 10, type: 'image', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?q=80&w=800&auto=format&fit=crop', title: 'Sheikh Zayed Mosque Visit' },
      { id: 11, type: 'image', url: 'https://images.unsplash.com/photo-1475721027187-402ad2989a3b?q=80&w=800&auto=format&fit=crop', title: 'Closing Keynote' },
      { id: 12, type: 'image', url: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop', title: 'Gala Dinner' },
    ]
  },
  2023: {
    year: "2023",
    theme: "THE NEW FRONTIER",
    location: "Mumbai & Goa",
    stats: { attendees: "350+", highlights: "Beach Bash", rewards: "18 Awards" },
    media: [
      { id: 13, type: 'image', url: 'https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?q=80&w=800&auto=format&fit=crop', title: 'Goa Beach Party' },
      { id: 14, type: 'image', url: 'https://images.unsplash.com/photo-1570160897040-3043012a11ce?q=80&w=800&auto=format&fit=crop', title: 'Mumbai Gateway Visit' },
      { id: 15, type: 'image', url: 'https://images.unsplash.com/photo-1540317580384-e5d43616b9aa?q=80&w=800&auto=format&fit=crop', title: 'Innovation Workshop' },
      { id: 16, type: 'video', url: 'https://images.unsplash.com/photo-1496337589254-7e19d01ced44?q=80&w=800&auto=format&fit=crop', title: 'Grand Welcome' },
      { id: 17, type: 'image', url: 'https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop', title: 'Conference Day 1' },
      { id: 18, type: 'image', url: 'https://images.unsplash.com/photo-1523580494863-6f30312248f5?q=80&w=800&auto=format&fit=crop', title: 'Networking Night' },
    ]
  }
};

const GalleryScreen = ({ onBack }) => {
  const [selectedYear, setSelectedYear] = useState(2025);
  const [filter, setFilter] = useState('all'); // all, photo, video

  const currentYearData = GALLERY_DATA[selectedYear];
  const filteredMedia = currentYearData.media.filter(item => {
    if (filter === 'all') return true;
    return item.type === filter;
  });

  return (
    <div className="gallery-screen">
      {/* --- BACKGROUND EFFECTS --- */}
      <div className="gallery-bg-mesh" />
      <div className="gallery-bg-scanlines" />

      {/* --- HEADER --- */}
      <header className="gallery-header">
        <button className="gallery-back-btn" onClick={onBack}>
          <ArrowLeft size={24} />
          <span>BACK</span>
        </button>
        <div className="gallery-title-wrap">
          <motion.h1 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="gallery-main-title"
          >
            THE <span className="text-vibrant-teal">LEGACY</span> GALLERY
          </motion.h1>
          <div className="gallery-title-underline" />
        </div>
      </header>

      {/* --- YEAR TABS --- */}
      <div className="gallery-year-tabs">
        {[2025, 2024, 2023].map(year => (
          <button 
            key={year}
            className={`year-tab-btn ${selectedYear === year ? 'active' : ''}`}
            onClick={() => setSelectedYear(year)}
          >
            <span className="year-text">{year}</span>
            {selectedYear === year && (
              <motion.div layoutId="activeTab" className="active-tab-glow" />
            )}
          </button>
        ))}
      </div>

      {/* --- YEAR INFO --- */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedYear}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="year-info-panel"
        >
          <div className="year-hero-content">
            <h2 className="year-theme">{currentYearData.theme}</h2>
            <div className="year-meta">
              <span className="meta-item"><MapPin size={16} /> {currentYearData.location}</span>
              <span className="meta-item"><Calendar size={16} /> Annual Meet {selectedYear}</span>
            </div>
          </div>
          <div className="year-stats-grid">
            <div className="stat-card">
              <Users size={20} className="stat-icon" />
              <div className="stat-value">{currentYearData.stats.attendees}</div>
              <div className="stat-label">ATTENDEES</div>
            </div>
            <div className="stat-card">
              <Star size={20} className="stat-icon" />
              <div className="stat-value">{currentYearData.stats.highlights}</div>
              <div className="stat-label">KEY HIGHLIGHT</div>
            </div>
            <div className="stat-card">
              <Trophy size={20} className="stat-icon" />
              <div className="stat-value">{currentYearData.stats.rewards}</div>
              <div className="stat-label">AWARDS GIVEN</div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* --- FILTER CONTROLS --- */}
      <div className="gallery-filters">
        <button 
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          ALL
        </button>
        <button 
          className={`filter-btn ${filter === 'image' ? 'active' : ''}`}
          onClick={() => setFilter('image')}
        >
          <ImageIcon size={16} /> PHOTOS
        </button>
        <button 
          className={`filter-btn ${filter === 'video' ? 'active' : ''}`}
          onClick={() => setFilter('video')}
        >
          <Video size={16} /> VIDEOS
        </button>
      </div>

      {/* --- MEDIA GRID --- */}
      <motion.div 
        layout
        className="gallery-grid"
      >
        <AnimatePresence mode="popLayout">
          {filteredMedia.map((item, index) => (
            <motion.div 
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ delay: index * 0.05 }}
              className="media-card"
            >
              <div className="media-preview-wrap">
                <img src={item.url} alt={item.title} className="media-img" />
                <div className="media-overlay">
                  {item.type === 'video' && <div className="play-icon-wrap"><Play fill="currentColor" size={32} /></div>}
                  <div className="media-info-bottom">
                    <h3>{item.title}</h3>
                    <ExternalLink size={16} className="expand-icon" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* --- FOOTER DECO --- */}
      <footer className="gallery-footer">
        <p>ABM SUMMIT LEGACY · 2023 - 2025 · EMPOWERING THE FUTURE</p>
      </footer>
    </div>
  );
};

export default GalleryScreen;
