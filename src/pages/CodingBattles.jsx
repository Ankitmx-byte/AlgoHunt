import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import './CodingBattles.css';
import '../styles/animations.css';

function CodingBattles() {
  const navigate = useNavigate();
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
  const [registeredBattles, setRegisteredBattles] = useState([]);
  const [registeredTournaments, setRegisteredTournaments] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [battleMode, setBattleMode] = useState('ai'); // 'ai' or 'friend'
  const [friendBattleLink, setFriendBattleLink] = useState('');
  const [showFriendLinkCopied, setShowFriendLinkCopied] = useState(false);
  const [friendBattleId, setFriendBattleId] = useState('');
  const [showJoinFriendBattle, setShowJoinFriendBattle] = useState(false);

  useEffect(() => {
    // Fetch battles based on active tab
    fetchBattles(activeTab);

    // Load registered battles from localStorage
    const savedRegisteredBattles = localStorage.getItem('registeredBattles');
    if (savedRegisteredBattles) {
      setRegisteredBattles(JSON.parse(savedRegisteredBattles));
    }

    // Check if URL contains a friend battle ID
    const urlParams = new URLSearchParams(window.location.search);
    const battleId = urlParams.get('battle');
    if (battleId) {
      setFriendBattleId(battleId);
      setShowJoinFriendBattle(true);
    }
  }, [activeTab]);

  useEffect(() => {
    // Fetch tournaments based on active tournament tab
    fetchTournaments(activeTournamentTab);

    // Load registered tournaments from localStorage
    const savedRegisteredTournaments = localStorage.getItem('registeredTournaments');
    if (savedRegisteredTournaments) {
      setRegisteredTournaments(JSON.parse(savedRegisteredTournaments));
    }
  }, [activeTournamentTab]);

  // Hide success message after 3 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);

  const fetchBattles = async (type) => {
    // In a real implementation, this would call your API
    // Simulate API call for battles
    setTimeout(() => {
      // Get current date/time for comparison
      const now = new Date();

      // Create a set of mock battles with different start times
      const allMockBattles = [
        {
          id: 1,
          title: "Binary Tree Traversal Challenge",
          description: "Implement different traversal methods for binary trees and solve related problems.",
          participants: 24,
          duration: 60,
          difficulty: "Medium",
          startTime: new Date(now.getTime() + 24 * 60 * 60 * 1000).toISOString(), // 1 day in future
          status: "upcoming"
        },
        {
          id: 2,
          title: "Dynamic Programming Showdown",
          description: "Solve a series of DP problems with increasing difficulty levels.",
          participants: 42,
          duration: 90,
          difficulty: "Hard",
          startTime: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days in future
          status: "upcoming"
        },
        {
          id: 3,
          title: "Frontend Optimization Battle",
          description: "Optimize React components and improve rendering performance.",
          participants: 18,
          duration: 45,
          difficulty: "Medium",
          startTime: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days in future
          status: "upcoming"
        },
        {
          id: 4,
          title: "Graph Algorithms Challenge",
          description: "Implement and optimize various graph traversal and shortest path algorithms.",
          participants: 31,
          duration: 75,
          difficulty: "Hard",
          startTime: new Date(now.getTime() - 30 * 60 * 1000).toISOString(), // 30 minutes ago (live)
          endTime: new Date(now.getTime() + 45 * 60 * 1000).toISOString(), // Ends 45 minutes from now
          status: "live"
        },
        {
          id: 5,
          title: "React State Management Battle",
          description: "Build efficient state management solutions for complex React applications.",
          participants: 27,
          duration: 60,
          difficulty: "Medium",
          startTime: new Date(now.getTime() - 15 * 60 * 1000).toISOString(), // 15 minutes ago (live)
          endTime: new Date(now.getTime() + 45 * 60 * 1000).toISOString(), // Ends 45 minutes from now
          status: "live"
        },
        {
          id: 6,
          title: "Sorting Algorithms Showdown",
          description: "Implement and optimize various sorting algorithms for different data scenarios.",
          participants: 36,
          duration: 45,
          difficulty: "Easy",
          startTime: new Date(now.getTime() - 10 * 60 * 1000).toISOString(), // 10 minutes ago (live)
          endTime: new Date(now.getTime() + 35 * 60 * 1000).toISOString(), // Ends 35 minutes from now
          status: "live"
        },
        {
          id: 7,
          title: "Database Query Optimization",
          description: "Optimize complex SQL queries and database schema designs.",
          participants: 22,
          duration: 60,
          difficulty: "Medium",
          startTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago (past)
          endTime: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000 + 60 * 60 * 1000).toISOString(), // Ended 2 days ago
          status: "past"
        },
        {
          id: 8,
          title: "String Manipulation Challenge",
          description: "Solve various string manipulation and pattern matching problems.",
          participants: 45,
          duration: 45,
          difficulty: "Easy",
          startTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago (past)
          endTime: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000 + 45 * 60 * 1000).toISOString(), // Ended 3 days ago
          status: "past"
        },
        {
          id: 9,
          title: "System Design Interview Prep",
          description: "Practice system design interview questions with real-time feedback.",
          participants: 19,
          duration: 90,
          difficulty: "Hard",
          startTime: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days ago (past)
          endTime: new Date(now.getTime() - 4 * 24 * 60 * 60 * 1000 + 90 * 60 * 1000).toISOString(), // Ended 4 days ago
          status: "past"
        }
      ];

      // Filter battles based on the active tab
      let filteredBattles;
      switch(type) {
        case 'upcoming':
          filteredBattles = allMockBattles.filter(battle => battle.status === 'upcoming');
          break;
        case 'live':
          filteredBattles = allMockBattles.filter(battle => battle.status === 'live');
          break;
        case 'past':
          filteredBattles = allMockBattles.filter(battle => battle.status === 'past');
          break;
        default:
          filteredBattles = allMockBattles.filter(battle => battle.status === 'upcoming');
      }

      setBattles(filteredBattles);
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

  const registerForBattle = (battle) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Check if already registered
    if (registeredBattles.includes(battle.id)) {
      setSuccessMessage('You are already registered for this battle!');
      setShowSuccessMessage(true);
      return;
    }

    // In a real implementation, this would call your API to register the user
    console.log(`Registered for battle ${battle.id}`);

    // Add to registered battles
    const updatedRegisteredBattles = [...registeredBattles, battle.id];
    setRegisteredBattles(updatedRegisteredBattles);

    // Save to localStorage
    localStorage.setItem('registeredBattles', JSON.stringify(updatedRegisteredBattles));

    // Show success message
    setSuccessMessage(`Successfully registered for "${battle.title}"! You'll receive a notification when the battle starts.`);
    setShowSuccessMessage(true);
  };

  const joinBattle = (battleId) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Find the battle by ID
    const battle = battles.find(b => b.id === battleId);

    if (!battle) {
      console.error(`Battle with ID ${battleId} not found`);
      return;
    }

    // Check if the battle is live
    if (battle.status !== 'live') {
      setSuccessMessage('This battle is not currently live.');
      setShowSuccessMessage(true);
      return;
    }

    // Create a mock opponent based on battle data
    const mockOpponent = {
      name: generateOpponentName(),
      rating: Math.floor(Math.random() * 500) + 1500, // Random rating between 1500-2000
      winRate: `${Math.floor(Math.random() * 30) + 50}%`, // Random win rate between 50-80%
      preferredLanguage: ["Python", "JavaScript", "Java", "C++"][Math.floor(Math.random() * 4)],
      skillLevel: `${Math.floor(Math.random() * 15) + 80}% match for your skill level`, // 80-95% match
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70)}.jpg`
    };

    // Store opponent data in localStorage
    localStorage.setItem('currentOpponent', JSON.stringify(mockOpponent));

    // Calculate remaining time for the battle
    const now = new Date();
    const endTime = new Date(battle.endTime);
    const remainingTimeInMinutes = Math.max(1, Math.floor((endTime - now) / (60 * 1000)));

    // Store battle information in localStorage
    const battleInfo = {
      id: battleId,
      title: battle.title,
      difficulty: battle.difficulty || 'Medium',
      category: battle.category || 'Algorithms',
      opponent: mockOpponent,
      startTime: Date.now(),
      duration: remainingTimeInMinutes,
      originalDuration: battle.duration || 30
    };
    localStorage.setItem('currentBattle', JSON.stringify(battleInfo));

    // Add this battle to registered battles if not already there
    if (!registeredBattles.includes(battleId)) {
      const updatedRegisteredBattles = [...registeredBattles, battleId];
      setRegisteredBattles(updatedRegisteredBattles);
      localStorage.setItem('registeredBattles', JSON.stringify(updatedRegisteredBattles));
    }

    // Show success message and navigate to the battle page
    setSuccessMessage(`Joining battle: ${battle.title}`);
    setShowSuccessMessage(true);

    setTimeout(() => {
      navigate(`/battle/${battleId}`);
    }, 1000);
  };

  // Helper function to generate random opponent names
  const generateOpponentName = () => {
    const firstNames = ["Alex", "Jordan", "Taylor", "Morgan", "Casey", "Riley", "Avery", "Quinn", "Skyler", "Dakota"];
    const lastNames = ["Chen", "Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore"];

    return `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
  };

  // Create a friend battle and generate a shareable link
  const createFriendBattle = () => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Generate a unique battle ID
    const battleId = `friend-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // Create battle information
    const battleInfo = {
      id: battleId,
      title: "Friend Battle",
      difficulty: selectedDifficulty,
      category: selectedCategory,
      createdBy: localStorage.getItem('userName') || 'User',
      createdAt: new Date().toISOString(),
      status: 'waiting', // waiting for friend to join
      isFriendBattle: true
    };

    // Save battle information to localStorage
    localStorage.setItem(`friendBattle_${battleId}`, JSON.stringify(battleInfo));

    // Generate shareable link
    const baseUrl = window.location.origin;
    const shareableLink = `${baseUrl}/battles?battle=${battleId}`;

    // Set the link in state
    setFriendBattleLink(shareableLink);
  };

  // Copy friend battle link to clipboard
  const copyFriendBattleLink = () => {
    navigator.clipboard.writeText(friendBattleLink).then(() => {
      setShowFriendLinkCopied(true);
      setTimeout(() => {
        setShowFriendLinkCopied(false);
      }, 3000);
    });
  };

  // Join a friend battle
  const joinFriendBattle = (battleId) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Get battle information from localStorage
    const battleInfo = localStorage.getItem(`friendBattle_${battleId}`);

    if (!battleInfo) {
      setSuccessMessage('Battle not found or has expired.');
      setShowSuccessMessage(true);
      return;
    }

    const battle = JSON.parse(battleInfo);

    // Update battle status
    battle.status = 'active';
    battle.joinedBy = localStorage.getItem('userName') || 'Friend';
    battle.joinedAt = new Date().toISOString();

    // Save updated battle information
    localStorage.setItem(`friendBattle_${battleId}`, JSON.stringify(battle));

    // Create opponent information
    const opponent = {
      name: battle.createdBy,
      rating: Math.floor(Math.random() * 500) + 1500,
      winRate: `${Math.floor(Math.random() * 30) + 50}%`,
      preferredLanguage: "JavaScript",
      skillLevel: "Friend Battle",
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70)}.jpg`
    };

    // Save opponent information
    localStorage.setItem('currentOpponent', JSON.stringify(opponent));

    // Create battle information for the arena
    const arenaInfo = {
      id: battleId,
      title: "Friend Battle with " + battle.createdBy,
      difficulty: battle.difficulty,
      category: battle.category,
      opponent: opponent,
      startTime: Date.now(),
      duration: 30, // Default 30 minutes
      isFriendBattle: true
    };

    localStorage.setItem('currentBattle', JSON.stringify(arenaInfo));

    // Show success message and navigate to battle arena
    setSuccessMessage('Joining friend battle...');
    setShowSuccessMessage(true);

    setTimeout(() => {
      navigate(`/battle/${battleId}`);
    }, 1000);
  };

  // Start a friend battle (for the creator)
  const startFriendBattle = () => {
    // Extract battle ID from the link
    const url = new URL(friendBattleLink);
    const battleId = url.searchParams.get('battle');

    if (!battleId) {
      setSuccessMessage('Invalid battle link.');
      setShowSuccessMessage(true);
      return;
    }

    // Get battle information
    const battleInfo = localStorage.getItem(`friendBattle_${battleId}`);

    if (!battleInfo) {
      setSuccessMessage('Battle not found or has expired.');
      setShowSuccessMessage(true);
      return;
    }

    const battle = JSON.parse(battleInfo);

    // Check if friend has joined
    if (battle.status !== 'active') {
      setSuccessMessage('Waiting for your friend to join...');
      setShowSuccessMessage(true);
      return;
    }

    // Create opponent information
    const opponent = {
      name: battle.joinedBy,
      rating: Math.floor(Math.random() * 500) + 1500,
      winRate: `${Math.floor(Math.random() * 30) + 50}%`,
      preferredLanguage: "JavaScript",
      skillLevel: "Friend Battle",
      avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 70)}.jpg`
    };

    // Save opponent information
    localStorage.setItem('currentOpponent', JSON.stringify(opponent));

    // Create battle information for the arena
    const arenaInfo = {
      id: battleId,
      title: "Friend Battle with " + battle.joinedBy,
      difficulty: battle.difficulty,
      category: battle.category,
      opponent: opponent,
      startTime: Date.now(),
      duration: 30, // Default 30 minutes
      isFriendBattle: true
    };

    localStorage.setItem('currentBattle', JSON.stringify(arenaInfo));

    // Close the modal and navigate to battle arena
    setShowOneVsOneModal(false);

    // Show success message and navigate to battle arena
    setSuccessMessage('Starting friend battle...');
    setShowSuccessMessage(true);

    setTimeout(() => {
      navigate(`/battle/${battleId}`);
    }, 1000);
  };

  const viewBattleResults = (battleId) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Find the battle by ID
    const battle = battles.find(b => b.id === battleId);

    if (!battle) {
      console.error(`Battle with ID ${battleId} not found`);
      return;
    }

    // Check if the battle is past
    if (battle.status !== 'past') {
      setSuccessMessage('Results are only available for completed battles.');
      setShowSuccessMessage(true);
      return;
    }

    // Check if a result already exists
    const existingResult = localStorage.getItem(`battleResult_${battleId}`);

    if (!existingResult) {
      // Generate a random opponent name
      const opponentName = generateOpponentName();

      // Create a mock result with more realistic data
      const userProgress = Math.floor(Math.random() * 100);
      const opponentProgress = Math.floor(Math.random() * 100);
      const userWon = userProgress > opponentProgress;

      // Calculate a realistic time spent based on battle duration
      const battleDuration = battle.duration * 60 || 1800; // Convert to seconds, default 30 minutes
      const timeSpent = Math.floor(Math.random() * (battleDuration * 0.8)) + Math.floor(battleDuration * 0.2); // Between 20% and 100% of duration

      // Create problem titles based on battle title
      let problemTitle = "Algorithm Challenge";
      if (battle.title.includes("Tree")) problemTitle = "Binary Tree Traversal";
      else if (battle.title.includes("Dynamic")) problemTitle = "Fibonacci Sequence";
      else if (battle.title.includes("Graph")) problemTitle = "Shortest Path Algorithm";
      else if (battle.title.includes("String")) problemTitle = "String Pattern Matching";
      else if (battle.title.includes("Sort")) problemTitle = "Quick Sort Implementation";
      else if (battle.title.includes("Database")) problemTitle = "SQL Query Optimization";
      else if (battle.title.includes("React")) problemTitle = "React Component Optimization";

      const mockResult = {
        battleId,
        battleTitle: battle.title,
        userWon,
        opponentName,
        problem: problemTitle,
        userProgress: userWon ? Math.max(userProgress, opponentProgress + 5) : userProgress,
        opponentProgress: !userWon ? Math.max(opponentProgress, userProgress + 5) : opponentProgress,
        timeSpent,
        completedAt: battle.endTime
      };

      // Save to localStorage
      localStorage.setItem(`battleResult_${battleId}`, JSON.stringify(mockResult));
    }

    // Show success message and navigate to the battle results page
    setSuccessMessage('Loading battle results...');
    setShowSuccessMessage(true);

    setTimeout(() => {
      navigate(`/battle/${battleId}/results`);
    }, 1000);
  };

  const registerForTournament = (tournament) => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Check if already registered
    if (registeredTournaments.includes(tournament.id)) {
      setSuccessMessage('You are already registered for this tournament!');
      setShowSuccessMessage(true);
      return;
    }

    // In a real implementation, this would call your API to register the user
    console.log(`Registered for tournament ${tournament.id}`);

    // Add to registered tournaments
    const updatedRegisteredTournaments = [...registeredTournaments, tournament.id];
    setRegisteredTournaments(updatedRegisteredTournaments);

    // Save to localStorage
    localStorage.setItem('registeredTournaments', JSON.stringify(updatedRegisteredTournaments));

    // Show success message
    setSuccessMessage(`Successfully registered for "${tournament.title}"! You'll receive AI-personalized preparation recommendations soon.`);
    setShowSuccessMessage(true);
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
    // Show success message instead of alert
    setSuccessMessage("Match accepted! Preparing battle arena...");
    setShowSuccessMessage(true);

    // Close the modal and reset state
    setShowOneVsOneModal(false);
    setMatchFound(false);

    // Generate a unique battle ID for this match
    const battleId = Date.now(); // Simple way to generate a unique ID

    // Store opponent data in localStorage so it can be accessed in the battle page
    if (opponent) {
      localStorage.setItem('currentOpponent', JSON.stringify(opponent));
    }

    // Create a title based on difficulty and category
    let battleTitle = "1v1 Coding Battle";
    if (selectedCategory === 'algorithms') {
      battleTitle = `${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Algorithm Challenge`;
    } else if (selectedCategory === 'data-structures') {
      battleTitle = `${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} Data Structures Battle`;
    } else if (selectedCategory === 'system-design') {
      battleTitle = `${selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)} System Design Challenge`;
    }

    // Store battle information in localStorage with more details
    const battleInfo = {
      id: battleId,
      title: battleTitle,
      difficulty: selectedDifficulty,
      category: selectedCategory,
      opponent: opponent,
      startTime: Date.now(),
      duration: selectedDifficulty === 'easy' ? 20 : (selectedDifficulty === 'hard' ? 45 : 30), // Duration based on difficulty
      status: 'active', // Mark the battle as active
      battleStarted: true, // Flag to indicate the battle has started
      preventAutoEnd: true, // Special flag to prevent the battle from ending automatically
      userProgress: 0, // Initialize user progress to 0
      opponentProgress: 0 // Initialize opponent progress to 0
    };
    localStorage.setItem('currentBattle', JSON.stringify(battleInfo));

    // Add this battle to registered battles
    const registeredBattles = JSON.parse(localStorage.getItem('registeredBattles') || '[]');
    if (!registeredBattles.includes(battleId)) {
      registeredBattles.push(battleId);
      localStorage.setItem('registeredBattles', JSON.stringify(registeredBattles));
    }

    // Navigate to the battle page with a slight delay
    setTimeout(() => {
      navigate(`/battle/${battleId}`);
    }, 1500); // Increased delay to ensure everything is ready
  };

  const declineMatch = () => {
    setMatchFound(false);
    setOpponent(null);
  };

  return (
    <div className="battles-container">
      {showSuccessMessage && (
        <div className="success-message fade-in">
          <div className="success-icon pulse">✓</div>
          <div className="success-text">{successMessage}</div>
        </div>
      )}

      <ScrollReveal animation="fade-in-down">
        <div className="battles-header">
          <h1 className="animated-gradient">Coding Battles</h1>
          <p>Compete in real-time challenges and climb the leaderboard</p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0.2}>
        <div className="section-toggle-container">
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

          <Link to="/battle/practice" className="practice-mode-battles-button hover-lift">
            <span className="practice-icon">🏋️</span>
            <span>Practice Mode</span>
          </Link>
        </div>
      </ScrollReveal>

      {activeTab !== 'tournaments' ? (
        <>
          <ScrollReveal animation="fade-in-up" delay={0.3}>
            <div className="one-vs-one-banner card-shine">
              <div className="banner-content">
                <div className="banner-text">
                  <h3>1v1 AI-Matched Coding Battles</h3>
                  <p>Challenge opponents at your skill level in real-time coding duels</p>
                </div>
                <button
                  className="find-opponent-btn pulse"
                  onClick={() => setShowOneVsOneModal(true)}
                >
                  Find Opponent
                  <span className="btn-glow"></span>
                </button>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-in-up" delay={0.4}>
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
          </ScrollReveal>

          <ScrollReveal animation="fade-in-up" delay={0.5}>
            <div className="battles-list stagger-fade-up">
              {battles.map((battle, index) => (
                <div
                  key={battle.id}
                  className="battle-card hover-lift card-shine"
                  data-index={index}
                  style={{"--stagger-delay": "0.1s"}}
                >
                  <div className="battle-info">
                    <h3>{battle.title}</h3>
                    <div className="battle-meta">
                      <span className="difficulty">{battle.difficulty}</span>
                      <span className="participants">{battle.participants} Participants</span>
                      <span className="duration">{battle.duration} mins</span>
                      {activeTab === 'upcoming' && (
                        <span className="start-time">
                          Starts: {new Date(battle.startTime).toLocaleString()}
                        </span>
                      )}
                      {activeTab === 'live' && (
                        <span className="end-time">
                          Ends: {new Date(battle.endTime).toLocaleString()}
                        </span>
                      )}
                      {activeTab === 'past' && (
                        <span className="end-time">
                          Ended: {new Date(battle.endTime).toLocaleString()}
                        </span>
                      )}
                    </div>
                    <p>{battle.description}</p>
                  </div>
                  <div className="battle-action">
                    {activeTab === 'upcoming' && (
                      registeredBattles.includes(battle.id) ? (
                        <button className="registered-btn" disabled>Registered</button>
                      ) : (
                        <button
                          className="register-btn btn-primary"
                          onClick={() => registerForBattle(battle)}
                        >
                          Register
                          <span className="btn-glow"></span>
                        </button>
                      )
                    )}
                    {activeTab === 'live' && (
                      <button
                        className="join-btn btn-primary pulse"
                        onClick={() => joinBattle(battle.id)}
                      >
                        Join Now
                        <span className="btn-glow"></span>
                      </button>
                    )}
                    {activeTab === 'past' && (
                      <button
                        className="view-btn btn-primary"
                        onClick={() => viewBattleResults(battle.id)}
                      >
                        View Results
                        <span className="btn-glow"></span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </>
      ) : (
        <>
          <ScrollReveal animation="fade-in-up" delay={0.3}>
            <div className="tournament-header">
              <h2 className="animated-gradient">AI-Powered Tournaments</h2>
              <p>Multi-round competitions with AI matchmaking based on your skill level</p>
            </div>
          </ScrollReveal>

          <ScrollReveal animation="fade-in-up" delay={0.4}>
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
          </ScrollReveal>

          <ScrollReveal animation="fade-in-up" delay={0.5}>
            <div className="tournaments-list stagger-fade-up">
              {tournaments.map((tournament, index) => (
                <div
                  key={tournament.id}
                  className="tournament-card hover-lift card-shine"
                  data-index={index}
                  style={{"--stagger-delay": "0.1s"}}
                >
                  <div className="tournament-header-section">
                    <h3>{tournament.title}</h3>
                    <div className="tournament-prize pulse">{tournament.prize}</div>
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
                    <div className="ai-icon pulse">🧠</div>
                    <div className="ai-match-text">
                      <strong>AI Matchmaking:</strong> {tournament.skillLevel}
                    </div>
                  </div>

                  <div className="tournament-action">
                    {registeredTournaments.includes(tournament.id) ? (
                      <button className="registered-tournament-btn" disabled>
                        Registered
                      </button>
                    ) : (
                      <button
                        className="register-tournament-btn btn-primary"
                        onClick={() => registerForTournament(tournament)}
                      >
                        Register Now
                        <span className="btn-glow"></span>
                      </button>
                    )}
                    <button
                      className="details-btn btn-arrow"
                      onClick={() => navigate(`/tournaments/${tournament.id}`)}
                    >
                      View Details
                      <span className="arrow">→</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </ScrollReveal>
        </>
      )}

      {/* 1v1 Battle Modal */}
      {showOneVsOneModal && (
        <div className="modal-overlay fade-in">
          <div className="one-vs-one-modal scale-in">
            <button className="close-modal" onClick={() => setShowOneVsOneModal(false)}>×</button>

            {!matchmaking && !matchFound && !friendBattleLink ? (
              <>
                <h2 className="animated-gradient">Choose Battle Mode</h2>
                <p className="modal-subtitle">Select how you want to battle</p>

                <div className="battle-mode-selector">
                  <button
                    className={`battle-mode-btn ${battleMode === 'ai' ? 'active' : ''}`}
                    onClick={() => setBattleMode('ai')}
                  >
                    <div className="mode-icon">🧠</div>
                    <div className="mode-title">AI Matchmaking</div>
                    <div className="mode-description">Get matched with an opponent of similar skill level</div>
                  </button>

                  <button
                    className={`battle-mode-btn ${battleMode === 'friend' ? 'active' : ''}`}
                    onClick={() => setBattleMode('friend')}
                  >
                    <div className="mode-icon">👥</div>
                    <div className="mode-title">Play with Friend</div>
                    <div className="mode-description">Create a battle and share the link with a friend</div>
                  </button>
                </div>

                <div className="matchmaking-options stagger-fade-up">
                  <div className="option-group" data-index="0">
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

                  <div className="option-group" data-index="1">
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

                {battleMode === 'ai' ? (
                  <button
                    className="start-matchmaking-btn btn-primary pulse"
                    onClick={startOneVsOneMatchmaking}
                  >
                    Start AI Matchmaking
                    <span className="btn-glow"></span>
                  </button>
                ) : (
                  <button
                    className="create-friend-battle-btn btn-primary pulse"
                    onClick={createFriendBattle}
                  >
                    Create Friend Battle
                    <span className="btn-glow"></span>
                  </button>
                )}
              </>
            ) : matchmaking ? (
              <div className="matchmaking-progress fade-in">
                <div className="loading-spinner"></div>
                <h3>Finding Your Opponent</h3>
                <p>Our AI is analyzing skill levels to find your perfect match...</p>
              </div>
            ) : matchFound ? (
              <div className="match-found fade-in">
                <h3 className="pulse">Match Found!</h3>
                <div className="opponent-card hover-lift">
                  <img src={opponent.avatar} alt={opponent.name} className="opponent-avatar" />
                  <div className="opponent-info">
                    <h4>{opponent.name}</h4>
                    <div className="opponent-stats stagger-fade-up">
                      <div className="stat" data-index="0">
                        <span className="stat-label">Rating:</span>
                        <span className="stat-value">{opponent.rating}</span>
                      </div>
                      <div className="stat" data-index="1">
                        <span className="stat-label">Win Rate:</span>
                        <span className="stat-value">{opponent.winRate}</span>
                      </div>
                      <div className="stat" data-index="2">
                        <span className="stat-label">Language:</span>
                        <span className="stat-value">{opponent.preferredLanguage}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="ai-match-indicator match-modal">
                  <div className="ai-icon pulse">🧠</div>
                  <div className="ai-match-text">
                    <strong>AI Matchmaking:</strong> {opponent.skillLevel}
                  </div>
                </div>

                <div className="match-actions">
                  <button className="accept-match-btn btn-primary pulse" onClick={acceptMatch}>
                    Accept Match
                    <span className="btn-glow"></span>
                  </button>
                  <button className="decline-match-btn" onClick={declineMatch}>
                    Decline
                  </button>
                </div>
              </div>
            ) : friendBattleLink ? (
              <div className="friend-battle-created fade-in">
                <h3 className="pulse">Friend Battle Created!</h3>
                <p className="friend-battle-instructions">Share this link with your friend to start the battle:</p>

                <div className="friend-battle-link-container">
                  <input
                    type="text"
                    className="friend-battle-link"
                    value={friendBattleLink}
                    readOnly
                    onClick={(e) => e.target.select()}
                  />
                  <button
                    className="copy-link-btn"
                    onClick={copyFriendBattleLink}
                  >
                    {showFriendLinkCopied ? 'Copied!' : 'Copy'}
                  </button>
                </div>

                <div className="friend-battle-status">
                  <div className="status-icon pulse">⏳</div>
                  <p>Waiting for your friend to join...</p>
                </div>

                <div className="friend-battle-actions">
                  <button
                    className="check-status-btn btn-primary"
                    onClick={startFriendBattle}
                  >
                    Check Status
                    <span className="btn-glow"></span>
                  </button>
                  <button
                    className="create-new-btn"
                    onClick={() => setFriendBattleLink('')}
                  >
                    Create New Battle
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

      {/* Friend Battle Join Modal */}
      {showJoinFriendBattle && (
        <div className="modal-overlay fade-in">
          <div className="join-friend-battle-modal scale-in">
            <button className="close-modal" onClick={() => setShowJoinFriendBattle(false)}>×</button>

            <h3 className="pulse">Friend Battle Invitation</h3>
            <p>You've been invited to join a coding battle with a friend!</p>

            <div className="battle-details-preview">
              <div className="battle-icon">👥</div>
              <div className="battle-preview-info">
                <h4>Friend Battle</h4>
                <p>Join now to start coding together in real-time</p>
              </div>
            </div>

            <div className="join-battle-actions">
              <button
                className="join-battle-btn btn-primary pulse"
                onClick={() => joinFriendBattle(friendBattleId)}
              >
                Join Battle
                <span className="btn-glow"></span>
              </button>
              <button
                className="decline-battle-btn"
                onClick={() => {
                  setShowJoinFriendBattle(false);
                  // Remove battle ID from URL without refreshing
                  window.history.replaceState({}, document.title, window.location.pathname);
                }}
              >
                Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodingBattles;

