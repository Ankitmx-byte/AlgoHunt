import React, { useEffect, useRef, useState } from 'react';
import '../styles/animations.css';

const ScrollReveal = ({ 
  children, 
  animation = 'fade-in-up', 
  delay = 0,
  threshold = 0.1,
  duration = 0.6,
  once = true
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef(null);
  
  useEffect(() => {
    const currentElement = elementRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.unobserve(currentElement);
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: threshold
      }
    );
    
    if (currentElement) {
      observer.observe(currentElement);
    }
    
    return () => {
      if (currentElement) {
        observer.unobserve(currentElement);
      }
    };
  }, [once, threshold]);
  
  const style = {
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'none' : getInitialTransform(animation),
    transition: `opacity ${duration}s ease, transform ${duration}s ease`,
    transitionDelay: `${delay}s`
  };
  
  return (
    <div ref={elementRef} style={style}>
      {children}
    </div>
  );
};

// Helper function to determine initial transform based on animation type
const getInitialTransform = (animation) => {
  switch (animation) {
    case 'fade-in-up':
      return 'translateY(30px)';
    case 'fade-in-down':
      return 'translateY(-30px)';
    case 'fade-in-left':
      return 'translateX(-30px)';
    case 'fade-in-right':
      return 'translateX(30px)';
    case 'scale-in':
      return 'scale(0.9)';
    default:
      return 'none';
  }
};

export default ScrollReveal;
