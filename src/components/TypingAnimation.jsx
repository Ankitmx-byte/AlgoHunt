import React, { useState, useEffect, useRef } from 'react';
import './TypingAnimation.css';

const TypingAnimation = ({ text, speed = 100, delay = 0, className = '', onComplete = () => {} }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const timeoutRef = useRef(null);

  useEffect(() => {
    // Reset when text changes
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setIsTyping(false);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Start typing after delay
    timeoutRef.current = setTimeout(() => {
      setIsTyping(true);
    }, delay);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [text, delay]);
  
  useEffect(() => {
    if (!isTyping) return;
    
    if (currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else {
      setIsTyping(false);
      setIsComplete(true);
      onComplete();
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isTyping, text, speed, onComplete]);
  
  return (
    <span className={`typing-animation ${className} ${isComplete ? 'complete' : ''}`}>
      {displayText}
      <span className="cursor"></span>
    </span>
  );
};

export default TypingAnimation;
