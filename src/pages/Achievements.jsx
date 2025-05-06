import React, { useState, useEffect } from 'react';
import './Achievements.css';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Fetch user achievements and stats
    fetchAchievements();
    fetchUserStats();
  }, []);

  const fetchAchievements = async () => {
    // In a real implementation, this would call your API
    const response = await fetch('/api/user/achievements');
    const data = await response.json();
    setAchievements(data);
  };

  const fetchUserStats = async () => {
    // Fetch user's overall stats
    const response = await fetch('/api/user/stats');
    const data = await response.json();
    setStats(data);
  };

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <h1>Your Achievements</h1>
        <p>Track your progress and showcase your coding prowess</p>
      </div>

      <div className="user-stats">
        <div className="stat-card">
          <h3>Battles Won</h3>
          <div className="stat-value">{stats.battlesWon || 0}</div>
        </div>
        <div className="stat-card">
          <h3>Problems Solved</h3>
          <div className="stat-value">{stats.problemsSolved || 0}</div>
        </div>
        <div className="stat-card">
          <h3>Global Rank</h3>
          <div className="stat-value">{stats.globalRank || 'N/A'}</div>
        </div>
        <div className="stat-card">
          <h3>Skill Rating</h3>
          <div className="stat-value">{stats.skillRating || 0}</div>
        </div>
      </div>

      <div className="badges-section">
        <h2>Your Badges</h2>
        <div className="badges-grid">
          {achievements.map(achievement => (
            <div 
              key={achievement.id} 
              className={`badge-card ${achievement.unlocked ? 'unlocked' : 'locked'}`}
            >
              <div className="badge-icon">
                {achievement.unlocked ? achievement.icon : '🔒'}
              </div>
              <h3>{achievement.title}</h3>
              <p>{achievement.description}</p>
              {achievement.unlocked && 
                <div className="unlock-date">Unlocked: {achievement.unlockedDate}</div>
              }
              {!achievement.unlocked && 
                <div className="progress-info">
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ width: `${achievement.progress}%` }}
                    ></div>
                  </div>
                  <span>{achievement.progress}% Complete</span>
                </div>
              }
            </div>
          ))}
        </div>
      </div>

      <div className="certificates-section">
        <h2>Your Certificates</h2>
        <div className="certificates-grid">
          {stats.certificates && stats.certificates.map(cert => (
            <div key={cert.id} className="certificate-card">
              <h3>{cert.title}</h3>
              <p>Issued: {cert.issueDate}</p>
              <button className="view-cert-btn">View Certificate</button>
              <button className="share-cert-btn">Share</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Achievements;