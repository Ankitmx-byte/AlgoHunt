import React, { useState, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import './JobBoard.css';
import '../styles/animations.css';

function JobBoard() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    experience: '',
    remote: false
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [savedJobs, setSavedJobs] = useState([]);

  useEffect(() => {
    // Fetch jobs
    fetchJobs();
    
    // Load saved jobs from localStorage
    const savedJobsFromStorage = localStorage.getItem('savedJobs');
    if (savedJobsFromStorage) {
      setSavedJobs(JSON.parse(savedJobsFromStorage));
    }
  }, []);

  const fetchJobs = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would call your API
      // For now, we'll use mock data
      setTimeout(() => {
        const mockJobs = [
          {
            id: 1,
            title: "Senior Frontend Developer",
            company: "TechCorp",
            location: "San Francisco, CA",
            salary: "$120,000 - $150,000",
            description: "We're looking for a Senior Frontend Developer with expertise in React, Redux, and modern JavaScript to join our growing team.",
            requirements: [
              "5+ years of experience with React",
              "Strong understanding of state management",
              "Experience with TypeScript",
              "Knowledge of responsive design and CSS preprocessors"
            ],
            jobType: "Full-time",
            remote: true,
            postedDate: "2023-06-01",
            skillMatch: 92,
            logo: "https://randomuser.me/api/portraits/men/1.jpg"
          },
          {
            id: 2,
            title: "Backend Engineer",
            company: "DataSystems",
            location: "New York, NY",
            salary: "$110,000 - $140,000",
            description: "Join our backend team to build scalable APIs and microservices for our data processing platform.",
            requirements: [
              "3+ years of experience with Node.js or Python",
              "Experience with SQL and NoSQL databases",
              "Understanding of RESTful API design",
              "Knowledge of cloud services (AWS, GCP, or Azure)"
            ],
            jobType: "Full-time",
            remote: false,
            postedDate: "2023-06-05",
            skillMatch: 85,
            logo: "https://randomuser.me/api/portraits/women/2.jpg"
          },
          {
            id: 3,
            title: "Full Stack Developer",
            company: "WebSolutions",
            location: "Remote",
            salary: "$100,000 - $130,000",
            description: "Looking for a versatile developer who can work on both frontend and backend technologies for our SaaS platform.",
            requirements: [
              "3+ years of full stack development experience",
              "Proficiency in React and Node.js",
              "Experience with database design and ORM tools",
              "Understanding of CI/CD pipelines"
            ],
            jobType: "Contract",
            remote: true,
            postedDate: "2023-06-10",
            skillMatch: 78,
            logo: "https://randomuser.me/api/portraits/men/3.jpg"
          },
          {
            id: 4,
            title: "Machine Learning Engineer",
            company: "AI Innovations",
            location: "Seattle, WA",
            salary: "$130,000 - $160,000",
            description: "Join our AI team to develop and deploy machine learning models for real-world applications.",
            requirements: [
              "MS or PhD in Computer Science or related field",
              "Experience with TensorFlow or PyTorch",
              "Strong understanding of ML algorithms",
              "Experience with data preprocessing and feature engineering"
            ],
            jobType: "Full-time",
            remote: false,
            postedDate: "2023-06-08",
            skillMatch: 65,
            logo: "https://randomuser.me/api/portraits/women/4.jpg"
          },
          {
            id: 5,
            title: "DevOps Engineer",
            company: "CloudTech",
            location: "Austin, TX",
            salary: "$115,000 - $145,000",
            description: "Help us build and maintain our cloud infrastructure and deployment pipelines.",
            requirements: [
              "3+ years of experience with AWS or GCP",
              "Experience with Docker and Kubernetes",
              "Knowledge of Infrastructure as Code (Terraform, CloudFormation)",
              "Experience with CI/CD tools (Jenkins, GitHub Actions)"
            ],
            jobType: "Full-time",
            remote: true,
            postedDate: "2023-06-12",
            skillMatch: 80,
            logo: "https://randomuser.me/api/portraits/men/5.jpg"
          }
        ];
        setJobs(mockJobs);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFilters({
      ...filters,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const toggleSaveJob = (jobId) => {
    let updatedSavedJobs;
    if (savedJobs.includes(jobId)) {
      updatedSavedJobs = savedJobs.filter(id => id !== jobId);
    } else {
      updatedSavedJobs = [...savedJobs, jobId];
    }
    setSavedJobs(updatedSavedJobs);
    localStorage.setItem('savedJobs', JSON.stringify(updatedSavedJobs));
  };

  const filteredJobs = jobs.filter(job => {
    // Apply search term filter
    if (searchTerm && !job.title.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !job.company.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    // Apply location filter
    if (filters.location && job.location !== filters.location) {
      return false;
    }
    
    // Apply job type filter
    if (filters.jobType && job.jobType !== filters.jobType) {
      return false;
    }
    
    // Apply remote filter
    if (filters.remote && !job.remote) {
      return false;
    }
    
    return true;
  });

  if (loading) {
    return (
      <div className="job-board-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading job listings...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="job-board-container">
      <ScrollReveal animation="fade-in-down">
        <div className="job-board-header">
          <h1 className="animated-gradient">Tech Job Board</h1>
          <p>Find your next opportunity in the tech industry</p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0.2}>
        <div className="job-search-container">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for jobs, companies, or keywords"
              value={searchTerm}
              onChange={handleSearch}
              className="search-input"
            />
            <button className="search-button">
              <i className="fas fa-search"></i>
            </button>
          </div>

          <div className="filters-container">
            <select
              name="location"
              value={filters.location}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Locations</option>
              <option value="San Francisco, CA">San Francisco, CA</option>
              <option value="New York, NY">New York, NY</option>
              <option value="Remote">Remote</option>
              <option value="Seattle, WA">Seattle, WA</option>
              <option value="Austin, TX">Austin, TX</option>
            </select>

            <select
              name="jobType"
              value={filters.jobType}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Internship">Internship</option>
            </select>

            <div className="filter-checkbox">
              <input
                type="checkbox"
                id="remote"
                name="remote"
                checked={filters.remote}
                onChange={handleFilterChange}
              />
              <label htmlFor="remote">Remote Only</label>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0.4}>
        <div className="jobs-list stagger-fade-up">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job, index) => (
              <div
                key={job.id}
                className="job-card hover-lift card-shine"
                data-index={index}
                style={{"--stagger-delay": "0.1s"}}
              >
                <div className="job-card-header">
                  <div className="company-logo">
                    <img src={job.logo} alt={job.company} />
                  </div>
                  <div className="job-info">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="company-name">{job.company}</div>
                    <div className="job-meta">
                      <span className="job-location">{job.location}</span>
                      <span className="job-type">{job.jobType}</span>
                      {job.remote && <span className="remote-badge">Remote</span>}
                    </div>
                  </div>
                  <button
                    className={`save-job-btn ${savedJobs.includes(job.id) ? 'saved' : ''}`}
                    onClick={() => toggleSaveJob(job.id)}
                  >
                    <i className={`${savedJobs.includes(job.id) ? 'fas' : 'far'} fa-heart`}></i>
                  </button>
                </div>

                <div className="job-description">
                  <p>{job.description}</p>
                </div>

                <div className="job-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    {job.requirements.map((req, i) => (
                      <li key={i}>{req}</li>
                    ))}
                  </ul>
                </div>

                <div className="job-card-footer">
                  <div className="job-salary">{job.salary}</div>
                  <div className="job-posted">Posted: {job.postedDate}</div>
                  <div className="skill-match">
                    <div className="match-label">Skill Match:</div>
                    <div className="match-percentage">{job.skillMatch}%</div>
                    <div className="match-bar">
                      <div
                        className="match-fill"
                        style={{ width: `${job.skillMatch}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className="apply-btn btn-primary">
                    Apply Now
                    <span className="btn-glow"></span>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="no-jobs-found">
              <div className="no-jobs-icon">🔍</div>
              <h3>No jobs found</h3>
              <p>Try adjusting your search filters or search term</p>
            </div>
          )}
        </div>
      </ScrollReveal>
    </div>
  );
}

export default JobBoard;
