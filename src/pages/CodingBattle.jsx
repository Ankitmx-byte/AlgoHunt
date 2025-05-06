import React, { useState, useEffect } from 'react';
import './CodingBattle.css';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function CodingBattle() {
  const { battleId } = useParams();
  const navigate = useNavigate();
  
  // Battle state
  const [battleState, setBattleState] = useState({
    status: 'preparing', // preparing, matchmaking, active, completed
    timeRemaining: 1800, // 30 minutes in seconds
    problem: null,
    opponent: null,
    userCode: '',
    opponentProgress: 0,
    userTestResults: null,
    winner: null,
    battleType: '1v1',
    aiAnalysis: null,
    skillMatchPercentage: null
  });

  // UI states
  const [testCases, setTestCases] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showAiInsights, setShowAiInsights] = useState(false);
  
  // Matchmaking states
  const [showMatchmakingModal, setShowMatchmakingModal] = useState(true);
  const [matchmaking, setMatchmaking] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedCategory, setSelectedCategory] = useState('algorithms');

  // Judge0 language IDs
  const languageIds = {
    javascript: 63,  // Node.js
    python: 71,      // Python 3
    java: 62,        // Java
    cpp: 54,         // C++
    csharp: 51       // C#
  };

  // Start matchmaking process
  const startMatchmaking = () => {
    setMatchmaking(true);
    
    // Simulate AI matchmaking process
    setTimeout(() => {
      setMatchmaking(false);
      setMatchFound(true);
      
      // AI-matched opponent based on selected difficulty and category
      const opponents = [
        {
          name: "Alex Chen",
          rating: 1842,
          winRate: "68%",
          preferredLanguage: "Python",
          skillLevel: "92% match for your skill level",
          avatar: "https://randomuser.me/api/portraits/men/32.jpg"
        },
        {
          name: "Sarah Johnson",
          rating: 1756,
          winRate: "72%",
          preferredLanguage: "JavaScript",
          skillLevel: "88% match for your skill level",
          avatar: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        {
          name: "Raj Patel",
          rating: 1925,
          winRate: "65%",
          preferredLanguage: "Java",
          skillLevel: "95% match for your skill level",
          avatar: "https://randomuser.me/api/portraits/men/67.jpg"
        }
      ];
      
      // Select opponent based on difficulty
      const opponentIndex = selectedDifficulty === 'easy' ? 1 : 
                           (selectedDifficulty === 'medium' ? 0 : 2);
      
      setBattleState(prev => ({
        ...prev,
        opponent: opponents[opponentIndex],
        skillMatchPercentage: opponents[opponentIndex].skillLevel.split('%')[0] + '%'
      }));
    }, 3000);
  };

  // Accept the matched opponent and start the battle
  const acceptMatch = () => {
    setShowMatchmakingModal(false);
    
    // Fetch problem based on difficulty and category
    fetchProblem(selectedDifficulty, selectedCategory);
  };

  // Decline the match and return to matchmaking
  const declineMatch = () => {
    setMatchFound(false);
    setMatchmaking(false);
  };

  // Format time for display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Render the matchmaking modal
  const renderMatchmakingModal = () => {
    return (
      <div className="matchmaking-modal-overlay">
        <div className="matchmaking-modal">
          {!matchmaking && !matchFound ? (
            <>
              <h2>Find Your Perfect Opponent</h2>
              <p className="modal-subtitle">Our AI will match you with an opponent of similar skill level</p>
              
              <div className="matchmaking-options">
                <div className="option-group">
                  <label>Difficulty Level</label>
                  <div className="option-buttons">
                    <button 
                      className={selectedDifficulty === 'easy' ? 'active' : ''} 
                      onClick={() => setSelectedDifficulty('easy')}
                    >
                      Easy
                    </button>
                    <button 
                      className={selectedDifficulty === 'medium' ? 'active' : ''} 
                      onClick={() => setSelectedDifficulty('medium')}
                    >
                      Medium
                    </button>
                    <button 
                      className={selectedDifficulty === 'hard' ? 'active' : ''} 
                      onClick={() => setSelectedDifficulty('hard')}
                    >
                      Hard
                    </button>
                  </div>
                </div>
                
                <div className="option-group">
                  <label>Problem Category</label>
                  <div className="option-buttons">
                    <button 
                      className={selectedCategory === 'algorithms' ? 'active' : ''} 
                      onClick={() => setSelectedCategory('algorithms')}
                    >
                      Algorithms
                    </button>
                    <button 
                      className={selectedCategory === 'data-structures' ? 'active' : ''} 
                      onClick={() => setSelectedCategory('data-structures')}
                    >
                      Data Structures
                    </button>
                    <button 
                      className={selectedCategory === 'dynamic-programming' ? 'active' : ''} 
                      onClick={() => setSelectedCategory('dynamic-programming')}
                    >
                      Dynamic Programming
                    </button>
                  </div>
                </div>
                
                <div className="option-group">
                  <label>Preferred Language</label>
                  <select 
                    value={selectedLanguage} 
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className="language-select"
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="csharp">C#</option>
                  </select>
                </div>
              </div>
              
              <div className="ai-matchmaking-info">
                <div className="ai-icon">🧠</div>
                <div className="ai-info-text">
                  <p>Our AI will analyze your skill level and find an opponent with similar abilities</p>
                  <p>Judge0 platform will be used to evaluate your code submissions</p>
                </div>
              </div>
              
              <button 
                className="start-matchmaking-btn"
                onClick={startMatchmaking}
              >
                Start Matchmaking
              </button>
            </>
          ) : matchmaking ? (
            <div className="matchmaking-progress">
              <div className="spinner"></div>
              <h3>Finding Your Opponent</h3>
              <p>Our AI is analyzing skill levels to find your perfect match...</p>
              <div className="matchmaking-steps">
                <div className="step completed">
                  <div className="step-number">1</div>
                  <div className="step-text">Analyzing your skill profile</div>
                </div>
                <div className="step active">
                  <div className="step-number">2</div>
                  <div className="step-text">Searching for compatible opponents</div>
                </div>
                <div className="step">
                  <div className="step-number">3</div>
                  <div className="step-text">Selecting optimal problem</div>
                </div>
                <div className="step">
                  <div className="step-number">4</div>
                  <div className="step-text">Preparing Judge0 environment</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="match-found">
              <h3>Match Found!</h3>
              <div className="opponent-card">
                <img src={battleState.opponent.avatar} alt={battleState.opponent.name} className="opponent-avatar" />
                <div className="opponent-info">
                  <h4>{battleState.opponent.name}</h4>
                  <div className="opponent-stats">
                    <div className="stat">
                      <span className="stat-label">Rating:</span>
                      <span className="stat-value">{battleState.opponent.rating}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Win Rate:</span>
                      <span className="stat-value">{battleState.opponent.winRate}</span>
                    </div>
                    <div className="stat">
                      <span className="stat-label">Language:</span>
                      <span className="stat-value">{battleState.opponent.preferredLanguage}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="battle-details">
                <div className="detail-item">
                  <span className="detail-label">Difficulty:</span>
                  <span className="detail-value">{selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Category:</span>
                  <span className="detail-value">{selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1).replace('-', ' ')}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Judge:</span>
                  <span className="detail-value">Judge0 Platform</span>
                </div>
              </div>
              
              <div className="ai-match-indicator">
                <div className="ai-icon">🧠</div>
                <div className="ai-match-text">
                  <strong>AI Matchmaking:</strong> {battleState.opponent.skillLevel}
                </div>
              </div>
              
              <div className="match-actions">
                <button className="accept-match-btn" onClick={acceptMatch}>Accept Match</button>
                <button className="decline-match-btn" onClick={declineMatch}>Decline</button>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render the main battle UI
  return (
    <div className="coding-battle-container">
      {showMatchmakingModal && renderMatchmakingModal()}
      
      {!showMatchmakingModal && battleState.status === 'preparing' && (
        <div className="battle-loading">
          <div className="spinner"></div>
          <h2>Preparing your 1v1 battle...</h2>
          <p>Setting up the coding environment and connecting with Judge0</p>
        </div>
      )}
      
      {!showMatchmakingModal && battleState.status === 'active' && battleState.problem && (
        <div className="battle-active">
          {/* Battle UI will be implemented here */}
          <div className="battle-header">
            <h1>{battleState.problem.title}</h1>
            <div className="battle-timer">{formatTime(battleState.timeRemaining)}</div>
          </div>
          
          <div className="battle-content">
            {/* Problem description, code editor, etc. */}
          </div>
        </div>
      )}
    </div>
  );
}

export default CodingBattle;


