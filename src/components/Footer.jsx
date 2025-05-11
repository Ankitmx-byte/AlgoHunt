import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h3>AlgoHunt</h3>
          <p>Elevate your coding skills through competitive challenges, structured learning paths, and career opportunities.</p>
          <div className="social-icons">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-github"></i>
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin"></i>
            </a>
          </div>
        </div>
        
        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/battles">Coding Battles</Link></li>
            <li><Link to="/battle/practice">Practice Mode</Link></li>
            <li><Link to="/learning">Learning Paths</Link></li>
            <li><Link to="/achievements">Achievements</Link></li>
            <li><Link to="/jobs">Job Board</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Resources</h3>
          <ul className="footer-links">
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/tutorials">Tutorials</Link></li>
            <li><Link to="/documentation">Documentation</Link></li>
            <li><Link to="/faq">FAQ</Link></li>
            <li><Link to="/support">Support</Link></li>
          </ul>
        </div>
        
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Have questions or feedback? We'd love to hear from you!</p>
          <Link to="/contact" className="contact-button">Contact Us</Link>
          <p className="contact-email">support@AlgoHunt.com</p>
        </div>
      </div>
      
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()}  AlgoHunt. All rights reserved.</p>
        <div className="footer-bottom-links">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/cookies">Cookie Policy</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;