import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, Flame, Zap } from 'lucide-react';
import './WelcomeScreen.css';
import venetianImg from '../assets/destinations/venetian.png';
import kowloonImg from '../assets/destinations/kowloon.png';
import oceanParkImg from '../assets/destinations/oceanpark.png';
import victoriaPeakImg from '../assets/destinations/victoria_peak.png';

const TransitionOverlay = () => (
  <motion.div 
    className="transition-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
  >
    <div className="overdrive-singularity"></div>
    <div className="energy-surge"></div>
    
    <div className="hud-ring-wrap">
      <div className="hud-ring ring-1"></div>
      <div className="hud-ring ring-2"></div>
      <div className="hud-ring ring-3"></div>
    </div>

    {Array(6).fill(0).map((_, i) => (
      <div key={i} className="lightning-bolt" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, animationDelay: `${Math.random() * 0.5}s` }}></div>
    ))}

    <div className="combat-bracket"></div>

    <motion.div 
      className="screen-shake-wrap"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', damping: 10 }}
    >
      <div className="overdrive-title">INITIATING</div>
    </motion.div>
  </motion.div>
);

const RocketLaunch = () => {
  const particles = Array.from({ length: 24 });
  
  return (
    <motion.div 
      className="rocket-launch-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="launch-center"
        initial={{ y: 0 }}
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 0.1, repeat: 10 }}
      >
        {/* Exhaust Particle System */}
        <div className="particle-field">
          {particles.map((_, i) => (
            <motion.div
              key={i}
              className="rocket-particle"
              initial={{ scale: 1, opacity: 1, y: 0, x: 0 }}
              animate={{ 
                y: [0, 200 + Math.random() * 300], 
                x: [(Math.random() - 0.5) * 100],
                scale: [1, 0],
                opacity: [1, 0]
              }}
              transition={{ 
                duration: 0.8 + Math.random() * 0.5, 
                repeat: Infinity,
                delay: Math.random() * 0.5
              }}
            />
          ))}
        </div>

        {/* The Rocket Vessel */}
        <motion.div 
          className="rocket-vessel"
          initial={{ scale: 0.8, y: 400, rotate: -45 }}
          animate={{ 
            y: [400, 0, -1200],
            rotate: [-45, -45, -30],
            scale: [0.8, 1.2, 2.5]
          }}
          transition={{ 
            times: [0, 0.4, 1],
            duration: 1.5,
            ease: "easeIn"
          }}
        >
          <div className="rocket-body-wrap">
            <Rocket size={100} className="rocket-icon-main" />
            <motion.div 
              className="flame-wrap"
              animate={{ scale: [1, 1.4, 1.2], opacity: [0.8, 1, 0.9] }}
              transition={{ repeat: Infinity, duration: 0.1 }}
            >
              <Flame size={60} className="rocket-flame-icon" fill="currentColor" />
            </motion.div>
          </div>
          
          {/* Energy Rings */}
          {[1, 2, 3].map(i => (
            <motion.div
              key={i}
              className="energy-ring"
              animate={{ scale: [1, 3], opacity: [0.5, 0] }}
              transition={{ repeat: Infinity, duration: 0.4, delay: i * 0.1 }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Screen Distortion Flash */}
      <motion.div 
        className="launch-flash"
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 1, 0] }}
        transition={{ delay: 0.5, duration: 0.3 }}
      />
    </motion.div>
  );
};

