import React, { useState } from 'react';
import './InterviewAnalysisReport.css';

const InterviewAnalysisReport = ({ feedback, interviewData, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({
    technicalAccuracy: true,
    communicationSkills: true,
    bodyLanguage: true,
    confidenceLevel: true,
    answerStructure: true,
    improvementAreas: true
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section]
    });
  };

  const downloadReport = () => {
    // In a real implementation, this would generate a PDF report
    alert('Report download functionality would be implemented here');
  };

  const shareReport = () => {
    // In a real implementation, this would share the report
    alert('Report sharing functionality would be implemented here');
  };

  // Calculate overall score
  const overallScore = Math.round(
    (feedback.technicalAccuracy +
     feedback.communicationScore +
     feedback.confidenceScore +
     feedback.structureScore +
     feedback.relevanceScore) / 5
  );

  // Determine performance level
  const getPerformanceLevel = (score) => {
    if (score >= 90) return { level: 'Excellent', color: '#28a745' };
    if (score >= 80) return { level: 'Very Good', color: '#5cb85c' };
    if (score >= 70) return { level: 'Good', color: '#4a4de7' };
    if (score >= 60) return { level: 'Satisfactory', color: '#ffc107' };
    if (score >= 50) return { level: 'Needs Improvement', color: '#fd7e14' };
    return { level: 'Poor', color: '#dc3545' };
  };

  const performanceLevel = getPerformanceLevel(overallScore);

  // Generate comparison with industry average (mock data)
  const industryAverage = {
    technicalAccuracy: 72,
    communicationScore: 68,
    confidenceScore: 65,
    structureScore: 70,
    relevanceScore: 75
  };

  return (
    <div className="interview-analysis-report">
      <div className="report-header">
        <h2>Interview Analysis Report</h2>
        <div className="report-actions">
          <button className="report-action-btn" onClick={downloadReport}>
            ⬇️ Download
          </button>
          <button className="report-action-btn" onClick={shareReport}>
            📤 Share
          </button>
          <button className="report-close-btn" onClick={onClose}>×</button>
        </div>
      </div>

      <div className="report-tabs">
        <button
          className={`report-tab ${activeTab === 'overview' ? 'active' : ''}`}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button
          className={`report-tab ${activeTab === 'technical' ? 'active' : ''}`}
          onClick={() => setActiveTab('technical')}
        >
          Technical Analysis
        </button>
        <button
          className={`report-tab ${activeTab === 'communication' ? 'active' : ''}`}
          onClick={() => setActiveTab('communication')}
        >
          Communication
        </button>
        <button
          className={`report-tab ${activeTab === 'improvement' ? 'active' : ''}`}
          onClick={() => setActiveTab('improvement')}
        >
          Improvement Plan
        </button>
      </div>

      <div className="report-content">
        {activeTab === 'overview' && (
          <div className="report-overview">
            <div className="overview-header">
              <div className="interview-info">
                <h3>{interviewData.title}</h3>
                <p className="interview-meta">
                  <span>{interviewData.jobTitle}</span> •
                  <span>{interviewData.company}</span> •
                  <span>{interviewData.difficulty} Level</span>
                </p>
              </div>
              <div className="overall-score">
                <div className="score-circle" style={{ borderColor: performanceLevel.color }}>
                  <span className="score-value">{overallScore}</span>
                  <span className="score-max">/100</span>
                </div>
                <div className="performance-level" style={{ color: performanceLevel.color }}>
                  {performanceLevel.level}
                </div>
              </div>
            </div>

            <div className="score-breakdown">
              <h3>Score Breakdown</h3>
              <div className="score-categories">
                <div className="score-category">
                  <div className="category-label">Technical Accuracy</div>
                  <div className="score-bar-container">
                    <div className="score-bar" style={{ width: `${feedback.technicalAccuracy}%`, backgroundColor: getPerformanceLevel(feedback.technicalAccuracy).color }}></div>
                  </div>
                  <div className="category-score">{feedback.technicalAccuracy}</div>
                </div>
                <div className="score-category">
                  <div className="category-label">Communication</div>
                  <div className="score-bar-container">
                    <div className="score-bar" style={{ width: `${feedback.communicationScore}%`, backgroundColor: getPerformanceLevel(feedback.communicationScore).color }}></div>
                  </div>
                  <div className="category-score">{feedback.communicationScore}</div>
                </div>
                <div className="score-category">
                  <div className="category-label">Confidence</div>
                  <div className="score-bar-container">
                    <div className="score-bar" style={{ width: `${feedback.confidenceScore}%`, backgroundColor: getPerformanceLevel(feedback.confidenceScore).color }}></div>
                  </div>
                  <div className="category-score">{feedback.confidenceScore}</div>
                </div>
                <div className="score-category">
                  <div className="category-label">Answer Structure</div>
                  <div className="score-bar-container">
                    <div className="score-bar" style={{ width: `${feedback.structureScore}%`, backgroundColor: getPerformanceLevel(feedback.structureScore).color }}></div>
                  </div>
                  <div className="category-score">{feedback.structureScore}</div>
                </div>
                <div className="score-category">
                  <div className="category-label">Relevance</div>
                  <div className="score-bar-container">
                    <div className="score-bar" style={{ width: `${feedback.relevanceScore}%`, backgroundColor: getPerformanceLevel(feedback.relevanceScore).color }}></div>
                  </div>
                  <div className="category-score">{feedback.relevanceScore}</div>
                </div>
              </div>
            </div>

            <div className="comparison-chart">
              <h3>Comparison with Industry Average</h3>
              <div className="chart-container">
                {Object.keys(industryAverage).map(key => {
                  const userScore = feedback[key];
                  const avgScore = industryAverage[key];
                  const difference = userScore - avgScore;
                  const percentageDiff = Math.round((difference / avgScore) * 100);

                  return (
                    <div className="comparison-item" key={key}>
                      <div className="comparison-label">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </div>
                      <div className="comparison-bars">
                        <div className="comparison-bar-container">
                          <div className="comparison-bar your-score" style={{ width: `${userScore}%` }}></div>
                          <div className="comparison-bar avg-score" style={{ width: `${avgScore}%` }}></div>
                        </div>
                      </div>
                      <div className="comparison-values">
                        <span className="your-value">{userScore}</span>
                        <span className="avg-value">{avgScore}</span>
                      </div>
                      <div className={`comparison-diff ${difference >= 0 ? 'positive' : 'negative'}`}>
                        {difference >= 0 ? '+' : ''}{percentageDiff}%
                      </div>
                    </div>
                  );
                })}
                <div className="chart-legend">
                  <div className="legend-item">
                    <div className="legend-color your-score"></div>
                    <div className="legend-label">Your Score</div>
                  </div>
                  <div className="legend-item">
                    <div className="legend-color avg-score"></div>
                    <div className="legend-label">Industry Average</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="key-insights">
              <h3>Key Insights</h3>
              <ul className="insights-list">
                {feedback.keyInsights.map((insight, index) => (
                  <li key={index} className="insight-item">{insight}</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'technical' && (
          <div className="technical-analysis">
            <div className="analysis-section">
              <div
                className="section-header"
                onClick={() => toggleSection('technicalAccuracy')}
              >
                <h3>Technical Accuracy</h3>
                <button className="toggle-btn">
                  {expandedSections.technicalAccuracy ? '▲' : '▼'}
                </button>
              </div>
              {expandedSections.technicalAccuracy && (
                <div className="section-content">
                  <div className="accuracy-score">
                    <div className="score-label">Overall Technical Accuracy</div>
                    <div className="score-value" style={{ color: getPerformanceLevel(feedback.technicalAccuracy).color }}>
                      {feedback.technicalAccuracy}/100
                    </div>
                  </div>
                  <div className="technical-feedback">
                    <h4>Strengths</h4>
                    <ul>
                      {feedback.technicalStrengths.map((strength, index) => (
                        <li key={index}>{strength}</li>
                      ))}
                    </ul>
                    <h4>Areas for Improvement</h4>
                    <ul>
                      {feedback.technicalWeaknesses.map((weakness, index) => (
                        <li key={index}>{weakness}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="code-quality">
                    <h4>Code Quality Assessment</h4>
                    <p>{feedback.codeQualityFeedback}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'communication' && (
          <div className="communication-analysis">
            {/* Communication analysis content */}
            <div className="analysis-section">
              <div
                className="section-header"
                onClick={() => toggleSection('communicationSkills')}
              >
                <h3>Communication Skills</h3>
                <button className="toggle-btn">
                  {expandedSections.communicationSkills ? '▲' : '▼'}
                </button>
              </div>
              {expandedSections.communicationSkills && (
                <div className="section-content">
                  <div className="communication-feedback">
                    <p>{feedback.communicationFeedback}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="analysis-section">
              <div
                className="section-header"
                onClick={() => toggleSection('bodyLanguage')}
              >
                <h3>Body Language & Non-verbal Communication</h3>
                <button className="toggle-btn">
                  {expandedSections.bodyLanguage ? '▲' : '▼'}
                </button>
              </div>
              {expandedSections.bodyLanguage && (
                <div className="section-content">
                  <div className="body-language-feedback">
                    <p>{feedback.bodyLanguageFeedback}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'improvement' && (
          <div className="improvement-plan">
            <h3>Personalized Improvement Plan</h3>
            <div className="improvement-areas">
              {feedback.improvementAreas.map((area, index) => (
                <div className="improvement-area" key={index}>
                  <h4>{area.title}</h4>
                  <p>{area.description}</p>
                  <div className="improvement-actions">
                    <h5>Recommended Actions:</h5>
                    <ul>
                      {area.actions.map((action, actionIndex) => (
                        <li key={actionIndex}>{action}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="improvement-resources">
                    <h5>Resources:</h5>
                    <ul>
                      {area.resources.map((resource, resourceIndex) => (
                        <li key={resourceIndex}>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            {resource.title}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterviewAnalysisReport;
