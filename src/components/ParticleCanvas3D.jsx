import React, { useEffect, useRef } from 'react';
import './ParticleCanvas3D.css';

const ParticleCanvas3D = ({ 
  particleCount = 100, 
  particleColor = '#6366f1', 
  backgroundColor = 'transparent',
  depth = 300,
  particleSize = 2,
  speed = 0.5,
  interactive = true,
  connectParticles = true,
  maxConnections = 3,
  connectionDistance = 150
}) => {
  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0, isActive: false });
  const animationRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    
    // Set canvas dimensions
    const setDimensions = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    
    // Initialize particles
    const initParticles = () => {
      particlesRef.current = [];
      for (let i = 0; i < particleCount; i++) {
        particlesRef.current.push({
          x: Math.random() * width,
          y: Math.random() * height,
          z: Math.random() * depth,
          vx: (Math.random() - 0.5) * speed,
          vy: (Math.random() - 0.5) * speed,
          vz: (Math.random() - 0.5) * speed,
          connections: 0
        });
      }
    };
    
    // Calculate particle projection
    const project = (x, y, z) => {
      const perspective = depth / (depth + z);
      return {
        x: x * perspective + width / 2,
        y: y * perspective + height / 2,
        scale: perspective
      };
    };
    
    // Draw a single particle
    const drawParticle = (particle) => {
      const projection = project(
        particle.x - width / 2,
        particle.y - height / 2,
        particle.z
      );
      
      const size = particleSize * projection.scale;
      const opacity = projection.scale * 0.8;
      
      ctx.beginPath();
      ctx.arc(projection.x, projection.y, size, 0, Math.PI * 2);
      ctx.fillStyle = particleColor.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
      ctx.fill();
      
      return projection;
    };
    
    // Connect particles with lines
    const connectParticle = (particle, projection, index) => {
      if (!connectParticles || particle.connections >= maxConnections) return;
      
      for (let i = index + 1; i < particlesRef.current.length; i++) {
        const otherParticle = particlesRef.current[i];
        if (otherParticle.connections >= maxConnections) continue;
        
        const otherProjection = project(
          otherParticle.x - width / 2,
          otherParticle.y - height / 2,
          otherParticle.z
        );
        
        const dx = projection.x - otherProjection.x;
        const dy = projection.y - otherProjection.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance) {
          const opacity = (1 - distance / connectionDistance) * 0.5 * projection.scale * otherProjection.scale;
          
          ctx.beginPath();
          ctx.moveTo(projection.x, projection.y);
          ctx.lineTo(otherProjection.x, otherProjection.y);
          ctx.strokeStyle = particleColor.replace(')', `, ${opacity})`).replace('rgb', 'rgba');
          ctx.lineWidth = 1 * Math.min(projection.scale, otherProjection.scale);
          ctx.stroke();
          
          particle.connections++;
          otherParticle.connections++;
        }
      }
    };
    
    // Update particle positions
    const updateParticles = () => {
      particlesRef.current.forEach(particle => {
        particle.connections = 0;
        
        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.z += particle.vz;
        
        // Boundary checks with wrapping
        if (particle.x < 0) particle.x = width;
        else if (particle.x > width) particle.x = 0;
        
        if (particle.y < 0) particle.y = height;
        else if (particle.y > height) particle.y = 0;
        
        if (particle.z < 0) particle.z = depth;
        else if (particle.z > depth) particle.z = 0;
        
        // Mouse interaction
        if (interactive && mouseRef.current.isActive) {
          const dx = particle.x - mouseRef.current.x;
          const dy = particle.y - mouseRef.current.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < 150) {
            const force = 0.1 * (1 - distance / 150);
            particle.vx += (dx / distance) * force;
            particle.vy += (dy / distance) * force;
          }
        }
      });
    };
    
    // Main animation loop
    const animate = () => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);
      
      updateParticles();
      
      // Sort particles by z-depth for proper rendering
      const sortedParticles = [...particlesRef.current].sort((a, b) => b.z - a.z);
      
      // Draw particles and connections
      sortedParticles.forEach((particle, index) => {
        const projection = drawParticle(particle);
        connectParticle(particle, projection, index);
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    // Mouse event handlers
    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.isActive = true;
    };
    
    const handleMouseLeave = () => {
      mouseRef.current.isActive = false;
    };
    
    // Initialize
    setDimensions();
    initParticles();
    animate();
    
    // Event listeners
    window.addEventListener('resize', () => {
      setDimensions();
      initParticles();
    });
    
    if (interactive) {
      canvas.addEventListener('mousemove', handleMouseMove);
      canvas.addEventListener('mouseleave', handleMouseLeave);
    }
    
    // Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', setDimensions);
      
      if (interactive) {
        canvas.removeEventListener('mousemove', handleMouseMove);
        canvas.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [particleCount, particleColor, backgroundColor, depth, particleSize, speed, interactive, connectParticles, maxConnections, connectionDistance]);
  
  return (
    <canvas ref={canvasRef} className="particle-canvas-3d" />
  );
};

export default ParticleCanvas3D;
