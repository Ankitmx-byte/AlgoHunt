import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import './CodingBattleArena.css';
import '../styles/animations.css';

function CodingBattleArena() {
  const { battleId } = useParams();
  const navigate = useNavigate();
  const [battle, setBattle] = useState(null);
  const [opponent, setOpponent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [problem, setProblem] = useState(null);
  const [testCases, setTestCases] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [battleEnded, setBattleEnded] = useState(false);
  const [opponentProgress, setOpponentProgress] = useState(0);
  const [userProgress, setUserProgress] = useState(0);
  const [chatMessages, setChatMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [isFriendBattle, setIsFriendBattle] = useState(false);

  // Use refs to track initialization state
  const initialized = useRef(false);
  const startTime = useRef(Date.now());

  useEffect(() => {
    // Prevent double initialization
    if (initialized.current) return;
    initialized.current = true;

    // Set the start time
    startTime.current = Date.now();

    // Clear any existing battle results to prevent immediate ending
    localStorage.removeItem(`battleResult_${battleId}`);

    // Load battle data from localStorage
    const battleData = localStorage.getItem('currentBattle');
    const opponentData = localStorage.getItem('currentOpponent');

    // Initialize battle data
    let currentBattle;
    if (battleData) {
      try {
        currentBattle = JSON.parse(battleData);

        // Force reset battle status and start time
        currentBattle.status = 'active';
        currentBattle.startTime = Date.now();
        delete currentBattle.endTime;
        delete currentBattle.completed;

        // Set the battle in state
        setBattle(currentBattle);

        // Check if this is a friend battle
        if (currentBattle.isFriendBattle) {
          setIsFriendBattle(true);
        }

        // Set time left based on difficulty or use the battle's duration if available
        let duration = currentBattle.duration || 30; // Default 30 minutes
        if (!currentBattle.duration) {
          // If no duration is specified, set based on difficulty
          if (currentBattle.difficulty === 'easy') duration = 20;
          else if (currentBattle.difficulty === 'hard') duration = 45;
          else duration = 30; // Medium difficulty
        }

        setTimeLeft(duration * 60); // Convert to seconds
      } catch (error) {
        console.error("Error parsing battle data:", error);
        // Create a new battle if parsing fails
        createNewBattle();
      }
    } else {
      // If no battle data, create a new one
      createNewBattle();
    }

    // Initialize opponent data
    if (opponentData) {
      try {
        setOpponent(JSON.parse(opponentData));
      } catch (error) {
        console.error("Error parsing opponent data:", error);
        createDefaultOpponent();
      }
    } else {
      createDefaultOpponent();
    }

    // Reset battle state
    setBattleEnded(false);
    setUserProgress(0);
    setOpponentProgress(0);

    // Load problem based on difficulty and category
    loadProblem();

    setLoading(false);
  }, [battleId]);

  // Helper function to create a new battle
  const createNewBattle = () => {
    const defaultBattle = {
      id: battleId,
      title: "1v1 Coding Battle",
      difficulty: 'Medium',
      category: 'Algorithms',
      startTime: Date.now(),
      duration: 30,
      status: 'active'
    };
    setBattle(defaultBattle);
    setTimeLeft(30 * 60); // 30 minutes in seconds

    // Save to localStorage
    localStorage.setItem('currentBattle', JSON.stringify(defaultBattle));
  };

  // Helper function to create a default opponent
  const createDefaultOpponent = () => {
    const defaultOpponent = {
      name: "Alex Chen",
      rating: 1842,
      winRate: "68%",
      preferredLanguage: "Python",
      skillLevel: "92% match for your skill level",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg"
    };
    setOpponent(defaultOpponent);

    // Save to localStorage
    localStorage.setItem('currentOpponent', JSON.stringify(defaultOpponent));
  };

  // Timer countdown - just updates the timer without ending the battle
  useEffect(() => {
    if (timeLeft > 0 && !battleEnded) {
      const timer = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);

      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !battleEnded) {
      console.log("Time has run out, but battle will continue until manually ended");
      // Don't end the battle automatically
    }
  }, [timeLeft, battleEnded]);

  // Simulate opponent progress
  useEffect(() => {
    // Only start opponent progress simulation if:
    // 1. Battle is not ended
    // 2. Opponent exists
    // 3. At least 30 seconds have passed since initialization
    if (!battleEnded && opponent) {
      // Start with a longer delay to give the user time to read the problem
      const initialDelay = setTimeout(() => {
        console.log("Starting opponent progress simulation");

        // Create a more realistic opponent progress simulation
        const interval = setInterval(() => {
          // Get time elapsed since battle start
          const timeElapsed = (Date.now() - startTime.current) / 1000;

          // Only update progress if at least 30 seconds have passed
          if (timeElapsed < 30) {
            console.log("Not updating opponent progress yet, waiting for 30 seconds to pass");
            return;
          }

          setOpponentProgress(prev => {
            // Make progress increments smaller and more realistic
            // The increment is based on difficulty and varies slightly
            let baseIncrement;
            if (battle?.difficulty?.toLowerCase() === 'easy') {
              baseIncrement = 0.4; // Faster progress on easy problems
            } else if (battle?.difficulty?.toLowerCase() === 'hard') {
              baseIncrement = 0.15; // Slower progress on hard problems
            } else {
              baseIncrement = 0.25; // Medium difficulty default
            }

            // Add some randomness to the increment
            const randomFactor = Math.random() * 0.5 + 0.75; // Between 0.75 and 1.25
            const increment = baseIncrement * randomFactor;

            // Calculate new progress
            const newProgress = prev + increment;

            // Simulate the opponent getting stuck sometimes
            const stuckProbability = 0.15; // 15% chance of getting stuck each update
            if (Math.random() < stuckProbability && prev > 20) {
              // If stuck, don't increase progress this time
              return prev;
            }

            // Cap progress at 95% until at least 3 minutes have passed
            if (timeElapsed < 180 && newProgress > 95) {
              return 95;
            }

            // If opponent reaches 100%, cap at 99% to prevent automatic win
            if (newProgress >= 100) {
              console.log("Opponent reached 100% progress, capping at 99%");
              // Never end the battle automatically
              return 99;
            }

            return newProgress;
          });
        }, 10000); // Slower updates (every 10 seconds)

        return () => clearInterval(interval);
      }, 30000); // 30 second initial delay

      return () => clearTimeout(initialDelay);
    }
  }, [opponent, battleEnded, battle?.difficulty]);

  const loadProblem = () => {
    // In a real app, this would fetch from an API
    // For now, we'll use a mock problem
    const mockProblem = {
      title: "Two Sum",
      description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target. You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      examples: [
        {
          input: "nums = [2,7,11,15], target = 9",
          output: "[0,1]",
          explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
        },
        {
          input: "nums = [3,2,4], target = 6",
          output: "[1,2]",
          explanation: "Because nums[1] + nums[2] == 6, we return [1, 2]."
        }
      ],
      constraints: [
        "2 <= nums.length <= 10^4",
        "-10^9 <= nums[i] <= 10^9",
        "-10^9 <= target <= 10^9",
        "Only one valid answer exists."
      ],
      difficulty: "Easy",
      hints: [
        "Try using a hash map to store the values you've seen so far.",
        "For each element, check if target - current element exists in the hash map."
      ],
      solution: `function twoSum(nums, target) {
  const map = new Map();

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map.has(complement)) {
      return [map.get(complement), i];
    }

    map.set(nums[i], i);
  }

  return null;
}`
    };

    setProblem(mockProblem);

    // Set up test cases
    setTestCases([
      { input: "twoSum([2,7,11,15], 9)", expectedOutput: "[0,1]" },
      { input: "twoSum([3,2,4], 6)", expectedOutput: "[1,2]" },
      { input: "twoSum([3,3], 6)", expectedOutput: "[0,1]" }
    ]);

    // Set initial code template
    setCode(`function twoSum(nums, target) {
  // Your solution here
}`);
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const runCode = () => {
    setIsRunning(true);

    // Simulate code execution
    setTimeout(() => {
      // In a real app, this would actually execute the code
      // For now, we'll simulate results

      // Generate more realistic test results with some randomness
      const results = testCases.map(test => {
        // 80% chance of passing a test when running code
        const passed = Math.random() < 0.8;
        return {
          input: test.input,
          expectedOutput: test.expectedOutput,
          actualOutput: passed ? test.expectedOutput : "[1,0]", // Different output if failed
          passed: passed
        };
      });

      setTestResults(results);
      setIsRunning(false);

      // Update progress
      const passedTests = results.filter(r => r.passed).length;
      const progress = (passedTests / testCases.length) * 100;
      setUserProgress(progress);

      // Don't automatically end the battle when tests pass
      // Let the user explicitly submit their solution
    }, 1500);
  };

  const submitSolution = () => {
    setIsSubmitting(true);

    // Get time elapsed since battle start
    const timeElapsed = (Date.now() - startTime.current) / 1000;
    console.log(`Submitting solution after ${timeElapsed} seconds`);

    // Simulate submission
    setTimeout(() => {
      // Generate test results with high chance of success for submission
      const results = testCases.map(test => {
        // 90% chance of passing a test when submitting
        const passed = Math.random() < 0.9;
        return {
          input: test.input,
          expectedOutput: test.expectedOutput,
          actualOutput: passed ? test.expectedOutput : "[1,0]", // Different output if failed
          passed: passed
        };
      });

      setTestResults(results);

      // Update progress
      const passedTests = results.filter(r => r.passed).length;
      const progress = (passedTests / testCases.length) * 100;
      setUserProgress(progress);

      // Check if all tests passed
      if (passedTests === testCases.length) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'submission-success';
        successMessage.innerHTML = '<div class="success-icon">✓</div><div>All tests passed! You can now complete the battle.</div>';

        // Find the code section or create a fallback container
        const codeSection = document.querySelector('.code-section') || document.body;
        codeSection.appendChild(successMessage);

        // Remove the message after 3 seconds
        setTimeout(() => {
          if (document.querySelector('.submission-success')) {
            document.querySelector('.submission-success').remove();
          }
        }, 3000);
      }

      setIsSubmitting(false);
    }, 2000);
  };

  const handleOpponentFinished = () => {
    // This function is no longer used - opponent will never automatically win
    console.log("handleOpponentFinished called, but ignored");
  };

  const endBattle = (userWon = true) => {
    // Check if battle is already ended to prevent multiple calls
    if (battleEnded) {
      console.log("Battle already ended, ignoring call to endBattle");
      return;
    }

    // Always allow the battle to end when the button is clicked
    console.log("Manually ending battle with userWon:", userWon);

    // Set battle as ended
    setBattleEnded(true);
    console.log("Battle ended with userWon:", userWon);

    // Calculate the battle duration in seconds
    const battleDuration = battle?.duration ? battle.duration * 60 : 30 * 60; // Default to 30 minutes

    // Get current date/time for completion timestamp
    const completedAt = new Date().toISOString();

    // Calculate a realistic opponent progress based on who won
    let finalOpponentProgress;
    if (userWon) {
      // If user won, opponent progress should be less than user's
      finalOpponentProgress = Math.min(opponentProgress, userProgress - 5);
      if (finalOpponentProgress < 0) finalOpponentProgress = Math.floor(Math.random() * 70); // Random value if negative
    } else {
      // If opponent won, they should have 100% progress
      finalOpponentProgress = 100;
    }

    // Ensure user progress is at least 10% if they won
    const finalUserProgress = userWon && userProgress < 10 ? 100 : userProgress;

    // Save result to localStorage
    const result = {
      battleId,
      battleTitle: battle?.title || '1v1 Coding Battle',
      userWon,
      opponentName: opponent?.name || 'Unknown',
      problem: problem?.title || 'Two Sum', // Ensure problem title is always defined
      userProgress: finalUserProgress,
      opponentProgress: finalOpponentProgress,
      timeSpent: Math.max(60, timeLeft > 0 ? (battleDuration - timeLeft) : battleDuration), // Ensure at least 60 seconds
      completedAt,
      battleCompleted: true, // Flag to indicate the battle is completed
      forcedResult: forceEnd // Flag to indicate if this was a forced end
    };

    localStorage.setItem(`battleResult_${battleId}`, JSON.stringify(result));

    // Update the battle status in localStorage
    if (battle) {
      const updatedBattle = {
        ...battle,
        status: 'completed',
        endTime: completedAt,
        completed: true
      };
      localStorage.setItem('currentBattle', JSON.stringify(updatedBattle));
    }

    // Show result modal or navigate to results page
    setTimeout(() => {
      navigate(`/battle/${battleId}/results`);
    }, 5000); // Increased to 5 seconds to give users time to see the result
  };

  const sendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message = {
      id: Date.now(),
      sender: 'You',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, message]);
    setNewMessage('');

    // Simulate opponent response
    setTimeout(() => {
      const responses = [
        "I'm still working on this problem.",
        "This is challenging!",
        "How are you approaching this?",
        "I think I'm getting close.",
        "Good luck!"
      ];

      const opponentMessage = {
        id: Date.now() + 1,
        sender: opponent?.name || 'Opponent',
        text: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setChatMessages(prev => [...prev, opponentMessage]);
    }, 2000);
  };

  const toggleFullScreen = () => {
    setShowFullScreen(!showFullScreen);
  };

  if (loading) {
    return (
      <div className="battle-arena-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading battle arena...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`battle-arena-container ${showFullScreen ? 'fullscreen' : ''}`}>
      <div className="battle-header">
        <div className="battle-info">
          <h1>{battle?.title || '1v1 Coding Battle'}</h1>
          <div className="battle-meta">
            <span className="difficulty">{battle?.difficulty || 'Medium'}</span>
            <span className="category">{battle?.category || 'Algorithms'}</span>
            <span className="timer">Time Left: {formatTime(timeLeft)}</span>
            {battle?.originalDuration && (
              <span className="duration">Original Duration: {battle.originalDuration} mins</span>
            )}
            {isFriendBattle && (
              <span className="friend-battle-badge">
                <span className="friend-icon">👥</span> Friend Battle
              </span>
            )}
          </div>
        </div>
        <div className="battle-actions">
          <button className="fullscreen-btn" onClick={toggleFullScreen}>
            {showFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
          </button>
        </div>
      </div>

      <div className="battle-progress-container">
        <div className="player-progress">
          <div className="player-info">
            <span className="player-name">You</span>
            <span className="progress-percentage">{Math.round(userProgress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${userProgress}%` }}></div>
          </div>
        </div>

        <div className="vs-indicator">VS</div>

        <div className="player-progress opponent">
          <div className="player-info">
            <span className="player-name">{opponent?.name || 'Opponent'}</span>
            <span className="progress-percentage">{Math.round(opponentProgress)}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${opponentProgress}%` }}></div>
          </div>
        </div>
      </div>

      <div className="battle-content">
        <div className="problem-section">
          <div className="problem-header">
            <h2>{problem?.title || 'Problem Title'}</h2>
            <div className="problem-difficulty">{problem?.difficulty || 'Medium'}</div>
          </div>

          <div className="problem-description">
            <p>{problem?.description}</p>

            <div className="examples">
              <h3>Examples:</h3>
              {problem?.examples.map((example, index) => (
                <div key={index} className="example">
                  <div className="example-input">
                    <strong>Input:</strong> {example.input}
                  </div>
                  <div className="example-output">
                    <strong>Output:</strong> {example.output}
                  </div>
                  {example.explanation && (
                    <div className="example-explanation">
                      <strong>Explanation:</strong> {example.explanation}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="constraints">
              <h3>Constraints:</h3>
              <ul>
                {problem?.constraints.map((constraint, index) => (
                  <li key={index}>{constraint}</li>
                ))}
              </ul>
            </div>

            {showHint && (
              <div className="hints">
                <h3>Hints:</h3>
                <ul>
                  {problem?.hints.map((hint, index) => (
                    <li key={index}>{hint}</li>
                  ))}
                </ul>
              </div>
            )}

            {!showHint && (
              <button className="hint-btn" onClick={() => setShowHint(true)}>
                Show Hints
              </button>
            )}

            {showSolution && (
              <div className="solution">
                <h3>Solution:</h3>
                <pre>{problem?.solution}</pre>
              </div>
            )}
          </div>
        </div>

        <div className="code-section">
          <div className="code-header">
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="language-select"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
            </select>

            <div className="code-actions">
              <button
                className="run-btn"
                onClick={runCode}
                disabled={isRunning || isSubmitting}
              >
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button
                className="submit-btn"
                onClick={submitSolution}
                disabled={isRunning || isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit Solution'}
              </button>
              <button
                className="complete-battle-btn"
                onClick={() => endBattle(true)}
                disabled={battleEnded}
              >
                Complete Battle
              </button>
            </div>
          </div>

          <div className="code-editor">
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="code-textarea"
              spellCheck="false"
            />
          </div>

          <div className="test-results">
            <h3>Test Results:</h3>
            {testResults.length > 0 ? (
              <div className="results-list">
                {testResults.map((result, index) => (
                  <div
                    key={index}
                    className={`result-item ${result.passed ? 'passed' : 'failed'}`}
                  >
                    <div className="result-header">
                      <span className="test-number">Test {index + 1}</span>
                      <span className="result-status">
                        {result.passed ? 'Passed' : 'Failed'}
                      </span>
                    </div>
                    <div className="result-details">
                      <div className="result-input">
                        <strong>Input:</strong> {result.input}
                      </div>
                      <div className="result-expected">
                        <strong>Expected:</strong> {result.expectedOutput}
                      </div>
                      <div className="result-actual">
                        <strong>Your Output:</strong> {result.actualOutput}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-results">
                Run your code to see test results
              </div>
            )}
          </div>
        </div>

        <div className="chat-section">
          <div className="chat-header">
            <h3>Battle Chat</h3>
            {isFriendBattle && (
              <div className="friend-battle-chat-badge">
                <span className="friend-icon">👥</span> Friend Battle Chat
              </div>
            )}
          </div>

          <div className="chat-messages">
            {chatMessages.length > 0 ? (
              chatMessages.map(message => (
                <div
                  key={message.id}
                  className={`chat-message ${message.sender === 'You' ? 'user' : 'opponent'}`}
                >
                  <div className="message-header">
                    <span className="message-sender">{message.sender}</span>
                    <span className="message-time">{message.timestamp}</span>
                  </div>
                  <div className="message-text">{message.text}</div>
                </div>
              ))
            ) : (
              <div className="no-messages">
                {isFriendBattle
                  ? "Chat with your friend while you solve the problem together!"
                  : "No messages yet. Start the conversation!"}
              </div>
            )}
          </div>

          <form className="chat-input" onSubmit={sendMessage}>
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              disabled={battleEnded}
            />
            <button type="submit" disabled={!newMessage.trim() || battleEnded}>
              Send
            </button>
          </form>
        </div>
      </div>

      {battleEnded && (
        <div className="battle-ended-overlay">
          <div className="battle-result">
            <div className="result-icon">{userProgress >= opponentProgress ? '🏆' : '🔄'}</div>
            <h2>{userProgress >= opponentProgress ? 'You Won!' : 'You Lost!'}</h2>
            <div className="battle-stats">
              <div className="stat-item">
                <span className="stat-label">Your Progress:</span>
                <span className="stat-value">{Math.round(userProgress)}%</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Opponent Progress:</span>
                <span className="stat-value">{Math.round(opponentProgress)}%</span>
              </div>
            </div>
            <p className="result-message">
              {userProgress >= opponentProgress
                ? "Congratulations! You've successfully completed the challenge faster than your opponent."
                : "Good effort! Your opponent completed the challenge first, but you can try again."}
            </p>
            <div className="loading-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
            <p className="redirect-message">Redirecting to results page...</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default CodingBattleArena;
