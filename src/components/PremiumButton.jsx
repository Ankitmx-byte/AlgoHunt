import React, { useState } from 'react';
import './PremiumButton.css';

const PremiumButton = ({
  children,
  onClick,
  variant = 'primary',
  size = 'md',
  icon = null,
  iconPosition = 'left',
  disabled = false,
  fullWidth = false,
  className = '',
  glowEffect = true,
  hoverScale = true,
  animateOnHover = true,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  // Determine button classes based on props
  const buttonClasses = [
    'premium-button',
    `premium-button-${variant}`,
    `premium-button-${size}`,
    fullWidth ? 'premium-button-full-width' : '',
    disabled ? 'premium-button-disabled' : '',
    glowEffect ? 'premium-button-glow' : '',
    hoverScale ? 'premium-button-scale' : '',
    isHovered ? 'premium-button-hovered' : '',
    isPressed ? 'premium-button-pressed' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Handle mouse events
  const handleMouseEnter = () => {
    if (!disabled) setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
    setIsPressed(false);
  };
  
  const handleMouseDown = () => {
    if (!disabled) setIsPressed(true);
  };
  
  const handleMouseUp = () => {
    setIsPressed(false);
  };
  
  const handleClick = (e) => {
    if (!disabled && onClick) onClick(e);
  };
  
  return (
    <button
      className={buttonClasses}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      disabled={disabled}
      {...props}
    >
      {/* Button content with icon positioning */}
      <div className="premium-button-content">
        {icon && iconPosition === 'left' && (
          <span className="premium-button-icon premium-button-icon-left">
            {icon}
          </span>
        )}
        
        <span className="premium-button-text">{children}</span>
        
        {icon && iconPosition === 'right' && (
          <span className="premium-button-icon premium-button-icon-right">
            {icon}
          </span>
        )}
      </div>
      
      {/* Animated elements */}
      {animateOnHover && !disabled && (
        <>
          <span className="premium-button-background"></span>
          <span className="premium-button-glow-effect"></span>
          <span className="premium-button-border"></span>
          {variant === 'gradient' && <span className="premium-button-gradient-shift"></span>}
        </>
      )}
    </button>
  );
};

export default PremiumButton;
