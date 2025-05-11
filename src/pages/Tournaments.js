import React from 'react';
import { Link } from 'react-router-dom';

const Tournaments = () => {
  return (
    <div className="tournaments-page" style={{ padding: '2rem' }}>
      <h1>Tournaments</h1>
      <p>This is a placeholder page for the Tournaments feature.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Upcoming Tournaments</h2>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
          gap: '1.5rem',
          marginTop: '1.5rem'
        }}>
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3>Weekly Challenge</h3>
            <p>Starts in: 2 days, 4 hours</p>
            <p>Participants: 128</p>
            <p>Difficulty: Medium</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Register</button>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3>Algorithm Masters</h3>
            <p>Starts in: 5 days, 12 hours</p>
            <p>Participants: 256</p>
            <p>Difficulty: Hard</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Register</button>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3>Beginner's Cup</h3>
            <p>Starts in: 1 day, 8 hours</p>
            <p>Participants: 64</p>
            <p>Difficulty: Easy</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Register</button>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Past Tournaments</h2>
        <p>View results and replays from previous tournaments.</p>
        <button className="btn btn-secondary" style={{ marginTop: '1rem' }}>View Archive</button>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default Tournaments;
