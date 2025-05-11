import React, { useState, useEffect, useCallback, useRef } from 'react';
import './CodingBattle.css';
import { useParams, useNavigate } from 'react-router-dom';
import AntiCheatingMonitor from '../components/AntiCheatingMonitor';
import antiCheatingService from '../services/AntiCheatingService';
import CodeEditor from '../components/CodeEditor';
import CompilerOutput from '../components/CompilerOutput';
import codeCompilerService from '../services/CodeCompilerService';
// Temporarily use a textarea instead of Monaco Editor
// import Editor from '@monaco-editor/react';

function CodingBattle({ isDemoMode = false }) {
  const { battleId } = useParams();
  const navigate = useNavigate();
  // Editor reference (commented out as not currently used)
  // const editorRef = useRef(null);

  // State for battle
  const [battleState, setBattleState] = useState({
    status: 'waiting', // waiting, active, completed
    problem: null,
    opponent: null,
    userCode: '',
    userProgress: 0,
    opponentProgress: 0,
    winner: null,
    timeRemaining: 1800 // 30 minutes in seconds
  });

  // State for UI
  const [currentView, setCurrentView] = useState(isDemoMode ? 'battle' : 'matchmaking');
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  // These state variables are defined but not currently used in the component
  const [selectedDifficulty] = useState('medium');
  const [selectedCategory] = useState('algorithms');
  const [, setShowMatchmakingModal] = useState(!isDemoMode);
  const [showHint, setShowHint] = useState(false);
  const [showAiInsights, setShowAiInsights] = useState(false);
  const [testCases, setTestCases] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Anti-cheating state
  const [antiCheatingEnabled, setAntiCheatingEnabled] = useState(!isDemoMode);
  const [showCheatingWarning, setShowCheatingWarning] = useState(false);

  // Compiler state
  const [compilerOutput, setCompilerOutput] = useState(null);
  const [compilerError, setCompilerError] = useState(null);
  const [isCompiling, setIsCompiling] = useState(false);
  const [showCompilerOutput, setShowCompilerOutput] = useState(false);
  const [editorTheme] = useState('vs-dark');

  // Editor themes (commented out as not currently used)
  // const editorThemes = {
  //   javascript: 'vs-dark',
  //   python: 'vs-dark',
  //   java: 'vs-dark',
  //   cpp: 'vs-dark',
  //   csharp: 'vs-dark'
  // };

  // Get default starter code for selected language
  const getDefaultStarterCode = (language) => {
    if (!language) return '';

    const defaultCode = {
      javascript: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  // Your code here\n}",
      python: "def two_sum(nums, target):\n    # Your code here\n    pass",
      java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{0, 0};\n    }\n}",
      cpp: "#include <vector>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        // Your code here\n        return {0, 0};\n    }\n};",
      csharp: "public class Solution {\n    public int[] TwoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{0, 0};\n    }\n}"
    };

    return defaultCode[language] || '';
  };

  // Timer for countdown
  const timerIntervalRef = useRef(null);

  const startTimer = useCallback(() => {
    timerIntervalRef.current = setInterval(() => {
      setBattleState(prev => {
        if (prev.timeRemaining <= 0) {
          clearInterval(timerIntervalRef.current);
          return { ...prev, status: 'completed' };
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 };
      });
    }, 1000);
  }, []);

  // Simulate AI opponent progress
  const startAIOpponentSimulation = useCallback(() => {
    const progressInterval = setInterval(() => {
      setBattleState(prev => {
        const newProgress = Math.min(prev.opponentProgress + Math.random() * 5, 100);

        // If AI reaches 100%, they win
        if (newProgress >= 100 && prev.userProgress < 100) {
          clearInterval(progressInterval);
          return {
            ...prev,
            opponentProgress: 100,
            status: 'completed',
            winner: 'opponent'
          };
        }

        return {
          ...prev,
          opponentProgress: newProgress
        };
      });
    }, 3000);

    // Clean up interval after 5 minutes (simulating max battle time)
    setTimeout(() => {
      clearInterval(progressInterval);
    }, 300000);
  }, []);

  // Fallback to demo battle if no battle info is found
  const fallbackToDemoBattle = useCallback(() => {
    console.warn('No battle info found, falling back to demo battle');

    // Mock battle data
    setBattleState({
      status: 'active',
      problem: {
        id: 1,
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        difficulty: 'medium',
        category: 'algorithms',
        starterCode: {
          javascript: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  // Your code here\n}",
          python: "def two_sum(nums, target):\n    # Your code here\n    pass",
          java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{0, 0};\n    }\n}",
          cpp: "#include <vector>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        // Your code here\n        return {0, 0};\n    }\n};",
          csharp: "public class Solution {\n    public int[] TwoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{0, 0};\n    }\n}"
        }
      },
      opponent: {
        name: "JohnDoe123",
        rating: 1750,
        winRate: "68%",
        preferredLanguage: "JavaScript",
        skillLevel: "Intermediate",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      userCode: getDefaultStarterCode(selectedLanguage),
      userProgress: 0,
      opponentProgress: 0,
      winner: null,
      timeRemaining: 1800
    });

    setTestCases([
      {
        id: 1,
        input: "[2, 7, 11, 15], 9",
        expectedOutput: "[0,1]"
      },
      {
        id: 2,
        input: "[3, 2, 4], 6",
        expectedOutput: "[1,2]"
      },
      {
        id: 3,
        input: "[3, 3], 6",
        expectedOutput: "[0,1]"
      }
    ]);

    setCurrentView('battle');
    startTimer();
  }, [selectedLanguage, startTimer]);

  // Fetch battle details from API
  const fetchBattleDetails = useCallback(() => {
    // In a real implementation, this would fetch battle details from an API
    // For now, we'll use the battle info stored in localStorage

    // Check if we have battle info in localStorage
    const battleInfoStr = localStorage.getItem('currentBattle');
    const opponentStr = localStorage.getItem('currentOpponent');

    if (battleInfoStr) {
      try {
        const battleInfo = JSON.parse(battleInfoStr);
        const opponent = opponentStr ? JSON.parse(opponentStr) : null;

        // Calculate time remaining based on start time
        const startTime = battleInfo.startTime || Date.now();
        const elapsedSeconds = Math.floor((Date.now() - startTime) / 1000);
        const timeRemaining = Math.max(1800 - elapsedSeconds, 0); // 30 minutes max

        // Set battle state
        setBattleState({
          status: 'active',
          problem: {
            id: 1,
            title: "Two Sum",
            description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
            difficulty: battleInfo.difficulty || 'medium',
            category: battleInfo.category || 'algorithms',
            starterCode: {
              javascript: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  // Your code here\n}",
              python: "def two_sum(nums, target):\n    # Your code here\n    pass",
              java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{0, 0};\n    }\n}",
              cpp: "#include <vector>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        // Your code here\n        return {0, 0};\n    }\n};",
              csharp: "public class Solution {\n    public int[] TwoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{0, 0};\n    }\n}"
            }
          },
          opponent: opponent || {
            name: "JohnDoe123",
            rating: 1750,
            winRate: "68%",
            preferredLanguage: "JavaScript",
            skillLevel: "Intermediate",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg"
          },
          userCode: getDefaultStarterCode(selectedLanguage),
          userProgress: 0,
          opponentProgress: 0,
          winner: null,
          timeRemaining: timeRemaining
        });

        setTestCases([
          {
            id: 1,
            input: "[2, 7, 11, 15], 9",
            expectedOutput: "[0,1]"
          },
          {
            id: 2,
            input: "[3, 2, 4], 6",
            expectedOutput: "[1,2]"
          },
          {
            id: 3,
            input: "[3, 3], 6",
            expectedOutput: "[0,1]"
          }
        ]);

        setCurrentView('battle');
        startTimer();

        // Clear the localStorage items after successful initialization
        // This prevents old battle data from being reused
        if (!isDemoMode) {
          setTimeout(() => {
            localStorage.removeItem('currentBattle');
            localStorage.removeItem('currentOpponent');
          }, 5000);
        }
      } catch (error) {
        console.error('Error parsing battle info:', error);
        fallbackToDemoBattle();
      }
    } else {
      // If no battle info is found, fall back to demo battle
      fallbackToDemoBattle();
    }
  }, [selectedLanguage, startTimer, isDemoMode, fallbackToDemoBattle]);

  // Start demo mode with AI opponent
  const startDemoMode = useCallback(() => {
    console.log("Starting Practice Mode...");

    // Hide matchmaking modal if open
    setShowMatchmakingModal(false);

    // Set current view to battle
    setCurrentView('battle');

    // Initialize a demo battle with a sample problem
    setBattleState({
      status: 'active',
      problem: {
        id: 1,
        title: "Two Sum",
        description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.\n\nYou can return the answer in any order.",
        difficulty: selectedDifficulty || 'medium',
        category: selectedCategory || 'algorithms',
        starterCode: {
          javascript: "/**\n * @param {number[]} nums\n * @param {number} target\n * @return {number[]}\n */\nfunction twoSum(nums, target) {\n  // Your code here\n}",
          python: "def two_sum(nums, target):\n    # Your code here\n    pass",
          java: "class Solution {\n    public int[] twoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{0, 0};\n    }\n}",
          cpp: "#include <vector>\n\nclass Solution {\npublic:\n    std::vector<int> twoSum(std::vector<int>& nums, int target) {\n        // Your code here\n        return {0, 0};\n    }\n};",
          csharp: "public class Solution {\n    public int[] TwoSum(int[] nums, int target) {\n        // Your code here\n        return new int[]{0, 0};\n    }\n}"
        }
      },
      opponent: {
        name: "AI Opponent",
        rating: 1800,
        winRate: "75%",
        preferredLanguage: "Python",
        skillLevel: "Adaptive",
        avatar: "https://randomuser.me/api/portraits/lego/1.jpg"
      },
      userCode: getDefaultStarterCode(selectedLanguage || 'javascript'),
      userProgress: 0,
      opponentProgress: 0,
      winner: null,
      timeRemaining: 1800
    });

    // Set demo test cases
    setTestCases([
      {
        id: 1,
        input: "[2, 7, 11, 15], 9",
        expectedOutput: "[0,1]"
      },
      {
        id: 2,
        input: "[3, 2, 4], 6",
        expectedOutput: "[1,2]"
      },
      {
        id: 3,
        input: "[3, 3], 6",
        expectedOutput: "[0,1]"
      }
    ]);

    // Start timer
    startTimer();

    // Simulate AI opponent progress updates
    startAIOpponentSimulation();
  }, [selectedLanguage, selectedDifficulty, selectedCategory, startTimer, startAIOpponentSimulation]);

  // Start matchmaking
  const startMatchmaking = useCallback(() => {
    console.log("Starting matchmaking...");
    setShowMatchmakingModal(false);

    // Simulate matchmaking
    setTimeout(() => {
      fetchBattleDetails();
    }, 2000);
  }, [fetchBattleDetails]);

  // Initialize battle or demo mode
  useEffect(() => {
    console.log("CodingBattle component mounted, isDemoMode:", isDemoMode);

    if (isDemoMode) {
      console.log("Starting demo mode automatically");
      startDemoMode();
    } else if (battleId) {
      // Check if user is registered for this battle
      const registeredBattles = JSON.parse(localStorage.getItem('registeredBattles') || '[]');
      const battleIdNum = parseInt(battleId, 10);

      // Check if this battle is in the registered battles list or if there's a current battle in localStorage
      const currentBattleStr = localStorage.getItem('currentBattle');
      const isBattleInProgress = currentBattleStr && JSON.parse(currentBattleStr).id === battleIdNum;

      if (registeredBattles.includes(battleIdNum) || isBattleInProgress) {
        // Fetch battle details from API
        fetchBattleDetails();
      } else {
        // If not registered, show a message and redirect to battles page
        console.warn("Not registered for battle:", battleIdNum);
        alert("You are not registered for this battle. Please register first.");
        navigate('/battles');
      }
    }

    // Cleanup timer on unmount
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
    };
  }, [isDemoMode, battleId, fetchBattleDetails, startDemoMode, navigate]);



  // Handle editor mount (commented out as not currently used)
  // const handleEditorDidMount = (editor, monaco) => {
  //   editorRef.current = editor;
  // };

  // Handle editor change
  const handleEditorChange = (value) => {
    setBattleState(prev => ({
      ...prev,
      userCode: value
    }));

    // Take code snapshot for anti-cheating analysis
    if (antiCheatingEnabled && !isDemoMode) {
      antiCheatingService.takeCodeSnapshot(value);
    }
  };

  // Handle anti-cheating violations
  const handleCheatingViolation = (violations) => {
    setShowCheatingWarning(true);

    // Log the violation
    console.warn('Anti-cheating violation detected:', violations);

    // In a real implementation, this would report to the server
    // and potentially take action based on the severity
  };

  // Submit code for testing
  const submitCode = async () => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    setIsCompiling(true);
    setCompilerError(null);
    setShowCompilerOutput(true);

    try {
      // Execute the code with the test cases
      const executionResult = await codeCompilerService.executeCode(
        battleState.userCode,
        selectedLanguage,
        testCases
      );

      if (!executionResult.success) {
        // Handle compilation or execution error
        setCompilerError(executionResult.error);
        setCompilerOutput(null);
        return;
      }

      // Set the compiler output
      setCompilerOutput(executionResult.results);

      // Calculate progress based on passing tests
      const passedCount = executionResult.results.filter(r => r.passed).length;
      const progress = (passedCount / testCases.length) * 100;

      // Update battle state
      setBattleState(prev => {
        const newState = {
          ...prev,
          userProgress: progress
        };

        // Check if user won
        if (progress >= 100 && prev.opponentProgress < 100) {
          newState.status = 'completed';
          newState.winner = 'user';
        }

        return newState;
      });

      // If this is a real battle (not demo mode), send results to opponent
      if (!isDemoMode) {
        // In a real implementation, this would send the results to the server
        console.log('Sending results to opponent:', executionResult);

        // Simulate opponent progress update
        if (Math.random() > 0.7) { // 30% chance opponent makes progress
          const opponentProgress = Math.min(
            battleState.opponentProgress + Math.random() * 30,
            100
          );

          setBattleState(prev => ({
            ...prev,
            opponentProgress
          }));

          // Check if opponent won
          if (opponentProgress >= 100) {
            setBattleState(prev => ({
              ...prev,
              status: 'completed',
              winner: 'opponent'
            }));
          }
        }
      }
    } catch (error) {
      console.error('Error executing code:', error);
      setCompilerError('An unexpected error occurred while executing your code.');
    } finally {
      setIsSubmitting(false);
      setIsCompiling(false);
    }
  };

  // Format time remaining
  const formatTimeRemaining = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Render matchmaking view
  const renderMatchmakingView = () => (
    <div className="coding-battle-main-menu">
      <h1>Coding Battle</h1>
      <p className="main-subtitle">Challenge your coding skills in real-time battles</p>

      <div className="battle-mode-cards">
        <div className="mode-card">
          <div className="mode-icon">🏆</div>
          <h2>Competitive Mode</h2>
          <p>Challenge real opponents in a timed coding battle. Solve problems faster to win!</p>
          <button className="mode-button competitive" onClick={startMatchmaking}>
            Find Opponent
          </button>
        </div>

        <div className="mode-card practice-card">
          <div className="mode-icon">🏋️</div>
          <h2>Practice Mode</h2>
          <p>Sharpen your skills with AI opponents. Perfect for beginners and pros alike.</p>
          <button className="mode-button practice" onClick={startDemoMode}>
            Start Practice
          </button>
        </div>
      </div>

      <div className="battle-stats">
        <div className="stat">
          <span className="stat-number">10,000+</span>
          <span className="stat-label">Active Coders</span>
        </div>
        <div className="stat">
          <span className="stat-number">500+</span>
          <span className="stat-label">Coding Problems</span>
        </div>
        <div className="stat">
          <span className="stat-number">50,000+</span>
          <span className="stat-label">Battles Completed</span>
        </div>
      </div>

      {/* Floating Practice Mode Button */}
      <button id="floating-practice-button" onClick={startDemoMode}>
        🏋️ PRACTICE MODE
      </button>
    </div>
  );

  // Render battle interface
  const renderBattleInterface = () => (
    <div className="battle-container">
      {isDemoMode && (
        <div className="practice-mode-banner">
          Practice Mode - Sharpen your skills at your own pace
        </div>
      )}

      {!isDemoMode && (
        <button
          className="practice-mode-button"
          onClick={() => navigate('/battle/practice')}
        >
          Switch to Practice Mode
        </button>
      )}

      <div className="battle-header">
        <div className="problem-info">
          <h2>{battleState.problem?.title || 'Loading problem...'}</h2>
          <div className="problem-meta">
            <span className={`difficulty ${battleState.problem?.difficulty}`}>
              {battleState.problem?.difficulty}
            </span>
            <span className="category">{battleState.problem?.category}</span>
          </div>
        </div>

        <div className="battle-timer">
          Time: {formatTimeRemaining(battleState.timeRemaining)}
        </div>

        {!isDemoMode && (
          <div className="anti-cheat-toggle">
            <label className="toggle-switch">
              <input
                type="checkbox"
                checked={antiCheatingEnabled}
                onChange={() => setAntiCheatingEnabled(!antiCheatingEnabled)}
              />
              <span className="toggle-slider"></span>
            </label>
            <span className="toggle-label">Anti-Cheating System</span>
          </div>
        )}

        <div className="battle-status">
          <div className="progress-container">
            <div className="user-progress">
              <span className="progress-label">You</span>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{width: `${battleState.userProgress}%`}}
                ></div>
              </div>
              <span className="progress-percent">{Math.round(battleState.userProgress)}%</span>
            </div>

            {battleState.opponent && (
              <div className="opponent-progress">
                <span className="progress-label">{battleState.opponent?.name}</span>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{width: `${battleState.opponentProgress}%`}}
                  ></div>
                </div>
                <span className="progress-percent">{Math.round(battleState.opponentProgress)}%</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Anti-Cheating Monitor (only in competitive mode) */}
      {!isDemoMode && (
        <AntiCheatingMonitor
          battleId={battleId}
          userId="current-user"
          isActive={antiCheatingEnabled}
          onViolation={handleCheatingViolation}
        />
      )}

      {/* Cheating Warning Modal */}
      {showCheatingWarning && (
        <div className="modal-overlay">
          <div className="modal-content warning-modal">
            <h3>⚠️ Fair Play Warning</h3>
            <p>Our anti-cheating system has detected suspicious activity. Please ensure you are following the competition rules:</p>
            <ul className="warning-list">
              <li>Solve problems independently without external help</li>
              <li>Do not copy solutions from other sources</li>
              <li>Stay on the battle page during the competition</li>
              <li>Do not use AI tools or code generators</li>
            </ul>
            <p className="warning-note">Continued violations may result in disqualification.</p>
            <button
              className="close-modal warning-btn"
              onClick={() => setShowCheatingWarning(false)}
            >
              I Understand
            </button>
          </div>
        </div>
      )}

      <div className="battle-content">
        <div className="problem-panel">
          <div className="problem-description">
            <h3>Problem Description</h3>
            <p>{battleState.problem?.description}</p>
          </div>

          <div className="test-cases">
            <h3>Test Cases</h3>
            <div className="test-cases-list">
              {testCases.map(testCase => (
                <div className="test-case" key={testCase.id}>
                  <div className="test-case-input">
                    <strong>Input:</strong> {testCase.input}
                  </div>
                  <div className="test-case-output">
                    <strong>Expected Output:</strong> {testCase.expectedOutput}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {isDemoMode && battleState.opponent && (
            <div className="opponent-info">
              <img
                src={battleState.opponent.avatar}
                alt={battleState.opponent.name}
                className="opponent-avatar"
              />
              <div className="opponent-details">
                <h3>{battleState.opponent.name}</h3>
                <p>Rating: {battleState.opponent.rating}</p>
                <p>Win Rate: {battleState.opponent.winRate}</p>
                <p>Language: {battleState.opponent.preferredLanguage}</p>
              </div>
            </div>
          )}
        </div>

        <div className="editor-panel">
          <div className="editor-header">
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                setBattleState(prev => ({
                  ...prev,
                  userCode: getDefaultStarterCode(e.target.value)
                }));
              }}
              className="language-selector"
            >
              <option value="javascript">JavaScript</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="csharp">C#</option>
            </select>

            <div className="editor-actions-top">
              <button className="reset-code-btn" onClick={() => {
                setBattleState(prev => ({
                  ...prev,
                  userCode: getDefaultStarterCode(selectedLanguage)
                }));
              }}>
                Reset Code
              </button>
            </div>
          </div>

          <div className="editor-container">
            <CodeEditor
              code={battleState.userCode}
              language={selectedLanguage}
              onChange={handleEditorChange}
              theme={editorTheme}
            />
          </div>

          <div className="editor-footer">
            {showCompilerOutput && (
              <CompilerOutput
                results={compilerOutput}
                isLoading={isCompiling}
                error={compilerError}
              />
            )}

            <div className="editor-actions">
              <button
                className="run-button"
                onClick={submitCode}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Running..." : "Run Code"}
              </button>
              <button className="hint-button" onClick={() => setShowHint(true)}>
                Show Hint
              </button>
              <button className="insights-button" onClick={() => setShowAiInsights(true)}>
                Show AI Insights
              </button>
            </div>
          </div>
        </div>
      </div>

      {showHint && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>Hint for Two Sum</h3>
            <p>Consider using a hash map (object in JavaScript) to store the numbers you've seen so far. For each number, check if its complement (target - num) exists in the hash map.</p>
            <p>This approach allows you to find the solution in a single pass through the array.</p>
            <div className="hint-steps">
              <ol>
                <li>Create an empty hash map/object</li>
                <li>Iterate through the array</li>
                <li>For each element, calculate the complement (target - current number)</li>
                <li>Check if the complement exists in the hash map</li>
                <li>If it does, return the indices of the current number and its complement</li>
                <li>If not, add the current number and its index to the hash map</li>
              </ol>
            </div>
            <button className="close-modal" onClick={() => setShowHint(false)}>Close</button>
          </div>
        </div>
      )}

      {showAiInsights && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>AI Insights: Two Sum Problem</h3>
            <p>The Two Sum problem is a classic example where using a hash map can reduce the time complexity from O(n²) to O(n).</p>
            <p>Instead of using nested loops to check every pair, you can use a single pass through the array, storing each number and its index in a hash map.</p>

            <h4>Solution Analysis</h4>
            <div className="solution-analysis">
              <div className="analysis-item">
                <strong>Brute Force Approach:</strong>
                <ul>
                  <li>Use two nested loops to check all possible pairs</li>
                  <li>Time Complexity: O(n²)</li>
                  <li>Space Complexity: O(1)</li>
                </ul>
              </div>

              <div className="analysis-item">
                <strong>Optimized Approach:</strong>
                <ul>
                  <li>Use a hash map to store visited numbers and their indices</li>
                  <li>Time Complexity: O(n)</li>
                  <li>Space Complexity: O(n)</li>
                </ul>
              </div>
            </div>

            <h4>JavaScript Implementation Example</h4>
            <pre className="code-example">
{`function twoSum(nums, target) {
  const map = {};

  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];

    if (map[complement] !== undefined) {
      return [map[complement], i];
    }

    map[nums[i]] = i;
  }

  return null;
}`}
            </pre>

            <button className="close-modal" onClick={() => setShowAiInsights(false)}>Close</button>
          </div>
        </div>
      )}

      {battleState.status === 'completed' && (
        <div className="modal-overlay">
          <div className="modal-content battle-result">
            <h3>{battleState.winner === 'user' ? 'Victory!' : 'Better luck next time!'}</h3>
            <p>{battleState.winner === 'user'
              ? 'Congratulations! You completed the challenge faster than your opponent.'
              : 'Your opponent completed the challenge first. Keep practicing!'}
            </p>
            <div className="result-stats">
              <div className="stat">
                <span className="stat-label">Your Progress</span>
                <span className="stat-value">{Math.round(battleState.userProgress)}%</span>
              </div>
              <div className="stat">
                <span className="stat-label">Opponent Progress</span>
                <span className="stat-value">{Math.round(battleState.opponentProgress)}%</span>
              </div>
            </div>
            <div className="result-actions">
              <button onClick={() => navigate('/battles')}>Back to Battles</button>
              {battleState.winner === 'user' ? (
                <button onClick={() => window.location.reload()}>Try Again</button>
              ) : (
                <button
                  className="practice-mode-result-btn"
                  onClick={() => navigate('/battle/practice')}
                >
                  Try in Practice Mode
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="coding-battle-container">
      {currentView === 'matchmaking' && renderMatchmakingView()}
      {currentView === 'battle' && renderBattleInterface()}
    </div>
  );
}

export default CodingBattle;



