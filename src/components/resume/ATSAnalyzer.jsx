import React from 'react';
import './ResumeComponents.css';

function ATSAnalyzer({ 
  jobDescription, 
  setJobDescription, 
  atsScore, 
  atsAnalysis, 
  onAnalyze, 
  loading 
}) {
  // Function to determine score color
  const getScoreColor = (score) => {
    if (score >= 80) return '#28a745'; // Green
    if (score >= 60) return '#ffc107'; // Yellow
    return '#dc3545'; // Red
  };

  return (
    <div className="ats-analyzer">
      <h2>ATS Resume Analysis</h2>
      <p className="form-description">
        Analyze your resume against a specific job description to see how well it matches the requirements.
        This will help you optimize your resume to pass Applicant Tracking Systems (ATS).
      </p>

      <div className="form-group">
        <label htmlFor="jobDescription">Job Description</label>
        <textarea
          id="jobDescription"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          rows={10}
        />
      </div>

      <div className="actions-row">
        <button 
          className="btn btn-primary"
          onClick={onAnalyze}
          disabled={loading || !jobDescription}
        >
          {loading ? 'Analyzing...' : 'Analyze Resume'}
        </button>
      </div>

      {atsScore > 0 && (
        <div className="ats-results">
          <div className="ats-score-container">
            <div 
              className="ats-score" 
              style={{ backgroundColor: getScoreColor(atsScore) }}
            >
              <div className="ats-score-value">{atsScore}</div>
              <div className="ats-score-label">ATS Score</div>
            </div>
            <p className="ats-score-description">
              {atsScore >= 80 
                ? 'Excellent! Your resume is well-optimized for this job.' 
                : atsScore >= 60 
                  ? 'Good match, but there\'s room for improvement.' 
                  : 'Your resume needs significant optimization for this job.'}
            </p>
          </div>

          {atsAnalysis && (
            <>
              <div className="ats-analysis-section">
                <h3>Keyword Analysis</h3>
                <div className="keyword-list">
                  {atsAnalysis.keywords.map((keyword, index) => (
                    <div 
                      key={index} 
                      className={`keyword ${keyword.found ? 'found' : 'missing'}`}
                    >
                      {keyword.keyword} {keyword.found ? '✓' : '✗'}
                    </div>
                  ))}
                </div>
              </div>

              <div className="ats-analysis-section">
                <h3>Missing Keywords</h3>
                {atsAnalysis.missingKeywords.length > 0 ? (
                  <div className="keyword-list">
                    {atsAnalysis.missingKeywords.map((keyword, index) => (
                      <div key={index} className="keyword missing">
                        {keyword}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p>Great job! You've included all important keywords.</p>
                )}
              </div>

              <div className="ats-analysis-section">
                <h3>Suggestions for Improvement</h3>
                <ul className="suggestion-list">
                  {atsAnalysis.suggestions.map((suggestion, index) => (
                    <li key={index}>{suggestion}</li>
                  ))}
                </ul>
              </div>

              <div className="ats-analysis-section">
                <h3>Format Issues</h3>
                <ul className="suggestion-list">
                  {atsAnalysis.formatIssues.map((issue, index) => (
                    <li key={index}>{issue}</li>
                  ))}
                </ul>
              </div>
            </>
          )}
        </div>
      )}

      <div className="form-tips">
        <h4>Tips for ATS Optimization:</h4>
        <ul>
          <li>Include keywords from the job description in your resume.</li>
          <li>Use standard section headings like "Experience," "Education," and "Skills."</li>
          <li>Avoid using tables, headers, footers, or complex formatting.</li>
          <li>Use a clean, simple layout with standard fonts.</li>
          <li>Save your resume as a .docx or .pdf file.</li>
          <li>Tailor your resume for each job application.</li>
        </ul>
      </div>
    </div>
  );
}

export default ATSAnalyzer;
