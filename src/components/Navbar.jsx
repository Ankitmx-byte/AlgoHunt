import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isAuthButtonsVisible, setIsAuthButtonsVisible] = useState(false);
  const location = useLocation();

  // Check if user is logged in from localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Check login status on component mount and when localStorage changes
    const checkLoginStatus = () => {
      const loginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(loginStatus);
      setUserName(localStorage.getItem('userName') || 'User');
    };

    checkLoginStatus();

    // Listen for storage events (in case another tab changes login state)
    window.addEventListener('storage', checkLoginStatus);

    return () => {
      window.removeEventListener('storage', checkLoginStatus);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isLoggedIn) {
      setIsUserMenuOpen(false);
    } else {
      setIsAuthButtonsVisible(!isAuthButtonsVisible);
    }
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
    setIsLoggedIn(false);
    setIsUserMenuOpen(false);
    window.location.reload(); // Force reload to update state
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <span className="logo-text">AlgoHunt</span>
        </Link>

        <div className="menu-icon" onClick={toggleMenu}>
          <i className={isMenuOpen ? 'fas fa-times' : 'fas fa-bars'} />
        </div>

        <ul className={isMenuOpen ? 'nav-menu active' : 'nav-menu'}>
          <li className="nav-item">
            <Link
              to="/"
              className={location.pathname === '/' ? 'nav-links active' : 'nav-links'}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/battles"
              className={location.pathname.includes('/battle') ? 'nav-links active' : 'nav-links'}
              onClick={() => setIsMenuOpen(false)}
            >
              Coding Battles
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/learning"
              className={location.pathname.includes('/learning') ? 'nav-links active' : 'nav-links'}
              onClick={() => setIsMenuOpen(false)}
            >
              Learning Paths
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/achievements"
              className={location.pathname === '/achievements' ? 'nav-links active' : 'nav-links'}
              onClick={() => setIsMenuOpen(false)}
            >
              Achievements
            </Link>
          </li>
          <li className="nav-item">
            <Link
              to="/jobs"
              className={location.pathname === '/jobs' ? 'nav-links active' : 'nav-links'}
              onClick={() => setIsMenuOpen(false)}
            >
              Job Board
            </Link>
          </li>
        </ul>

        <div className={isAuthButtonsVisible ? 'auth-buttons active' : 'auth-buttons'}>
          {isLoggedIn ? (
            <div className="user-profile">
              <div className="profile-icon" onClick={toggleUserMenu}>
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Profile"
                  className="profile-image"
                />
                <span className="user-name">{userName}</span>
              </div>
              {isUserMenuOpen && (
                <div className="user-dropdown">
                  <Link to="/profile" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                    My Profile
                  </Link>
                  <Link to="/resume-builder" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                    Resume Builder
                  </Link>
                  <Link to="/interview-prep" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                    Interview Prep
                  </Link>
                  <Link to="/settings" className="dropdown-item" onClick={() => setIsUserMenuOpen(false)}>
                    Settings
                  </Link>
                  <div className="dropdown-divider"></div>
                  <button className="dropdown-item logout" onClick={handleLogout}>
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="login-button" onClick={() => setIsMenuOpen(false)}>
                Log In
              </Link>
              <Link to="/register" className="signup-button" onClick={() => setIsMenuOpen(false)}>
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;






