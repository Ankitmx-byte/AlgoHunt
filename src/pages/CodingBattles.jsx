import React, { useState, useEffect } from 'react';
import './CodingBattles.css';

function CodingBattles() {
  const [battles, setBattles] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [activeTab, setActiveTab] = useState('upcoming');
  const [activeTournamentTab, setActiveTournamentTab] = useState('open');
  const [showOneVsOneModal, setShowOneVsOneModal] = useState(false);
  const [matchmaking, setMatchmaking] = useState(false);
  const [matchFound, setMatchFound] = useState(false);
  const [opponent, setOpponent] = useState(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState('medium');
  const [selectedCategory, setSelectedCategory] = useState('algorithms');

  useEffect(() => {
    // Fetch battles based on active tab
    fetchBattles(activeTab);
  }, [activeTab]);

  useEffect(() => {
    // Fetch tournaments based on active tournament tab
    fetchTournaments(activeTournamentTab);
  }, [activeTournamentTab]);

  const fetchBattles = async (type) => {
    // In a real implementation, this would call your API
    // Simulate API call for battles
    setTimeout(() => {
      const mockBattles = [
        {
          id: 1,
          title: "Binary Tree Traversal Challenge",
          description: "Implement different traversal methods for binary trees and solve related problems.",
          participants: 24,
          duration: 60,
          difficulty: "Medium",
          startTime: "2023-06-15T18:00:00Z"
        },
        {
          id: 2,
          title: "Dynamic Programming Showdown",
          description: "Solve a series of DP problems with increasing difficulty levels.",
          participants: 42,
          duration: 90,
          difficulty: "Hard",
          startTime: "2023-06-18T15:30:00Z"
        },
        {
          id: 3,
          title: "Frontend Optimization Battle",
          description: "Optimize React components and improve rendering performance.",
          participants: 18,
          duration: 45,
          difficulty: "Medium",
          startTime: "2023-06-20T20:00:00Z"
        }
      ];
      setBattles(mockBattles);
    }, 500);
  };

  const fetchTournaments = async (status) => {
    // Simulate API call for tournaments
    setTimeout(() => {
      const mockTournaments = [
        {
          id: 1,
          title: "Algorithm Masters Championship",
          description: "A multi-round tournament testing your skills in algorithms and data structures.",
          participants: 128,
          startDate: "2023-06-15",
          endDate: "2023-06-30",
          prize: "$5,000",
          difficulty: "Advanced",
          rounds: 4,
          aiMatchmaking: true,
          skillLevel: "85% match for your skill level"
        },
        {
          id: 2,
          title: "Web Dev Showdown",
          description: "Compete in creating responsive web applications with React and Node.js.",
          participants: 64,
          startDate: "2023-07-01",
          endDate: "2023-07-10",
          prize: "$3,000",
          difficulty: "Intermediate",
          rounds: 3,
          aiMatchmaking: true,
          skillLevel: "92% match for your skill level"
        },
        {
          id: 3,
          title: "Machine Learning Challenge",
          description: "Build and optimize ML models to solve real-world problems.",
          participants: 96,
          startDate: "2023-07-15",
          endDate: "2023-07-25",
          prize: "$4,500",
          difficulty: "Expert",
          rounds: 3,
          aiMatchmaking: true,
          skillLevel: "78% match for your skill level"
        }
      ];
      setTournaments(mockTournaments);
    }, 500);
  };

  const registerForTournament = (tournamentId) => {
    // In a real implementation, this would call your API to register the user
    console.log(`Registered for tournament ${tournamentId}`);
    // Show success message or redirect to tournament details page
    alert("Successfully registered for tournament! You'll receive AI-personalized preparation recommendations soon.");
  };

  const startOneVsOneMatchmaking = () => {
    setMatchmaking(true);
    
    // Simulate AI matchmaking process
    setTimeout(() => {
      setMatchmaking(false);
      setMatchFound(true);
      setOpponent({
        name: "Alex Chen",
        rating: 1842,
        winRate: "68%",
        preferredLanguage: "Python",
        skillLevel: "92% match for your skill level",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      });
    }, 3000);
  };

  const acceptMatch = () => {
    // In a real implementation, this would redirect to the battle arena
    alert("Match accepted! Redirecting to battle arena...");
    setShowOneVsOneModal(false);
    setMatchFound(false);
    setOpponent(null);
  };

  const declineMatch = () => {
    setMatchFound(false);
    setOpponent(null);
  };

  return (
    <div className="battles-container">
      <div className="battles-header">
        <h1>Coding Battles</h1>
        <p>Compete in real-time challenges and climb the leaderboard</p>
      </div>

      <div className="section-toggle">
        <button 
          className={activeTab !== 'tournaments' ? 'active' : ''} 
          onClick={() => setActiveTab('upcoming')}
        >
          Individual Battles
        </button>
        <button 
          className={activeTab === 'tournaments' ? 'active' : ''} 
          onClick={() => setActiveTab('tournaments')}
        >
          Tournaments
        </button>
      </div>

      {activeTab !== 'tournaments' ? (
        <>
          <div className="one-vs-one-banner">
            <div className="banner-content">
              <div className="banner-text">
                <h3>1v1 AI-Matched Coding Battles</h3>
                <p>Challenge opponents at your skill level in real-time coding duels</p>
              </div>
              <button 
                className="find-opponent-btn"
                onClick={() => setShowOneVsOneModal(true)}
              >
                Find Opponent
              </button>
            </div>
          </div>

          <div className="battles-tabs">
            <button 
              className={activeTab === 'upcoming' ? 'active' : ''} 
              onClick={() => setActiveTab('upcoming')}
            >
              Upcoming Battles
            </button>
            <button 
              className={activeTab === 'live' ? 'active' : ''} 
              onClick={() => setActiveTab('live')}
            >
              Live Now
            </button>
            <button 
              className={activeTab === 'past' ? 'active' : ''} 
              onClick={() => setActiveTab('past')}
            >
              Past Battles
            </button>
          </div>

          <div className="battles-list">
            {battles.map(battle => (
              <div key={battle.id} className="battle-card">
                <div className="battle-info">
                  <h3>{battle.title}</h3>
                  <div className="battle-meta">
                    <span className="difficulty">{battle.difficulty}</span>
                    <span className="participants">{battle.participants} Participants</span>
                    <span className="duration">{battle.duration} mins</span>
                  </div>
                  <p>{battle.description}</p>
                </div>
                <div className="battle-action">
                  {activeTab === 'upcoming' && <button className="register-btn">Register</button>}
                  {activeTab === 'live' && <button className="join-btn">Join Now</button>}
                  {activeTab === 'past' && <button className="view-btn">View Results</button>}
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="tournament-header">
            <h2>AI-Powered Tournaments</h2>
            <p>Multi-round competitions with AI matchmaking based on your skill level</p>
          </div>

          <div className="tournaments-tabs">
            <button 
              className={activeTournamentTab === 'open' ? 'active' : ''} 
              onClick={() => setActiveTournamentTab('open')}
            >
              Open Registration
            </button>
            <button 
              className={activeTournamentTab === 'upcoming' ? 'active' : ''} 
              onClick={() => setActiveTournamentTab('upcoming')}
            >
              Upcoming
            </button>
            <button 
              className={activeTournamentTab === 'past' ? 'active' : ''} 
              onClick={() => setActiveTournamentTab('past')}
            >
              Past Tournaments
            </button>
          </div>

          <div className="tournaments-list">
            {tournaments.map(tournament => (
              <div key={tournament.id} className="tournament-card">
                <div className="tournament-header-section">
                  <h3>{tournament.title}</h3>
                  <div className="tournament-prize">{tournament.prize}</div>
                </div>
                
                <div className="tournament-meta">
                  <div className="tournament-meta-item">
                    <span className="meta-label">Difficulty:</span>
                    <span className="meta-value difficulty">{tournament.difficulty}</span>
                  </div>
                  <div className="tournament-meta-item">
                    <span className="meta-label">Participants:</span>
                    <span className="meta-value">{tournament.participants}</span>
                  </div>
                  <div className="tournament-meta-item">
                    <span className="meta-label">Rounds:</span>
                    <span className="meta-value">{tournament.rounds}</span>
                  </div>
                  <div className="tournament-meta-item">
                    <span className="meta-label">Dates:</span>
                    <span className="meta-value">{tournament.startDate} to {tournament.endDate}</span>
                  </div>
                </div>
                
                <p className="tournament-description">{tournament.description}</p>
                
                <div className="ai-match-indicator">
                  <div className="ai-icon">🧠</div>
                  <div className="ai-match-text">
                    <strong>AI Matchmaking:</strong> {tournament.skillLevel}
                  </div>
                </div>
                
                <div className="tournament-action">
                  <button 
                    className="register-tournament-btn"
                    onClick={() => registerForTournament(tournament.id)}
                  >
                    Register Now
                  </button>
                  <button className="details-btn">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* 1v1 Battle Modal */}
      {showOneVsOneModal && (
        <div className="modal-overlay">
          <div className="one-vs-one-modal">
            <button className="close-modal" onClick={() => setShowOneVsOneModal(false)}>×</button>
            
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
                        className={selectedCategory === 'system-design' ? 'active' : ''} 
                        onClick={() => setSelectedCategory('system-design')}
                      >
                        System Design
                      </button>
                    </div>
                  </div>
                </div>
                
                <button 
                  className="start-matchmaking-btn"
                  onClick={startOneVsOneMatchmaking}
                >
                  Start Matchmaking
                </button>
              </>
            ) : matchmaking ? (
              <div className="matchmaking-progress">
                <div className="spinner"></div>
                <h3>Finding Your Opponent</h3>
                <p>Our AI is analyzing skill levels to find your perfect match...</p>
              </div>
            ) : (
              <div className="match-found">
                <h3>Match Found!</h3>
                <div className="opponent-card">
                  <img src={opponent.avatar} alt={opponent.name} className="opponent-avatar" />
                  <div className="opponent-info">
                    <h4>{opponent.name}</h4>
                    <div className="opponent-stats">
                      <div className="stat">
                        <span className="stat-label">Rating:</span>
                        <span className="stat-value">{opponent.rating}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Win Rate:</span>
                        <span className="stat-value">{opponent.winRate}</span>
                      </div>
                      <div className="stat">
                        <span className="stat-label">Language:</span>
                        <span className="stat-value">{opponent.preferredLanguage}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="ai-match-indicator match-modal">
                  <div className="ai-icon">🧠</div>
                  <div className="ai-match-text">
                    <strong>AI Matchmaking:</strong> {opponent.skillLevel}
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
      )}
    </div>
  );
}

export default CodingBattles;

