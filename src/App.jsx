import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// We will build these screens in the next step
import LandingScreen from './screens/LandingScreen';
import LoginScreen from './screens/LoginScreen';
import LoaderScreen from './screens/LoaderScreen';
import QuizScreen from './screens/QuizScreen';
import CompletionScreen from './screens/CompletionScreen';

import './index.css';

// Central configuration for the current active quiz
const ACTIVE_QUESTION_SET = 'macao_2025';

function App() {
  const [currentScreen, setCurrentScreen] = useState('landing'); // landing, login, loader, quiz, completion
  const [employee, setEmployee] = useState(null);
  const [initialProgress, setInitialProgress] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [timeTaken, setTimeTaken] = useState(0);

  // Framer Motion Animation Variants for Screen Transitions
  const screenVariants = {
    initial: { opacity: 0, y: 30 },
    in: { opacity: 1, y: 0 },
    out: { opacity: 0, y: -40 }
  };

  const transition = { type: 'spring', damping: 25, stiffness: 200 };

  return (
    <>
      <div id="ambientBg">
        <div className="orb orb1"></div>
        <div className="orb orb2"></div>
        <div className="orb orb3"></div>
      </div>
      <div className="bg-grid"></div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentScreen}
          className="screen-container"
          variants={screenVariants}
          initial="initial"
          animate="in"
          exit="out"
          transition={transition}
          style={{ width: '100%', height: '100%' }}
        >
          {currentScreen === 'landing' && <LandingScreen onNext={() => setCurrentScreen('login')} />}
          
          {currentScreen === 'login' && 
            <LoginScreen 
              currentSet={ACTIVE_QUESTION_SET}
              onNext={(emp, progressData) => { 
                setEmployee(emp); 
                setInitialProgress(progressData);
                setCurrentScreen('loader'); 
              }} 
              onAlreadyPlayed={(emp, score, time) => {
                setEmployee(emp);
                setQuizScore(score);
                setTimeTaken(time);
                setCurrentScreen('completion');
              }}
            />
          }
          
          {currentScreen === 'loader' && 
            <LoaderScreen employee={employee} onNext={() => setCurrentScreen('quiz')} />
          }
          
          {currentScreen === 'quiz' && 
            <QuizScreen 
              employee={employee} 
              initialProgress={initialProgress}
              currentSet={ACTIVE_QUESTION_SET}
              onNext={(score, time) => { 
                setQuizScore(score); 
                setTimeTaken(time); 
                setCurrentScreen('completion'); 
              }} 
            />
          }
          
          {currentScreen === 'completion' && 
            <CompletionScreen 
              employee={employee}
              score={quizScore} 
              timeTaken={timeTaken || 0} 
              onRestart={() => setCurrentScreen('landing')} 
            />
          }
        </motion.div>
      </AnimatePresence>
    </>
  );
}

export default App;
