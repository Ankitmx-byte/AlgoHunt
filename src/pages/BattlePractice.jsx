import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import './BattlePractice.css';
import '../styles/animations.css';

function BattlePractice() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showHint, setShowHint] = useState(false);
  const [showSolution, setShowSolution] = useState(false);
  const [activeTab, setActiveTab] = useState('problem');
  const [showFullScreen, setShowFullScreen] = useState(false);
  const [difficulty, setDifficulty] = useState('all');
  const [category, setCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [cameraActive, setCameraActive] = useState(false);
  const [videoStream, setVideoStream] = useState(null);
  const [feedbackActive, setFeedbackActive] = useState(false);
  const [feedback, setFeedback] = useState([]);
  const videoRef = React.useRef(null);

  useEffect(() => {
    // Load practice problems
    loadProblems();
  }, []);

  useEffect(() => {
    // Clean up video stream when component unmounts
    return () => {
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [videoStream]);

  const loadProblems = () => {
    // In a real app, this would fetch from an API
    // For now, we'll use mock problems
    setTimeout(() => {
      const mockProblems = [
        {
          id: 1,
          title: "Two Sum",
          difficulty: "Easy",
          category: "Arrays",
          description: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
          examples: [
            {
              input: "nums = [2,7,11,15], target = 9",
              output: "[0,1]",
              explanation: "Because nums[0] + nums[1] == 9, we return [0, 1]."
            }
          ],
          constraints: [
            "2 <= nums.length <= 10^4",
            "-10^9 <= nums[i] <= 10^9",
            "-10^9 <= target <= 10^9",
            "Only one valid answer exists."
          ],
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
}`,
          testCases: [
            { input: "twoSum([2,7,11,15], 9)", expectedOutput: "[0,1]" },
            { input: "twoSum([3,2,4], 6)", expectedOutput: "[1,2]" },
            { input: "twoSum([3,3], 6)", expectedOutput: "[0,1]" }
          ]
        },
        {
          id: 2,
          title: "Valid Parentheses",
          difficulty: "Easy",
          category: "Stacks",
          description: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
          examples: [
            {
              input: "s = \"()\"",
              output: "true"
            },
            {
              input: "s = \"()[]{}\"",
              output: "true"
            },
            {
              input: "s = \"(]\"",
              output: "false"
            }
          ],
          constraints: [
            "1 <= s.length <= 10^4",
            "s consists of parentheses only '()[]{}'."
          ],
          hints: [
            "Use a stack to keep track of opening brackets.",
            "When you encounter a closing bracket, check if it matches the most recent opening bracket."
          ],
          solution: `function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '[': ']',
    '{': '}'
  };
  
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) {
      stack.push(s[i]);
    } else {
      const last = stack.pop();
      if (map[last] !== s[i]) {
        return false;
      }
    }
  }
  
  return stack.length === 0;
}`,
          testCases: [
            { input: "isValid(\"()\")", expectedOutput: "true" },
            { input: "isValid(\"()[]{}\")", expectedOutput: "true" },
            { input: "isValid(\"(]\")", expectedOutput: "false" },
            { input: "isValid(\"([)]\")", expectedOutput: "false" },
            { input: "isValid(\"{[]}\")", expectedOutput: "true" }
          ]
        },
        {
          id: 3,
          title: "Reverse Linked List",
          difficulty: "Medium",
          category: "Linked Lists",
          description: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
          examples: [
            {
              input: "head = [1,2,3,4,5]",
              output: "[5,4,3,2,1]"
            },
            {
              input: "head = [1,2]",
              output: "[2,1]"
            },
            {
              input: "head = []",
              output: "[]"
            }
          ],
          constraints: [
            "The number of nodes in the list is the range [0, 5000].",
            "-5000 <= Node.val <= 5000"
          ],
          hints: [
            "Use three pointers: previous, current, and next.",
            "Iterate through the list, reversing each pointer."
          ],
          solution: `function reverseList(head) {
  let prev = null;
  let current = head;
  
  while (current !== null) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev;
}`,
          testCases: [
            { input: "Linked list visualization not available in this demo", expectedOutput: "Reversed linked list" }
          ]
        }
      ];
      
      setProblems(mockProblems);
      setLoading(false);
    }, 1000);
  };

  const selectProblem = (problem) => {
    setSelectedProblem(problem);
    
    // Set initial code template
    if (language === 'javascript') {
      setCode(`function ${problem.title.replace(/\s+/g, '')}(${problem.title.includes('Two Sum') ? 'nums, target' : problem.title.includes('Valid Parentheses') ? 's' : 'head'}) {
  // Your solution here
}`);
    }
    
    // Reset states
    setTestResults([]);
    setShowHint(false);
    setShowSolution(false);
    setActiveTab('problem');
  };

  const runCode = () => {
    setIsRunning(true);
    
    // Simulate code execution
    setTimeout(() => {
      // In a real app, this would actually execute the code
      // For now, we'll simulate results
      if (selectedProblem) {
        const results = selectedProblem.testCases.map(test => ({
          input: test.input,
          expectedOutput: test.expectedOutput,
          actualOutput: Math.random() > 0.3 ? test.expectedOutput : "Error or incorrect output", // Randomly simulate some failures
          passed: Math.random() > 0.3
        }));
        
        setTestResults(results);
      }
      
      setIsRunning(false);
    }, 1500);
  };

  const submitSolution = () => {
    setIsSubmitting(true);
    
    // Simulate submission
    setTimeout(() => {
      runCode();
      setIsSubmitting(false);
      
      // Show solution after submission
      setShowSolution(true);
    }, 2000);
  };

  const toggleFullScreen = () => {
    setShowFullScreen(!showFullScreen);
  };

  const filteredProblems = problems.filter(problem => {
    // Filter by difficulty
    if (difficulty !== 'all' && problem.difficulty.toLowerCase() !== difficulty.toLowerCase()) {
      return false;
    }
    
    // Filter by category
    if (category !== 'all' && problem.category.toLowerCase() !== category.toLowerCase()) {
      return false;
    }
    
    // Filter by search term
    if (searchTerm && !problem.title.toLowerCase().includes(searchTerm.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  const toggleCamera = async () => {
    if (cameraActive) {
      // Stop camera
      if (videoStream) {
        videoStream.getTracks().forEach(track => track.stop());
      }
      setCameraActive(false);
      setVideoStream(null);
      setFeedbackActive(false);
      setFeedback([]);
    } else {
      try {
        // Start camera
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        setVideoStream(stream);
        setCameraActive(true);
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        
        // Start feedback after camera is on
        startFeedbackAnalysis();
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Could not access camera. Please check permissions.");
      }
    }
  };

  const startFeedbackAnalysis = () => {
    setFeedbackActive(true);
    
    // Simulate AI feedback
    const feedbackInterval = setInterval(() => {
      if (!cameraActive) {
        clearInterval(feedbackInterval);
        return;
      }
      
      const possibleFeedback = [
        { type: 'posture', message: 'Great posture! Keep it up.', positive: true },
        { type: 'focus', message: 'You seem distracted. Try to focus on the problem.', positive: false },
        { type: 'engagement', message: 'Good engagement with the problem!', positive: true },
        { type: 'stress', message: 'You appear stressed. Take a deep breath.', positive: false },
        { type: 'confidence', message: 'You look confident in your approach!', positive: true }
      ];
      
      const newFeedback = possibleFeedback[Math.floor(Math.random() * possibleFeedback.length)];
      
      setFeedback(prev => {
        // Keep only the last 3 feedback items
        const updated = [...prev, { ...newFeedback, id: Date.now() }];
        if (updated.length > 3) {
          return updated.slice(updated.length - 3);
        }
        return updated;
      });
    }, 10000); // New feedback every 10 seconds
    
    return () => clearInterval(feedbackInterval);
  };

  if (loading) {
    return (
      <div className="battle-practice-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading practice problems...</div>
        </div>
      </div>
    );
  }

  return (
    <div className={`battle-practice-container ${showFullScreen ? 'fullscreen' : ''}`}>
      <ScrollReveal animation="fade-in-down">
        <div className="practice-header">
          <h1 className="animated-gradient">Practice Mode</h1>
          <p>Sharpen your skills with coding challenges</p>
          
          <div className="practice-actions">
            <button
              className={`camera-btn ${cameraActive ? 'active' : ''}`}
              onClick={toggleCamera}
            >
              {cameraActive ? 'Stop Camera' : 'Start Camera'}
              {cameraActive && <span className="recording-indicator"></span>}
            </button>
            
            <button className="fullscreen-btn" onClick={toggleFullScreen}>
              {showFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
            </button>
          </div>
        </div>
      </ScrollReveal>

      <div className="practice-content">
        {!selectedProblem ? (
          <ScrollReveal animation="fade-in-up" delay={0.2}>
            <div className="problem-selection">
              <div className="selection-filters">
                <div className="search-bar">
                  <input
                    type="text"
                    placeholder="Search problems..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="filter-options">
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <option value="all">All Difficulties</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                  
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="all">All Categories</option>
                    <option value="arrays">Arrays</option>
                    <option value="strings">Strings</option>
                    <option value="linked lists">Linked Lists</option>
                    <option value="stacks">Stacks</option>
                    <option value="trees">Trees</option>
                    <option value="graphs">Graphs</option>
                    <option value="dynamic programming">Dynamic Programming</option>
                  </select>
                </div>
              </div>
              
              <div className="problems-list">
                {filteredProblems.length > 0 ? (
                  filteredProblems.map(problem => (
                    <div
                      key={problem.id}
                      className="problem-card hover-lift card-shine"
                      onClick={() => selectProblem(problem)}
                    >
                      <h3>{problem.title}</h3>
                      <div className="problem-meta">
                        <span className={`difficulty ${problem.difficulty.toLowerCase()}`}>
                          {problem.difficulty}
                        </span>
                        <span className="category">{problem.category}</span>
                      </div>
                      <p>{problem.description.substring(0, 100)}...</p>
                      <button className="start-problem-btn btn-primary">
                        Start Problem
                        <span className="btn-glow"></span>
                      </button>
                    </div>
                  ))
                ) : (
                  <div className="no-problems">
                    <p>No problems match your filters. Try adjusting your search criteria.</p>
                  </div>
                )}
              </div>
            </div>
          </ScrollReveal>
        ) : (
          <div className="problem-workspace">
            <div className="workspace-sidebar">
              <div className="workspace-tabs">
                <button
                  className={activeTab === 'problem' ? 'active' : ''}
                  onClick={() => setActiveTab('problem')}
                >
                  Problem
                </button>
                <button
                  className={activeTab === 'solution' ? 'active' : ''}
                  onClick={() => setActiveTab('solution')}
                >
                  Solution
                </button>
                <button
                  className={activeTab === 'submissions' ? 'active' : ''}
                  onClick={() => setActiveTab('submissions')}
                >
                  Submissions
                </button>
              </div>
              
              <div className="tab-content">
                {activeTab === 'problem' && (
                  <div className="problem-description">
                    <h2>{selectedProblem.title}</h2>
                    <div className="problem-meta">
                      <span className={`difficulty ${selectedProblem.difficulty.toLowerCase()}`}>
                        {selectedProblem.difficulty}
                      </span>
                      <span className="category">{selectedProblem.category}</span>
                    </div>
                    
                    <p>{selectedProblem.description}</p>
                    
                    <div className="examples">
                      <h3>Examples:</h3>
                      {selectedProblem.examples.map((example, index) => (
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
                        {selectedProblem.constraints.map((constraint, index) => (
                          <li key={index}>{constraint}</li>
                        ))}
                      </ul>
                    </div>
                    
                    {showHint && (
                      <div className="hints">
                        <h3>Hints:</h3>
                        <ul>
                          {selectedProblem.hints.map((hint, index) => (
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
                  </div>
                )}
                
                {activeTab === 'solution' && (
                  <div className="solution-content">
                    <h3>Solution</h3>
                    {showSolution ? (
                      <pre className="solution-code">{selectedProblem.solution}</pre>
                    ) : (
                      <div className="solution-locked">
                        <p>Submit your solution first to unlock the official solution.</p>
                        <button
                          className="unlock-btn btn-primary"
                          onClick={() => setShowSolution(true)}
                        >
                          Unlock Solution
                          <span className="btn-glow"></span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
                
                {activeTab === 'submissions' && (
                  <div className="submissions-content">
                    <h3>Your Submissions</h3>
                    {testResults.length > 0 ? (
                      <div className="submission-history">
                        <div className="submission-item">
                          <div className="submission-header">
                            <span className="submission-time">Just now</span>
                            <span className={`submission-status ${testResults.every(r => r.passed) ? 'accepted' : 'failed'}`}>
                              {testResults.every(r => r.passed) ? 'Accepted' : 'Failed'}
                            </span>
                          </div>
                          <div className="submission-details">
                            <div className="submission-language">Language: {language}</div>
                            <div className="submission-runtime">Runtime: 56 ms</div>
                            <div className="submission-memory">Memory: 42.1 MB</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <p>No submissions yet. Run your code to see results here.</p>
                    )}
                  </div>
                )}
              </div>
              
              <div className="sidebar-actions">
                <button
                  className="back-btn"
                  onClick={() => setSelectedProblem(null)}
                >
                  Back to Problems
                </button>
              </div>
            </div>
            
            <div className="code-workspace">
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
                    className="submit-btn btn-primary"
                    onClick={submitSolution}
                    disabled={isRunning || isSubmitting}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Solution'}
                    <span className="btn-glow"></span>
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
          </div>
        )}
      </div>
      
      {cameraActive && (
        <div className="camera-feedback-container">
          <div className="camera-preview">
            <video
              ref={videoRef}
              autoPlay
              muted
              className="camera-video"
            />
          </div>
          
          {feedbackActive && (
            <div className="feedback-panel">
              <h3>AI Interview Feedback</h3>
              <div className="feedback-list">
                {feedback.length > 0 ? (
                  feedback.map(item => (
                    <div
                      key={item.id}
                      className={`feedback-item ${item.positive ? 'positive' : 'negative'}`}
                    >
                      <div className="feedback-type">{item.type}</div>
                      <div className="feedback-message">{item.message}</div>
                    </div>
                  ))
                ) : (
                  <div className="no-feedback">
                    Analyzing your performance...
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default BattlePractice;
