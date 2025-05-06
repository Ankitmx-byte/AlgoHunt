import React, { useState, useEffect } from 'react';
import './JobBoard.css';
import JobCard from './JobCard';
import FilterBar from './FilterBar';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    role: '',
    experience: '',
    location: '',
    company: ''
  });
  
  useEffect(() => {
    // Fetch personalized job recommendations based on user's coding performance
    fetchPersonalizedJobs();
  }, [filters]);
  
  const fetchPersonalizedJobs = async () => {
    // In a real implementation, this would call your API with user performance data
    // and return AI-matched job opportunities
    const response = await fetch('/api/jobs/recommended');
    const data = await response.json();
    setJobs(data);
  };

  return (
    <div className="job-board-container">
      <div className="job-board-header">
        <h1>Get Your Dream Job</h1>
        <span className="subtitle">AI-matched opportunities based on your coding performance</span>
      </div>
      
      <div className="feature-banner">
        <p>Applying to jobs has never been easier ✨</p>
        <p>Our AI analyzes your coding battles and matches you with the perfect opportunities</p>
        <button className="see-how-button">See how it works</button>
      </div>
      
      <FilterBar filters={filters} setFilters={setFilters} />
      
      <div className="job-listings">
        {jobs.map(job => (
          <JobCard 
            key={job.id} 
            job={job}
            matchScore={job.matchScore} // AI-calculated match percentage
            skillGaps={job.skillGaps} // Areas where user could improve
          />
        ))}
      </div>
    </div>
  );
}

export default JobBoard;