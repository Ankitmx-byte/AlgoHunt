import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './JobBoard.css';

function JobBoard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({
    location: '',
    role: '',
    experience: '',
    remote: false
  });
  const [loading, setLoading] = useState(true);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [applicationStep, setApplicationStep] = useState(1);
  const [resumeNeeded, setResumeNeeded] = useState(false);
  const [interviewPrepNeeded, setInterviewPrepNeeded] = useState(false);

  useEffect(() => {
    // Simulate fetching jobs from an API
    setTimeout(() => {
      const mockJobs = [
        {
          id: 1,
          title: 'Senior Frontend Developer',
          company: 'TechCorp',
          location: 'San Francisco, CA',
          salary: '$120,000 - $150,000',
          description: 'We are looking for an experienced Frontend Developer with React expertise.',
          requirements: ['5+ years of experience', 'React', 'TypeScript', 'CSS/SCSS'],
          remote: true,
          postedDate: '2023-05-15'
        },
        {
          id: 2,
          title: 'Backend Engineer',
          company: 'DataSystems',
          location: 'New York, NY',
          salary: '$130,000 - $160,000',
          description: 'Join our team to build scalable backend services.',
          requirements: ['3+ years of experience', 'Node.js', 'Python', 'AWS'],
          remote: false,
          postedDate: '2023-05-10'
        },
        {
          id: 3,
          title: 'Full Stack Developer',
          company: 'StartupX',
          location: 'Remote',
          salary: '$100,000 - $130,000',
          description: 'Help us build our product from the ground up.',
          requirements: ['2+ years of experience', 'React', 'Node.js', 'MongoDB'],
          remote: true,
          postedDate: '2023-05-18'
        },
        {
          id: 4,
          title: 'Machine Learning Engineer',
          company: 'AI Solutions',
          location: 'Seattle, WA',
          salary: '$140,000 - $180,000',
          description: 'Work on cutting-edge ML models for our products.',
          requirements: ['3+ years of experience', 'Python', 'TensorFlow/PyTorch', 'Computer Vision'],
          remote: false,
          postedDate: '2023-05-05'
        },
        {
          id: 5,
          title: 'DevOps Engineer',
          company: 'CloudTech',
          location: 'Austin, TX',
          salary: '$110,000 - $140,000',
          description: 'Manage our cloud infrastructure and CI/CD pipelines.',
          requirements: ['4+ years of experience', 'Kubernetes', 'Docker', 'AWS/GCP'],
          remote: true,
          postedDate: '2023-05-12'
        }
      ];

      setJobs(mockJobs);
      setLoading(false);
    }, 1000);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  // Handle job application
  const handleApply = (job) => {
    setSelectedJob(job);
    setShowApplicationModal(true);
    setApplicationStep(1);

    // Check if user has a resume
    const hasResume = localStorage.getItem('savedResume') !== null;
    setResumeNeeded(!hasResume);

    // Always suggest interview prep
    setInterviewPrepNeeded(true);
  };

  // Close application modal
  const closeModal = () => {
    setShowApplicationModal(false);
    setSelectedJob(null);
    setApplicationStep(1);
  };

  // Go to resume builder
  const goToResumeBuilder = () => {
    navigate('/resume-builder');
  };

  // Go to interview prep
  const goToInterviewPrep = () => {
    navigate('/interview-prep');
  };

  // Submit application
  const submitApplication = () => {
    // In a real app, this would submit the application to the backend
    alert(`Application submitted for ${selectedJob.title} at ${selectedJob.company}!`);
    closeModal();
  };

  // Move to next application step
  const nextStep = () => {
    setApplicationStep(applicationStep + 1);
  };

  const filteredJobs = jobs.filter(job => {
    return (
      (filters.location === '' || job.location.includes(filters.location)) &&
      (filters.role === '' || job.title.toLowerCase().includes(filters.role.toLowerCase())) &&
      (filters.experience === '' || job.requirements.some(req => req.includes(filters.experience))) &&
      (!filters.remote || job.remote)
    );
  });

  return (
    <div className="job-board-container">
      <h1>Job Board</h1>
      <p>Find your next opportunity in tech</p>

      <div className="filters-container">
        <div className="filter-group">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={filters.location}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <input
            type="text"
            name="role"
            placeholder="Role or title"
            value={filters.role}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-group">
          <select
            name="experience"
            value={filters.experience}
            onChange={handleFilterChange}
          >
            <option value="">Experience level</option>
            <option value="1+">1+ years</option>
            <option value="3+">3+ years</option>
            <option value="5+">5+ years</option>
          </select>
        </div>
        <div className="filter-group checkbox">
          <label>
            <input
              type="checkbox"
              name="remote"
              checked={filters.remote}
              onChange={handleFilterChange}
            />
            Remote only
          </label>
        </div>
      </div>

      {loading ? (
        <div className="loading">Loading jobs...</div>
      ) : (
        <div className="jobs-list">
          {filteredJobs.length === 0 ? (
            <div className="no-jobs">No jobs match your filters. Try adjusting your search criteria.</div>
          ) : (
            filteredJobs.map(job => (
              <div className="job-card" key={job.id}>
                <div className="job-header">
                  <h2>{job.title}</h2>
                  <span className={job.remote ? "remote-badge" : "hidden"}>Remote</span>
                </div>
                <h3>{job.company}</h3>
                <p className="job-location">{job.location}</p>
                <p className="job-salary">{job.salary}</p>
                <p className="job-description">{job.description}</p>
                <div className="job-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    {job.requirements.map((req, index) => (
                      <li key={index}>{req}</li>
                    ))}
                  </ul>
                </div>
                <div className="job-footer">
                  <span className="posted-date">Posted: {job.postedDate}</span>
                  <button
                    className="apply-button"
                    onClick={() => handleApply(job)}
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {/* Application Modal */}
      {showApplicationModal && selectedJob && (
        <div className="application-modal-overlay">
          <div className="application-modal">
            <div className="modal-header">
              <h2>Apply for {selectedJob.title}</h2>
              <button className="close-modal" onClick={closeModal}>×</button>
            </div>

            <div className="modal-content">
              {applicationStep === 1 && (
                <div className="application-step">
                  <h3>Step 1: Prepare Your Application</h3>

                  <div className="application-checklist">
                    <div className={`checklist-item ${resumeNeeded ? 'needed' : 'ready'}`}>
                      <div className="checklist-icon">
                        {resumeNeeded ? '⚠️' : '✅'}
                      </div>
                      <div className="checklist-content">
                        <h4>Resume</h4>
                        <p>
                          {resumeNeeded
                            ? 'You need to create an ATS-optimized resume for this application.'
                            : 'You have a resume ready for submission.'}
                        </p>
                        {resumeNeeded && (
                          <button
                            className="checklist-action-btn"
                            onClick={goToResumeBuilder}
                          >
                            Create Resume
                          </button>
                        )}
                      </div>
                    </div>

                    <div className={`checklist-item ${interviewPrepNeeded ? 'recommended' : 'ready'}`}>
                      <div className="checklist-icon">
                        {interviewPrepNeeded ? '💡' : '✅'}
                      </div>
                      <div className="checklist-content">
                        <h4>Interview Preparation</h4>
                        <p>
                          {interviewPrepNeeded
                            ? 'We recommend preparing for interviews for this position.'
                            : 'You\'ve completed interview preparation.'}
                        </p>
                        {interviewPrepNeeded && (
                          <button
                            className="checklist-action-btn"
                            onClick={goToInterviewPrep}
                          >
                            Practice Interviews
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button
                      className="btn-primary"
                      onClick={nextStep}
                      disabled={resumeNeeded}
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {applicationStep === 2 && (
                <div className="application-step">
                  <h3>Step 2: Submit Application</h3>

                  <div className="application-summary">
                    <div className="summary-item">
                      <h4>Position</h4>
                      <p>{selectedJob.title}</p>
                    </div>
                    <div className="summary-item">
                      <h4>Company</h4>
                      <p>{selectedJob.company}</p>
                    </div>
                    <div className="summary-item">
                      <h4>Location</h4>
                      <p>{selectedJob.location}</p>
                    </div>
                    <div className="summary-item">
                      <h4>Resume</h4>
                      <p>Your ATS-optimized resume will be submitted</p>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button
                      className="btn-secondary"
                      onClick={() => setApplicationStep(1)}
                    >
                      Back
                    </button>
                    <button
                      className="btn-primary"
                      onClick={submitApplication}
                    >
                      Submit Application
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default JobBoard;
