import React, { useState, useEffect } from 'react';
import './LearningPaths.css';

function LearningPaths() {
  const [paths, setPaths] = useState([]);
  const [userProgress, setUserProgress] = useState({});

  useEffect(() => {
    // Fetch personalized learning paths
    fetchLearningPaths();
    fetchUserProgress();
  }, []);

  const fetchLearningPaths = async () => {
    // In a real implementation, this would call your API
    const response = await fetch('/api/learning/paths');
    const data = await response.json();
    setPaths(data);
  };

  const fetchUserProgress = async () => {
    // Fetch user's progress on various paths
    const response = await fetch('/api/user/progress');
    const data = await response.json();
    setUserProgress(data);
  };

  return (
    <div className="learning-container">
      <div className="learning-header">
        <h1>Personalized Learning Paths</h1>
        <p>AI-curated learning journeys based on your performance and goals</p>
      </div>

      <div className="recommended-path">
        <h2>Recommended For You</h2>
        <div className="path-card featured">
          <h3>Advanced Algorithms Mastery</h3>
          <div className="progress-bar">
            <div className="progress" style={{ width: '45%' }}></div>
            <span>45% Complete</span>
          </div>
          <p>Based on your recent battle performance, we recommend focusing on graph algorithms</p>
          <button className="continue-btn">Continue Learning</button>
        </div>
      </div>

      <div className="all-paths">
        <h2>All Learning Paths</h2>
        <div className="paths-grid">
          {paths.map(path => (
            <div key={path.id} className="path-card">
              <h3>{path.title}</h3>
              <div className="path-meta">
                <span className="difficulty">{path.difficulty}</span>
                <span className="modules">{path.moduleCount} Modules</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress" 
                  style={{ width: `${userProgress[path.id] || 0}%` }}
                ></div>
                <span>{userProgress[path.id] || 0}% Complete</span>
              </div>
              <p>{path.description}</p>
              <button className="start-btn">
                {userProgress[path.id] ? 'Continue' : 'Start Learning'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LearningPaths;