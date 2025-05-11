import React, { useState } from 'react';
import './ModuleContent.css';

function ModuleContent({ module, onComplete, onBack }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [codeInput, setCodeInput] = useState(module?.exercises?.[0]?.starterCode || '');

  // If no module is provided, show a placeholder
  if (!module || !module.content) {
    return (
      <div className="module-content-container">
        <div className="module-placeholder">
          <p>No content available for this module yet.</p>
          <button className="back-button" onClick={onBack}>
            Back to Module Overview
          </button>
        </div>
      </div>
    );
  }

  const content = module.content;
  const currentContent = content[currentStep];

  const handleNextStep = () => {
    if (currentStep < content.length - 1) {
      setCurrentStep(currentStep + 1);

      // If the next step is an exercise, initialize the code input
      if (content[currentStep + 1].type === 'exercise' && content[currentStep + 1].starterCode) {
        setCodeInput(content[currentStep + 1].starterCode);
      }
    } else {
      // Last step completed
      setShowResults(true);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleQuizAnswer = (questionId, answerId) => {
    setQuizAnswers({
      ...quizAnswers,
      [questionId]: answerId
    });
  };

  const handleCodeChange = (e) => {
    setCodeInput(e.target.value);
  };

  const handleRunCode = () => {
    // In a real implementation, this would send the code to a backend for execution
    console.log("Running code:", codeInput);
    alert("Code execution is simulated in this demo. In a real application, your code would be executed and the results would be displayed here.");
  };

  const handleSubmitQuiz = () => {
    // Check if all questions are answered
    const allQuestionsAnswered = currentContent.questions.every(
      question => quizAnswers[question.id] !== undefined
    );

    if (!allQuestionsAnswered) {
      alert("Please answer all questions before submitting.");
      return;
    }

    // In a real implementation, this would validate the answers
    // For now, we'll just proceed to the next step
    handleNextStep();
  };

  const handleCompleteModule = () => {
    // In a real implementation, this would update the user's progress
    if (onComplete) {
      onComplete(module.id);
    }
  };

  const renderContent = () => {
    switch (currentContent.type) {
      case 'text':
        return (
          <div className="text-content">
            <h3>{currentContent.title}</h3>
            <div className="content-body" dangerouslySetInnerHTML={{ __html: currentContent.body }} />
          </div>
        );

      case 'video':
        return (
          <div className="video-content">
            <h3>{currentContent.title}</h3>
            <div className="video-container">
              {currentContent.url ? (
                <iframe
                  src={currentContent.url}
                  title={currentContent.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ) : (
                <div className="video-placeholder">
                  <p>Video: {currentContent.title}</p>
                  <p className="video-description">{currentContent.description}</p>
                  <p className="video-source">Source: {currentContent.source}</p>
                </div>
              )}
            </div>
            <div className="video-info">
              <p className="video-description">{currentContent.description}</p>
              <p className="video-meta">
                <span className="video-source">Source: {currentContent.source}</span>
                {currentContent.duration && (
                  <span className="video-duration">Duration: {currentContent.duration}</span>
                )}
              </p>
            </div>
            {currentContent.notes && (
              <div className="video-notes">
                <h4>Notes</h4>
                <p>{currentContent.notes}</p>
              </div>
            )}
          </div>
        );

      case 'quiz':
        return (
          <div className="quiz-content">
            <h3>{currentContent.title}</h3>
            <p className="quiz-description">{currentContent.description}</p>

            <div className="quiz-questions">
              {currentContent.questions.map((question, index) => (
                <div key={question.id} className="quiz-question">
                  <h4>Question {index + 1}: {question.text}</h4>
                  <div className="quiz-options">
                    {question.options.map(option => (
                      <div key={option.id} className="quiz-option">
                        <input
                          type="radio"
                          id={`option-${question.id}-${option.id}`}
                          name={`question-${question.id}`}
                          checked={quizAnswers[question.id] === option.id}
                          onChange={() => handleQuizAnswer(question.id, option.id)}
                        />
                        <label htmlFor={`option-${question.id}-${option.id}`}>
                          {option.text}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="quiz-actions">
              <button className="submit-quiz-btn" onClick={handleSubmitQuiz}>
                Submit Answers
              </button>
            </div>
          </div>
        );

      case 'exercise':
        return (
          <div className="exercise-content">
            <h3>{currentContent.title}</h3>
            <div className="exercise-description">
              <p>{currentContent.description}</p>
            </div>

            {currentContent.instructions && (
              <div className="exercise-instructions">
                <h4>Instructions</h4>
                <ol>
                  {currentContent.instructions.map((instruction, index) => (
                    <li key={index}>{instruction}</li>
                  ))}
                </ol>
              </div>
            )}

            <div className="code-editor">
              <textarea
                value={codeInput}
                onChange={handleCodeChange}
                className="code-textarea"
                spellCheck="false"
              />
            </div>

            <div className="exercise-actions">
              <button className="run-code-btn" onClick={handleRunCode}>
                Run Code
              </button>
              <button className="next-btn" onClick={handleNextStep}>
                Submit Solution
              </button>
            </div>
          </div>
        );

      default:
        return <div>Unknown content type</div>;
    }
  };

  if (showResults) {
    return (
      <div className="module-content-container">
        <div className="module-results">
          <h2>Module Completed!</h2>
          <p>Congratulations on completing the {module.title} module.</p>

          <div className="results-summary">
            <div className="result-item">
              <span className="result-label">Module</span>
              <span className="result-value">{module.title}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Topics Covered</span>
              <span className="result-value">{module.topics.length}</span>
            </div>
            <div className="result-item">
              <span className="result-label">Time Spent</span>
              <span className="result-value">~{module.estimatedTime}</span>
            </div>
          </div>

          <div className="results-actions">
            <button className="complete-btn" onClick={handleCompleteModule}>
              Mark as Complete
            </button>
            <button className="back-button" onClick={onBack}>
              Back to Module Overview
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="module-content-container">
      <div className="module-progress">
        <div className="progress-indicator">
          <span>Step {currentStep + 1} of {content.length}</span>
          <div className="progress-bar">
            <div
              className="progress"
              style={{ width: `${((currentStep + 1) / content.length) * 100}%` }}
            ></div>
          </div>
        </div>
      </div>

      <div className="content-section">
        {renderContent()}
      </div>

      <div className="navigation-buttons">
        <button
          className="prev-btn"
          onClick={handlePrevStep}
          disabled={currentStep === 0}
        >
          Previous
        </button>

        {currentContent.type !== 'quiz' && (
          <button className="next-btn" onClick={handleNextStep}>
            {currentStep === content.length - 1 ? 'Finish' : 'Next'}
          </button>
        )}
      </div>
    </div>
  );
}

export default ModuleContent;
