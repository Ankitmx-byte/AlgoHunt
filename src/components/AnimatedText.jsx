import React, { useState, useEffect, useRef } from 'react';
import './AnimatedText.css';

const AnimatedText = ({
  text,
  variant = 'gradient',
  animation = 'typing',
  speed = 50,
  delay = 0,
  repeat = false,
  repeatDelay = 2000,
  cursor = true,
  className = '',
  onComplete = () => {},
  ...props
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const timeoutRef = useRef(null);
  
  // Text variants
  const textClasses = [
    'animated-text',
    `animated-text-${variant}`,
    `animated-text-${animation}`,
    isComplete ? 'animated-text-complete' : '',
    cursor ? 'animated-text-cursor' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Initialize typing animation
  useEffect(() => {
    // Reset when text changes
    setDisplayText('');
    setCurrentIndex(0);
    setIsComplete(false);
    setIsTyping(false);
    setIsDeleting(false);
    
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
  
  // Handle typing animation
  useEffect(() => {
    if (!isTyping) return;
    
    if (!isDeleting && currentIndex < text.length) {
      // Typing forward
      timeoutRef.current = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
    } else if (isDeleting && displayText.length > 0) {
      // Deleting
      timeoutRef.current = setTimeout(() => {
        setDisplayText(prev => prev.slice(0, -1));
      }, speed / 2);
    } else if (isDeleting && displayText.length === 0) {
      // Reset after deleting
      setIsDeleting(false);
      setCurrentIndex(0);
    } else if (repeat && !isDeleting) {
      // Completed typing, prepare to delete if repeat is enabled
      setIsComplete(true);
      onComplete();
      
      if (repeat) {
        timeoutRef.current = setTimeout(() => {
          setIsDeleting(true);
          setIsComplete(false);
        }, repeatDelay);
      }
    } else {
      // Completed typing without repeat
      setIsComplete(true);
      onComplete();
    }
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentIndex, isTyping, isDeleting, text, speed, repeat, repeatDelay, displayText, onComplete]);
  
  // Handle different animation types
  const renderText = () => {
    if (animation === 'typing') {
      return (
        <span className="animated-text-content">
          {displayText}
          {cursor && !isComplete && <span className="animated-text-cursor-symbol">|</span>}
        </span>
      );
    } else if (animation === 'word-by-word') {
      return text.split(' ').map((word, index) => (
        <span 
          key={index} 
          className={`animated-text-word ${index < displayText.split(' ').length ? 'animated-text-word-visible' : ''}`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          {word}&nbsp;
        </span>
      ));
    } else if (animation === 'letter-by-letter') {
      return text.split('').map((letter, index) => (
        <span 
          key={index} 
          className={`animated-text-letter ${index < displayText.length ? 'animated-text-letter-visible' : ''}`}
          style={{ animationDelay: `${index * 0.03}s` }}
        >
          {letter}
        </span>
      ));
    } else if (animation === 'fade-in') {
      return (
        <span className="animated-text-content">
          {text}
        </span>
      );
    } else {
      return text;
    }
  };
  
  return (
    <span className={textClasses} {...props}>
      {renderText()}
    </span>
  );
};

export default AnimatedText;
