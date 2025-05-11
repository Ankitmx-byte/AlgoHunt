import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div className="dashboard-page" style={{ padding: '2rem' }}>
      <h1>Dashboard</h1>
      <p>Welcome to your AlgoHunt dashboard. This is a placeholder page.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Quick Links</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', 
          gap: '1rem',
          marginTop: '1rem'
        }}>
          <Link to="/battles" className="btn btn-primary">Coding Battles</Link>
          <Link to="/tournaments" className="btn btn-primary">Tournaments</Link>
          <Link to="/learning" className="btn btn-primary">Learning Paths</Link>
          <Link to="/achievements" className="btn btn-primary">Achievements</Link>
          <Link to="/profile" className="btn btn-primary">Profile</Link>
          <Link to="/" className="btn btn-secondary">Home</Link>
        </div>
      </div>
      
      <div style={{ marginTop: '3rem' }}>
        <p>This is a placeholder dashboard. In a real implementation, this would show:</p>
        <ul style={{ marginLeft: '2rem', marginTop: '1rem' }}>
          <li>Your recent activity</li>
          <li>Upcoming tournaments</li>
          <li>Learning progress</li>
          <li>Coding battle statistics</li>
          <li>Recommended challenges</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