const WelcomeScreen = ({ onNext }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const handleRegister = () => {
    setIsLaunching(true);
    
    // The "Blast Off" timing matches the Framer Motion sequence
    setTimeout(() => {
      setIsLaunching(false);
      setIsTransitioning(true);
    }, 1500);

    // Final navigation
    setTimeout(() => {
      onNext();
    }, 4500);
  };

  return (
    <div className="welcome-screen">
      <AnimatePresence>
        {isLaunching && <RocketLaunch />}
        {isTransitioning && <TransitionOverlay />}
      </AnimatePresence>

      <header className="welcome-header">
        <motion.div 
          className="brand-logo-wrap"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="logo-orbit-a"><div className="logo-spark" /></div>
          <div className="logo-orbit-b"><div className="logo-spark logo-spark-b" /></div>
          <img src="/coro-logo.png" alt="Coromandel Logo" className="main-logo-img" />
        </motion.div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="welcome-hero">
        <div className="hero-visual">
          <img src={kowloonImg} alt="Hong Kong Skyline" />
        </div>
        
        <div className="hero-content">
          <motion.div 
            className="hero-badge"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
          >
            ABM 2026 SUMMIT
          </motion.div>
          
          <motion.h1 
            className="welcome-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            CONSOLIDATE TO<br />ACCELERATE
          </motion.h1>
          
          <motion.p 
            className="welcome-tagline"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            Macau – Hong Kong · 8–14 May 2026<br />
            Where strategy meets experience — two iconic cities, one unforgettable summit.
          </motion.p>
          
          <motion.div 
            className="hero-cta"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <motion.button 
              className="btn-main" 
              onClick={handleRegister}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="btn-glow"></span>
              <span className="btn-scan"></span>
              <span className="btn-text">INITIATE THE EXPERIENCE</span>
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* --- BENTO HIGHLIGHTS --- */}
      <section className="bento-section">
        <div className="bento-grid">
          <div className="bento-item large">
            <div className="bento-icon">⚡</div>
            <h3>Summit Overview</h3>
            <p>An elite, high-performance schedule meticulously crafted for Coromandel leadership.</p>
            
            <div className="stat-grid">
              <div className="mini-stat">
                <span className="val">5 Days</span>
                <span className="lbl">Programme</span>
              </div>
              <div className="mini-stat">
                <span className="val">2 Cities</span>
                <span className="lbl">HK + Macau</span>
              </div>
              <div className="mini-stat">
                <span className="val">2 Groups</span>
                <span className="lbl">Cycle</span>
              </div>
              <div className="mini-stat">
                <span className="val">4★+</span>
                <span className="lbl">Hospitality</span>
              </div>
            </div>
          </div>

          <div className="bento-item medium">
            <div className="bento-icon">💎</div>
            <h3>Venetian Gala</h3>
            <p>A night of prestige and celebration at the Venetian Grand Ball Room.</p>
          </div>

          <div className="bento-item">
            <div className="bento-icon">🎡</div>
            <h3>70+ Hours</h3>
            <p>Curated experiences from Ocean Park to the Diamond Show.</p>
          </div>

          <div className="bento-item">
            <div className="bento-icon">📍</div>
            <h3>6+ Sites</h3>
            <p>Journey through landmarks of global innovation.</p>
          </div>
        </div>
      </section>

      {/* --- DESTINATION GALLERY --- */}
      <section className="destinations-section">
        <div className="section-head">
          <h2>Key Destinations</h2>
          <p>Hand-picked experiences across the Pearl River Delta.</p>
        </div>

        <div className="gallery-container">
          <div className="gallery-track">
            {[
              {
                name: 'Venetian Macau',
                tag: 'GALA VENUE',
                img: venetianImg,
                desc: 'Home to the Awards Night and Grand Gala celebrations.'
              },
              {
                name: 'Harbour Grand',
                tag: 'RESIDENCE',
                img: kowloonImg,
                desc: 'Luxury residence with stunning views of Victoria Harbour.'
              },
              {
                name: 'Ocean Park',
                tag: 'ADVENTURE',
                img: oceanParkImg,
                desc: 'A world-class experience with buffet lunch and fireworks.'
              },
              {
                name: 'Victoria Peak',
                tag: 'THE SUMMIT',
                img: victoriaPeakImg,
                desc: 'The iconic skyline view and high-speed ferry crossing.'
              }
            ].map((item, idx) => (
              <div key={idx} className="destination-card">
                <img src={item.img} alt={item.name} />
                <div className="card-content">
                  <span className="card-badge">{item.tag}</span>
                  <h3 className="card-name">{item.name}</h3>
                  <p className="card-info">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section style={{ padding: '100px 24px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2.25rem', marginBottom: '32px', fontWeight: 800 }}>Experience the Future.</h2>
        <motion.button 
          className="btn-main" 
          onClick={handleRegister} 
          style={{ width: 'auto', padding: '18px 60px' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className="btn-glow"></span>
          <span className="btn-scan"></span>
          <span className="btn-text">JOIN THE SUMMIT</span>
        </motion.button>
      </section>
    </div>
  );
};

export default WelcomeScreen;
