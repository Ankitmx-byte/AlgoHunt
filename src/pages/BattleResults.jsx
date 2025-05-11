import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import './BattleResults.css';
import '../styles/animations.css';

function BattleResults() {
  const { battleId } = useParams();
  const navigate = useNavigate();
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false);

  useEffect(() => {
    // Redirect back to battles page if accessed directly
    const directAccess = !localStorage.getItem('currentBattle');
    if (directAccess) {
      navigate('/battles');
      return;
    }

    // Load battle result from localStorage
    const resultData = localStorage.getItem(`battleResult_${battleId}`);
    const battleData = localStorage.getItem('currentBattle');

    // Check if the battle has actually been completed
    if (resultData) {
      const parsedResult = JSON.parse(resultData);

      // Check if the battle was actually played (minimum time spent)
      if (parsedResult.timeSpent < 10 && !parsedResult.forcedResult) {
        // Battle didn't last long enough, redirect back to battle
        localStorage.removeItem(`battleResult_${battleId}`);
        navigate(`/battle/${battleId}`);
        return;
      }

      setResult(parsedResult);
    } else if (battleData) {
      // If no result found but battle exists, redirect back to battle
      navigate(`/battle/${battleId}`);
      return;
    } else {
      // If no result and no battle found, create a mock result
      const mockResult = {
        battleId,
        battleTitle: "Coding Battle",
        userWon: Math.random() > 0.5, // Randomly determine win/loss for demo
        opponentName: "Hariom Sharma",
        problem: "Two Sum", // Ensure this is always defined
        userProgress: Math.floor(Math.random() * 100),
        opponentProgress: Math.floor(Math.random() * 100),
        timeSpent: Math.floor(Math.random() * 1800), // Random time up to 30 minutes
        forcedResult: true // Mark this as a forced result
      };

      // Ensure one progress is higher based on who won
      if (mockResult.userWon) {
        mockResult.userProgress = Math.max(mockResult.userProgress, mockResult.opponentProgress + 5);
      } else {
        mockResult.opponentProgress = Math.max(mockResult.opponentProgress, mockResult.userProgress + 5);
      }

      setResult(mockResult);
    }

    setLoading(false);
  }, [battleId, navigate]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const calculateXP = () => {
    if (!result) return 0;

    // Base XP
    let xp = 100;

    // Bonus for winning
    if (result.userWon) xp += 50;

    // Bonus based on progress
    xp += Math.floor(result.userProgress / 2);

    // Time efficiency bonus (if completed in less than 15 minutes)
    if (result.timeSpent < 900 && result.userProgress > 80) {
      xp += 30;
    }

    return xp;
  };

  const handleShare = () => {
    setShowShareModal(true);
  };

  const handleRematch = () => {
    navigate('/battles');
  };

  const handlePractice = () => {
    navigate('/battle/practice');
  };

  if (loading) {
    return (
      <div className="battle-results-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading battle results...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="battle-results-container">
      <ScrollReveal animation="fade-in-down">
        <div className="results-header">
          <h1 className="animated-gradient">Battle Results</h1>
          <p>See how you performed in your coding battle</p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0.2}>
        <div className="result-card hover-lift card-shine">
          <div className="result-banner" data-result={result.userWon ? 'win' : 'loss'}>
            <h2>{result.userWon ? 'Victory!' : 'Defeat'}</h2>
          </div>

          <div className="battle-details">
            <div className="detail-item">
              <span className="detail-label">Battle:</span>
              <span className="detail-value">{result.battleTitle || "Coding Battle"}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Problem:</span>
              <span className="detail-value">{result.problem}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Opponent:</span>
              <span className="detail-value">{result.opponentName}</span>
            </div>
            <div className="detail-item">
              <span className="detail-label">Time Spent:</span>
              <span className="detail-value">{formatTime(result.timeSpent)}</span>
            </div>
            {result.completedAt && (
              <div className="detail-item">
                <span className="detail-label">Completed:</span>
                <span className="detail-value">{new Date(result.completedAt).toLocaleString()}</span>
              </div>
            )}
            <div className="detail-item">
              <span className="detail-label">XP Earned:</span>
              <span className="detail-value xp">{calculateXP()} XP</span>
            </div>
          </div>

          <div className="performance-comparison">
            <h3>Performance Comparison</h3>

            <div className="comparison-item">
              <div className="comparison-label">Solution Progress</div>
              <div className="comparison-bars">
                <div className="player-bar">
                  <div className="player-name">You</div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${result.userProgress}%` }}
                    ></div>
                  </div>
                  <div className="progress-value">{Math.round(result.userProgress)}%</div>
                </div>

                <div className="player-bar">
                  <div className="player-name">{result.opponentName}</div>
                  <div className="progress-bar">
                    <div
                      className="progress-fill opponent"
                      style={{ width: `${result.opponentProgress}%` }}
                    ></div>
                  </div>
                  <div className="progress-value">{Math.round(result.opponentProgress)}%</div>
                </div>
              </div>
            </div>
          </div>

          <div className="battle-insights">
            <h3>Battle Insights</h3>
            <div className="insights-content">
              {result.userWon ? (
                <p>
                  Congratulations on your victory! You demonstrated excellent problem-solving skills
                  and completed the challenge efficiently. Keep up the good work and continue to
                  challenge yourself with more difficult problems.
                </p>
              ) : (
                <p>
                  Good effort in this battle! While you didn't win this time, each challenge is a
                  learning opportunity. Consider reviewing the problem again and practicing similar
                  problems to improve your skills for the next battle.
                </p>
              )}

              <div className="improvement-tips">
                <h4>Tips for Improvement:</h4>
                <ul>
                  <li>Practice more problems in the {(result.problem && result.problem.split(' ')[0]) || 'Algorithm'} category</li>
                  <li>Review time complexity optimization techniques</li>
                  <li>Try solving the same problem with different approaches</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="result-actions">
            <button className="share-btn btn-primary" onClick={handleShare}>
              Share Result
              <span className="btn-glow"></span>
            </button>
            <button className="rematch-btn btn-primary" onClick={handleRematch}>
              Find New Opponent
              <span className="btn-glow"></span>
            </button>
            <button className="practice-btn" onClick={handlePractice}>
              Practice Mode
            </button>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0.3}>
        <div className="next-steps-card">
          <h3>What's Next?</h3>
          <div className="next-steps-options">
            <Link to="/battles" className="next-step-option hover-lift">
              <div className="option-icon">🏆</div>
              <div className="option-content">
                <h4>More Battles</h4>
                <p>Continue competing in coding battles to improve your skills</p>
              </div>
            </Link>

            <Link to="/learning" className="next-step-option hover-lift">
              <div className="option-icon">📚</div>
              <div className="option-content">
                <h4>Learning Paths</h4>
                <p>Enhance your knowledge with structured learning paths</p>
              </div>
            </Link>

            <Link to="/achievements" className="next-step-option hover-lift">
              <div className="option-icon">🏅</div>
              <div className="option-content">
                <h4>Achievements</h4>
                <p>Check your progress and unlock new achievements</p>
              </div>
            </Link>
          </div>
        </div>
      </ScrollReveal>

      {showShareModal && (
        <div className="modal-overlay fade-in">
          <div className="share-modal scale-in">
            <button className="close-modal" onClick={() => setShowShareModal(false)}>×</button>
            <h3>Share Your Battle Result</h3>

            <div className="share-preview">
              <div className="share-header">
                <div className="share-title">
                  {result.userWon ? 'I won my coding battle!' : 'Great coding battle!'}
                </div>
                <div className="share-subtitle">AlgoHunt Coding Battle</div>
              </div>

              <div className="share-content">
                <p>
                  I just {result.userWon ? 'won' : 'completed'} a coding battle on AlgoHunt!
                  Problem: {result.problem || 'Algorithm Challenge'} | Progress: {Math.round(result.userProgress)}%
                </p>
              </div>
            </div>

            <div className="share-platforms">
              <button className="platform-btn twitter">
                <i className="fab fa-twitter"></i> Twitter
              </button>
              <button className="platform-btn linkedin">
                <i className="fab fa-linkedin"></i> LinkedIn
              </button>
              <button className="platform-btn facebook">
                <i className="fab fa-facebook"></i> Facebook
              </button>
              <button className="platform-btn copy-link">
                <i className="fas fa-link"></i> Copy Link
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BattleResults;
