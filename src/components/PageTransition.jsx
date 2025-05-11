import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/animations.css';

const PageTransition = ({ children }) => {
  const location = useLocation();
  const [displayLocation, setDisplayLocation] = useState(location);
  const [transitionStage, setTransitionStage] = useState('page-transition-enter');

  useEffect(() => {
    if (location !== displayLocation) {
      setTransitionStage('page-transition-exit-active');
      
      const timeout = setTimeout(() => {
        setDisplayLocation(location);
        setTransitionStage('page-transition-enter');
      }, 300); // Match this with the CSS transition time
      
      return () => clearTimeout(timeout);
    }
    
    const enterTimeout = setTimeout(() => {
      setTransitionStage('page-transition-enter-active');
    }, 10);
    
    return () => clearTimeout(enterTimeout);
  }, [location, displayLocation]);

  return (
    <div className={`page-transition ${transitionStage}`}>
      {children}
    </div>
  );
};

export default PageTransition;
