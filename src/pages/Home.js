import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home-page">
      <header className="hero">
        <div className="container">
          <h1>Welcome to AlgoHunt</h1>
          <p className="hero-subtitle">Master coding challenges, compete in battles, and advance your programming skills</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">Get Started</Link>
            <Link to="/learning" className="btn btn-secondary">Explore Learning Paths</Link>
          </div>
        </div>
      </header>

      <section className="features">
        <div className="container">
          <h2 className="section-title">Platform Features</h2>
          <div className="feature-grid">
            <div className="feature-card">
              <div className="feature-icon">🏆</div>
              <h3>Coding Battles</h3>
              <p>Compete against other programmers or AI opponents in real-time coding challenges.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Learning Paths</h3>
              <p>Follow structured learning paths tailored to your skill level and goals.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🏅</div>
              <h3>Tournaments</h3>
              <p>Join competitive tournaments and climb the global leaderboards.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💼</div>
              <h3>Interview Prep</h3>
              <p>Practice technical interviews with AI feedback and improve your skills.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to level up your coding skills?</h2>
          <p>Join thousands of developers who are mastering algorithms and data structures with AlgoHunt.</p>
          <Link to="/register" className="btn btn-primary">Sign Up Now</Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
