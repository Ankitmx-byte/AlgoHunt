import React from 'react';
import { Link } from 'react-router-dom';

const Battles = () => {
  return (
    <div className="battles-page" style={{ padding: '2rem' }}>
      <h1>Coding Battles</h1>
      <p>This is a placeholder page for the Coding Battles feature.</p>
      
      <div style={{ marginTop: '2rem' }}>
        <h2>Battle Types</h2>
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
            <h3>1v1 AI-Matched Battles</h3>
            <p>Compete against opponents of similar skill level matched by our AI.</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Find Match</button>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3>Practice Battles</h3>
            <p>Solve battle problems at your own pace without time pressure.</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Start Practice</button>
          </div>
          
          <div style={{ 
            padding: '1.5rem', 
            backgroundColor: 'white', 
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
          }}>
            <h3>Friend Battles</h3>
            <p>Challenge your friends to coding battles and track your scores.</p>
            <button className="btn btn-primary" style={{ marginTop: '1rem' }}>Challenge Friend</button>
          </div>
        </div>
      </div>
      
      <div style={{ marginTop: '2rem' }}>
        <Link to="/dashboard" className="btn btn-secondary">Back to Dashboard</Link>
      </div>
    </div>
  );
};

export default Battles;
