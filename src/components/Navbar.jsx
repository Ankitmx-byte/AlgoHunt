import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation();
  
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            &lt; CODEBATTLEHQ /&gt;
          </Link>
        </div>
        
        <div className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
            <i className="fas fa-home"></i> Home
          </Link>
          <Link to="/battles" className={location.pathname === '/battles' ? 'active' : ''}>
            <i className="fas fa-code"></i> Coding Battles
          </Link>
          <Link to="/learning" className={location.pathname === '/learning' ? 'active' : ''}>
            <i className="fas fa-book"></i> Learning Paths
          </Link>
          <Link to="/achievements" className={location.pathname === '/achievements' ? 'active' : ''}>
            <i className="fas fa-trophy"></i> Achievements
          </Link>
          <Link to="/jobs" className={location.pathname === '/jobs' ? 'active' : ''}>
            <i className="fas fa-briefcase"></i> Job Board
          </Link>
        </div>
        
        <div className="navbar-auth">
          <button className="login-btn">Log In</button>
          <button className="signup-btn">Sign Up</button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

