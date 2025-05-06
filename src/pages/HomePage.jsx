import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

function HomePage() {
  return (
    <div className="home-container">
      <div className="hero-section">
        <div className="hero-content">
          <h1>
            Master<br />
            Coding.<br />
            Get<br />
            Hired.
          </h1>
          <p>
            AI-driven<br />
            competitive coding<br />
            platform that<br />
            evaluates your skills<br />
            and connects you to<br />
            opportunities
          </p>
          <div className="hero-buttons">
            <button className="get-started-btn">Get Started</button>
            <button className="watch-demo-btn">Watch Demo</button>
          </div>
        </div>
        
        <div className="code-animation">
          <div className="code-challenge">
            <div className="challenge-text">challenge.js</div>
            <pre>
              <code>
{`function findOptimalSolution(array) {
  let result = [];
  let current = 0;
  for (let i = 0; i < array.length; i++) {
    // Implement your solution here
    current += array[i];
  }
}`}
              </code>
            </pre>
          </div>
        </div>
      </div>

      <section className="features-section">
        {/* Features content */}
      </section>
    </div>
  );
}

export default HomePage;





