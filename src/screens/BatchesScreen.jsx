import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Calendar, MapPin, Clock, 
  ExternalLink, Ship, Plane, Bus, 
  Coffee, Utensils, Music, Users,
  ChevronRight, Star, Compass, Sparkles, Crown,
  Megaphone, Bell, Info, AlertTriangle, CheckCircle
} from 'lucide-react';
import './BatchesScreen.css';
import { supabase } from '../supabaseClient';

import venetianImg from '../assets/destinations/venetian.png';
import kowloonImg from '../assets/destinations/kowloon.png';
import oceanParkImg from '../assets/destinations/oceanpark.png';
import victoriaPeakImg from '../assets/destinations/victoria_peak.png';
import macauNeon from '../assets/destinations/macau_neon.png';
import np360Cool from '../assets/destinations/np360_cool.png';
import oceanParkFun from '../assets/destinations/ocean_park_fun.png';
import hotelNeon from '../assets/destinations/hotel_neon.png';
import landmarksCool from '../assets/destinations/landmarks_cool.png';

const ICON_MAP = {
  Plane: <Plane size={18} />,
  Ship: <Ship size={18} />,
  Bus: <Bus size={18} />,
  MapPin: <MapPin size={18} />,
  Utensils: <Utensils size={18} />,
  Coffee: <Coffee size={18} />,
  Star: <Star size={18} />,
  Music: <Music size={18} />,
  Compass: <Compass size={18} />,
  Users: <Users size={18} />,
  Crown: <Crown size={18} />,
  Sparkles: <Sparkles size={18} />,
  Megaphone: <Megaphone size={18} />,
  Bell: <Bell size={18} />,
  Info: <Info size={18} />,
  AlertTriangle: <AlertTriangle size={18} />,
  CheckCircle: <CheckCircle size={18} />
};

const IMAGE_MAP = {
  venetianImg,
  kowloonImg,
  oceanParkImg,
  victoriaPeakImg,
  macauNeon,
  np360Cool,
  oceanParkFun,
  hotelNeon,
  landmarksCool
};

import { DEFAULT_BATCH_DATA } from '../data/itineraryData';

