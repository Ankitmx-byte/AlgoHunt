import React, { useState } from 'react';
import './CompilerOutput.css';

/**
 * CompilerOutput Component
 * 
 * This component displays the results of code compilation and execution.
 * It shows test case results, compilation errors, and execution outputs.
 */
const CompilerOutput = ({ results, isLoading, error }) => {
  const [activeTab, setActiveTab] = useState('results');
  const [expandedTestCase, setExpandedTestCase] = useState(null);

  // Toggle test case details
  const toggleTestCase = (id) => {
    if (expandedTestCase === id) {
      setExpandedTestCase(null);
    } else {
      setExpandedTestCase(id);
    }
  };

  // Calculate summary statistics
  const calculateSummary = () => {
    if (!results || !results.length) {
      return { total: 0, passed: 0, failed: 0, passRate: 0 };
    }

    const total = results.length;
    const passed = results.filter(r => r.passed).length;
    const failed = total - passed;
    const passRate = Math.round((passed / total) * 100);

    return { total, passed, failed, passRate };
  };

  const summary = calculateSummary();

  // Render loading state
  if (isLoading) {
    return (
      <div className="compiler-output">
        <div className="compiler-loading">
          <div className="loading-spinner"></div>
          <p>Running your code...</p>
        </div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="compiler-output">
        <div className="compiler-error">
          <h3>Error</h3>
          <div className="error-message">
            <pre>{error}</pre>
          </div>
        </div>
      </div>
    );
  }

  // Render empty state
  if (!results || !results.length) {
    return (
      <div className="compiler-output">
        <div className="compiler-empty">
          <p>Run your code to see results here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="compiler-output">
      <div className="compiler-tabs">
        <button
          className={`compiler-tab ${activeTab === 'results' ? 'active' : ''}`}
          onClick={() => setActiveTab('results')}
        >
          Test Results
        </button>
        <button
          className={`compiler-tab ${activeTab === 'console' ? 'active' : ''}`}
          onClick={() => setActiveTab('console')}
        >
          Console Output
        </button>
      </div>

      <div className="compiler-content">
        {activeTab === 'results' && (
          <div className="test-results-container">
            <div className="test-summary">
              <div className="summary-item">
                <span className="summary-label">Total Tests:</span>
                <span className="summary-value">{summary.total}</span>
              </div>
              <div className="summary-item passed">
                <span className="summary-label">Passed:</span>
                <span className="summary-value">{summary.passed}</span>
              </div>
              <div className="summary-item failed">
                <span className="summary-label">Failed:</span>
                <span className="summary-value">{summary.failed}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Pass Rate:</span>
                <span className="summary-value">{summary.passRate}%</span>
              </div>
            </div>

            <div className="test-cases">
              {results.map((result) => (
                <div
                  key={result.id}
                  className={`test-case ${result.passed ? 'passed' : 'failed'}`}
                >
                  <div className="test-case-header" onClick={() => toggleTestCase(result.id)}>
                    <div className="test-case-status">
                      <span className={`status-icon ${result.passed ? 'passed' : 'failed'}`}>
                        {result.passed ? '✓' : '✗'}
                      </span>
                      <span className="test-case-name">Test Case {result.id}</span>
                    </div>
                    <span className="test-case-toggle">
                      {expandedTestCase === result.id ? '▲' : '▼'}
                    </span>
                  </div>

                  {expandedTestCase === result.id && (
                    <div className="test-case-details">
                      <div className="test-detail">
                        <span className="detail-label">Input:</span>
                        <pre className="detail-value">{result.input}</pre>
                      </div>
                      <div className="test-detail">
                        <span className="detail-label">Expected Output:</span>
                        <pre className="detail-value">{result.expectedOutput}</pre>
                      </div>
                      <div className="test-detail">
                        <span className="detail-label">Actual Output:</span>
                        <pre className="detail-value">{result.actualOutput || 'No output'}</pre>
                      </div>
                      {result.error && (
                        <div className="test-detail error">
                          <span className="detail-label">Error:</span>
                          <pre className="detail-value error">{result.error}</pre>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'console' && (
          <div className="console-output">
            <pre className="console-content">
              {results.map((result, index) => (
                <div key={index} className="console-entry">
                  <div className="console-entry-header">
                    <span className="console-entry-label">Test Case {result.id}:</span>
                  </div>
                  <div className="console-entry-content">
                    <div className="console-line">
                      <span className="console-prompt">&gt;</span> Running with input: {result.input}
                    </div>
                    {result.error ? (
                      <div className="console-line error">
                        <span className="console-error">Error:</span> {result.error}
                      </div>
                    ) : (
                      <div className="console-line">
                        <span className="console-output-label">Output:</span> {result.actualOutput || 'No output'}
                      </div>
                    )}
                    <div className="console-line">
                      <span className={`console-result ${result.passed ? 'passed' : 'failed'}`}>
                        {result.passed ? 'PASSED' : 'FAILED'}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
};

export default CompilerOutput;
