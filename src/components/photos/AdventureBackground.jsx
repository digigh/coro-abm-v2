import React from 'react';
import { motion } from 'framer-motion';
import { Plane, Ship, Cloud } from 'lucide-react';

const AdventureBackground = () => {
  return (
    <div className="adventure-background-layer">
      {/* Plane Animation */}
      <motion.div
        className="floating-plane"
        initial={{ x: '-120%', y: '15%', opacity: 0 }}
        animate={{ 
          x: '120vw', 
          y: ['15%', '12%', '15%'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 25, 
          repeat: Infinity, 
          ease: "linear",
          times: [0, 0.1, 0.9, 1]
        }}
      >
        <Plane size={60} className="plane-icon" />
      </motion.div>

      {/* Ferry Animation */}
      <motion.div
        className="floating-ferry"
        initial={{ x: '120%', y: '85%', opacity: 0 }}
        animate={{ 
          x: '-120vw', 
          y: ['85%', '87%', '85%'],
          opacity: [0, 1, 1, 0]
        }}
        transition={{ 
          duration: 35, 
          repeat: Infinity, 
          ease: "linear",
          times: [0, 0.1, 0.9, 1]
        }}
      >
        <Ship size={80} className="ferry-icon" />
      </motion.div>

      {/* Clouds */}
      {[...Array(4)].map((_, i) => (
        <motion.div
          key={i}
          className={`floating-cloud cloud-${i}`}
          initial={{ x: '-20%', opacity: 0 }}
          animate={{ x: '110vw', opacity: 0.3 }}
          transition={{ 
            duration: 40 + (i * 10), 
            repeat: Infinity, 
            delay: i * 8,
            ease: "linear"
          }}
        >
          <Cloud size={100 + (i * 20)} />
        </motion.div>
      ))}
    </div>
  );
};

export default AdventureBackground;