export default function BatchesScreen({ onBack, initialBatch = null }) {
  const [currentBatch, setCurrentBatch] = useState(initialBatch || null);
  const [currentDay, setCurrentDay] = useState(0);
  const [batches, setBatches] = useState(DEFAULT_BATCH_DATA);
  const [loading, setLoading] = useState(true);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const fetchItinerary = async () => {
      try {
        const { data, error } = await supabase
          .from('abm_itinerary')
          .select('*');
        
        if (data && data.length > 0) {
          const mapped = data.reduce((acc, curr) => ({ ...acc, [curr.batch_id]: curr.data }), {});
          setBatches(prev => ({ ...prev, ...mapped }));
        }
      } catch (err) {
        console.error("Failed to fetch itinerary:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchItinerary();
  }, []);

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  return (
    <div className="batches-screen" onMouseMove={handleMouseMove}>
      <div className="bg-nebula" />
      
      {/* Interactive Background Glow */}
      <motion.div 
        className="mouse-glow"
        animate={{
          x: mousePos.x - 250,
          y: mousePos.y - 250,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 50, mass: 0.5 }}
      />

      {/* Floating Adventure Elements (Parallax) */}
      <div className="parallax-bg-elements">
        <FloatingIcon icon={<Plane size={120} />} top="10%" left="5%" delay={0} />
        <FloatingIcon icon={<Compass size={180} />} top="60%" left="85%" delay={2} />
        <FloatingIcon icon={<MapPin size={100} />} top="20%" left="80%" delay={1} />
        <FloatingIcon icon={<Ship size={140} />} top="80%" left="15%" delay={3} />
      </div>

      <AnimatePresence mode="wait">
        {!currentBatch ? (
          <motion.div 
            key="selection"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -20 }}
            className="selection-view"
          >
            <header className="batches-header">
              <button className="back-home-btn" onClick={onBack}>
                <ArrowLeft size={20} />
                <span>Back to Home</span>
              </button>
              <h1 className="modern-shimmer-title">SELECT YOUR <span className="shimmer-text">BATCH</span></h1>
              <p className="selection-subtitle">Experience the summit through a curated journey designed for excellence.</p>
            </header>

            <div className="batch-cards-container">
              {[1, 2].map((id, index) => batches[id] && (
                <BatchCard 
                  key={id} 
                  data={batches[id]} 
                  index={index}
                  onClick={() => setCurrentBatch(id)} 
                />
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="detail"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="detail-view"
          >
            <ItineraryShowcase 
              batch={batches[currentBatch]} 
              initialDay={currentDay + 1}
              onBack={() => {
                if (initialBatch) onBack(); 
                else setCurrentBatch(null); 
              }} 
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const BatchCard = ({ data, index, onClick }) => {
  return (
    <motion.div 
      className="batch-card-wrapper"
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.16, 1, 0.3, 1] 
      }}
      whileHover={{ y: -15, transition: { duration: 0.4 } }}
      onClick={onClick}
    >
      <div className="batch-card-inner">
        {/* Full Bleed Background with Parallax effect via hover */}
        <div className="card-bg-container">
          <img src={data.id === 1 ? "/batch1_bg.png" : "/batch2_bg.png"} className="card-bg-img" alt="Adventure" />
          <div className="card-overlay" />
        </div>

        <div className="card-content-vibrant">
          <motion.div 
            className="floating-badge"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            {data.group}
          </motion.div>
          
          <h2 className="vibrant-title">{data.title}</h2>
          
          <div className="card-stats-row">
            <div className="card-stat-item">
              <Calendar size={16} className="stat-icon" />
              <span>{data.dates}</span>
            </div>
            <div className="card-stat-item">
              <MapPin size={16} className="stat-icon" />
              <span>{data.id === 1 ? "HK → Macau" : "Macau → HK"}</span>
            </div>
          </div>

          <div className="itinerary-preview">
            <div className="preview-label">PREVIEW</div>
            <p className="preview-text">
              {data.id === 1 
                ? "Explore Lantau, Ocean Park, and the Grand Venetian Gala." 
                : "Experience Macau's heritage, Strategic Summit, and HK Skyline."}
            </p>
          </div>

          <motion.button 
            className="explore-btn-vibrant"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            START ADVENTURE <ChevronRight size={18} />
          </motion.button>
        </div>

        {/* Decorative Floating Elements */}
        <div className="decorative-glow" />
        <motion.div 
          className="floating-icon-deco"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Compass size={120} strokeWidth={0.5} opacity={0.1} />
        </motion.div>
      </div>
    </motion.div>
  );
};

const ItineraryShowcase = ({ batch, initialDay = 1, onBack }) => {
  const [activeDay, setActiveDay] = useState(initialDay);

  return (
    <div className="itinerary-container">
      <nav className="itinerary-nav">
        <button className="back-btn" onClick={onBack}>
          <ArrowLeft size={20} />
          <span>Back to Batches</span>
        </button>
        <div className="batch-summary-mini">
            <span className="mini-group">{batch.group}</span>
            <span className="mini-dates">{batch.dates}</span>
        </div>
      </nav>

      <div className="itinerary-layout">
        {/* Day Selector Sidebar */}
        <aside className="day-sidebar">
          {batch.itinerary.map((day) => (
            <button 
              key={day.day}
              className={`day-btn ${activeDay === day.day ? 'active' : ''}`}
              onClick={() => setActiveDay(day.day)}
            >
              <span className="day-num">DAY 0{day.day}</span>
              <span className="day-date">{day.date}</span>
            </button>
          ))}
        </aside>

        {/* Unified Rhombus Timeline Content */}
        <main className="timeline-content">
          <AnimatePresence mode="wait">
            <motion.div 
              key={activeDay}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="itinerary-unified-panel"
            >
              <div className="day-header">
                <div className="day-title-wrap">
                  <span className="day-badge">Day 0{activeDay}</span>
                  <h2 className="day-title">{batch.itinerary[activeDay-1].title}</h2>
                </div>
                <div className="day-calendar">
                  <Calendar size={18} /> {batch.itinerary[activeDay-1].date}
                </div>
              </div>

              <div className="activities-timeline">
                {batch.itinerary[activeDay-1].activities.map((act, i) => {
                  return (
                    <motion.div 
                      key={i} 
                      className={`activity-item ${act.map ? 'clickable' : ''}`}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      onClick={() => act.map && window.open(act.map, '_blank', 'noopener,noreferrer')}
                    >
                    <div className="rhombus-node-wrap">
                      <div className="rhombus-node">
                        <img 
                          src={DEFAULT_BATCH_DATA[batch.id].itinerary[activeDay-1].activities[i].image || "https://images.unsplash.com/photo-1543059123-289b4f97125f?q=80&w=600&auto=format&fit=crop"} 
                          alt="Activity" 
                          className="rhombus-img"
                        />
                      </div>
                      <div className="smart-icon-badge">
                        {typeof act.icon === 'string' 
                          ? (ICON_MAP[act.icon] || <Compass size={14} />) 
                          : React.cloneElement(act.icon, { size: 14 })}
                      </div>
                    </div>

                    <div className="activity-details">
                      <span className="time-label">{act.time}</span>
                      <h3 className="activity-text">{act.text}</h3>
                      {act.map && (
                        <a href={act.map} target="_blank" rel="noreferrer" className="map-link">
                          <MapPin size={14} /> EXPLORE ON MAP
                        </a>
                      )}
                    </div>
                  </motion.div>
                )})}
              </div>

              <div className="day-footer">
                <Clock size={20} />
                <span>{batch.itinerary[activeDay-1].footer}</span>
              </div>
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

const FloatingIcon = ({ icon, top, left, delay }) => (
  <motion.div 
    className="bg-floating-icon"
    style={{ top, left }}
    animate={{ 
      y: [0, -30, 0],
      rotate: [0, 10, 0],
      opacity: [0.1, 0.2, 0.1]
    }}
    transition={{ 
      duration: 6 + delay, 
      repeat: Infinity, 
      ease: "easeInOut",
      delay 
    }}
  >
    {icon}
  </motion.div>
);

