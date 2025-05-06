import React from 'react';
import './JobCard.css';

function JobCard({ job, matchScore, skillGaps }) {
  return (
    <div className="job-card">
      <div className="company-logo">
        <img src={job.companyLogo} alt={`${job.company} logo`} />
      </div>
      
      <h3 className="job-title">{job.title}</h3>
      <p className="company-name">{job.company}</p>
      
      <div className="job-tags">
        {job.skills.map(skill => (
          <span key={skill} className="skill-tag">{skill}</span>
        ))}
      </div>
      
      <div className="job-location">{job.location}</div>
      
      {/* AI-driven match score */}
      <div className="match-score">
        <div className="score-circle" style={{background: `conic-gradient(#4CAF50 ${matchScore}%, #f3f3f3 0)`}}>
          <span>{matchScore}%</span>
        </div>
        <span>Match</span>
      </div>
      
      {/* Personalized improvement suggestions */}
      {skillGaps.length > 0 && (
        <div className="skill-gaps">
          <h4>Boost your chances:</h4>
          <ul>
            {skillGaps.map(gap => (
              <li key={gap.skill}>
                {gap.skill} <a href={`/challenges/${gap.recommendedChallenge}`}>Practice now</a>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <button className="apply-button">Apply Now</button>
    </div>
  );
}

export default JobCard;