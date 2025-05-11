import React, { useState } from 'react';
import './PremiumCard.css';

const PremiumCard = ({
  children,
  variant = 'default',
  elevation = 'md',
  hoverEffect = true,
  glowEffect = false,
  glowColor = 'primary',
  borderEffect = false,
  glassmorphism = false,
  interactive = false,
  onClick,
  className = '',
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  
  // Determine card classes based on props
  const cardClasses = [
    'premium-card',
    `premium-card-${variant}`,
    `premium-card-elevation-${elevation}`,
    hoverEffect ? 'premium-card-hover' : '',
    glowEffect ? `premium-card-glow premium-card-glow-${glowColor}` : '',
    borderEffect ? 'premium-card-border' : '',
    glassmorphism ? 'premium-card-glass' : '',
    interactive ? 'premium-card-interactive' : '',
    isHovered ? 'premium-card-hovered' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Handle mouse events
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  
  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  
  const handleClick = (e) => {
    if (interactive && onClick) onClick(e);
  };
  
  return (
    <div
      className={cardClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      {...props}
    >
      {/* Card content */}
      <div className="premium-card-content">
        {children}
      </div>
      
      {/* Card effects */}
      {glowEffect && <div className="premium-card-glow-effect"></div>}
      {borderEffect && <div className="premium-card-border-effect"></div>}
      {hoverEffect && <div className="premium-card-hover-effect"></div>}
    </div>
  );
};

// Card subcomponents for structured content
PremiumCard.Header = ({ children, className = '', ...props }) => (
  <div className={`premium-card-header ${className}`} {...props}>
    {children}
  </div>
);

PremiumCard.Body = ({ children, className = '', ...props }) => (
  <div className={`premium-card-body ${className}`} {...props}>
    {children}
  </div>
);

PremiumCard.Footer = ({ children, className = '', ...props }) => (
  <div className={`premium-card-footer ${className}`} {...props}>
    {children}
  </div>
);

PremiumCard.Title = ({ children, className = '', ...props }) => (
  <h3 className={`premium-card-title ${className}`} {...props}>
    {children}
  </h3>
);

PremiumCard.Subtitle = ({ children, className = '', ...props }) => (
  <h4 className={`premium-card-subtitle ${className}`} {...props}>
    {children}
  </h4>
);

PremiumCard.Text = ({ children, className = '', ...props }) => (
  <p className={`premium-card-text ${className}`} {...props}>
    {children}
  </p>
);

PremiumCard.Image = ({ src, alt = '', className = '', ...props }) => (
  <div className={`premium-card-image-container ${className}`}>
    <img src={src} alt={alt} className="premium-card-image" {...props} />
  </div>
);

PremiumCard.Badge = ({ children, variant = 'primary', className = '', ...props }) => (
  <span className={`premium-card-badge premium-card-badge-${variant} ${className}`} {...props}>
    {children}
  </span>
);

export default PremiumCard;
