import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './InterviewPrep.css';
import InterviewAnalysisReport from '../components/interview/InterviewAnalysisReport';

function InterviewPrep() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [interviews, setInterviews] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [sessionInProgress, setSessionInProgress] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [currentInterview, setCurrentInterview] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cameraPermission, setCameraPermission] = useState(null);
  const [showDetailedAnalysis, setShowDetailedAnalysis] = useState(false);
  // Practice mode states
  const [practiceMode, setPracticeMode] = useState(false);
  const [activityCapture, setActivityCapture] = useState([]);
  const [practiceTimer, setPracticeTimer] = useState(0);
  const [practiceTimerInterval, setPracticeTimerInterval] = useState(null);

  // Check if user is logged in and initialize
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    } else {
      // Load mock interviews
      loadMockInterviews();
    }

    // Cleanup function to stop all tracks when component unmounts
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, [navigate]);

  // Initialize camera when session starts or when viewing settings
  useEffect(() => {
    if (activeTab === 'settings' || sessionInProgress) {
      // Request camera permission
      requestCameraPermission();
    }
  }, [activeTab, sessionInProgress]);

  // Load mock interviews
  const loadMockInterviews = () => {
    const mockInterviews = [
      {
        id: 1,
        title: 'Frontend Developer Interview',
        jobTitle: 'Senior Frontend Developer',
        company: 'Tech Solutions Inc.',
        interviewType: 'Technical',
        difficulty: 'Senior',
        duration: 30,
        questions: [
          {
            id: 1,
            question: 'Explain the concept of closures in JavaScript and provide an example.',
            category: 'Technical',
            difficulty: 'Medium',
            expectedAnswer: 'A closure is the combination of a function bundled together with references to its surrounding state. In JavaScript, closures are created every time a function is created, at function creation time. A closure allows a function to access variables from an outer function even after the outer function has returned.',
            tips: 'Provide a practical example showing how closures can be used for data privacy or function factories.'
          },
          {
            id: 2,
            question: 'How would you optimize the performance of a React application?',
            category: 'Technical',
            difficulty: 'Hard',
            expectedAnswer: 'React performance optimization techniques include: using React.memo for component memoization, implementing shouldComponentUpdate, using the useCallback and useMemo hooks, code splitting with React.lazy, virtualizing long lists, and minimizing unnecessary re-renders.',
            tips: 'Mention specific tools like React Profiler, Lighthouse, or Chrome DevTools that you would use to identify performance bottlenecks.'
          },
          {
            id: 3,
            question: 'Describe a challenging project you worked on and how you overcame obstacles.',
            category: 'Behavioral',
            difficulty: 'Medium',
            expectedAnswer: 'This is a behavioral question looking for your problem-solving abilities, resilience, and teamwork.',
            tips: 'Use the STAR method (Situation, Task, Action, Result) to structure your answer. Be specific about the challenges and your contributions.'
          },
          {
            id: 4,
            question: 'How do you stay updated with the latest frontend technologies?',
            category: 'Behavioral',
            difficulty: 'Easy',
            expectedAnswer: 'This question assesses your commitment to continuous learning and professional development.',
            tips: 'Mention specific resources like blogs, podcasts, conferences, or open-source contributions that demonstrate your engagement with the community.'
          },
          {
            id: 5,
            question: 'Implement a debounce function in JavaScript.',
            category: 'Coding',
            difficulty: 'Hard',
            expectedAnswer: 'A debounce function limits the rate at which a function can fire. It will delay the processing of the function until after a specified time has passed without the function being called again.',
            tips: 'Focus on explaining your thought process as you code. Consider edge cases and optimizations.'
          }
        ],
        sessions: []
      },
      {
        id: 2,
        title: 'Full Stack Developer Interview',
        jobTitle: 'Full Stack Developer',
        company: 'Innovative Apps LLC',
        interviewType: 'Mixed',
        difficulty: 'Mid-Level',
        duration: 45,
        questions: [
          {
            id: 1,
            question: 'Explain the difference between REST and GraphQL APIs.',
            category: 'Technical',
            difficulty: 'Medium',
            expectedAnswer: 'REST APIs expose a separate endpoint for each resource, while GraphQL uses a single endpoint where clients can specify exactly what data they need. REST often leads to over-fetching or under-fetching of data, while GraphQL allows clients to request only the data they need.',
            tips: 'Discuss the pros and cons of each approach and when you might choose one over the other.'
          },
          {
            id: 2,
            question: 'How would you design a database schema for a social media platform?',
            category: 'System Design',
            difficulty: 'Hard',
            expectedAnswer: 'A social media platform database would typically include tables for users, posts, comments, likes, friendships/follows, notifications, and messages. Consider relationships, indexing, and scalability concerns.',
            tips: 'Discuss both relational and NoSQL approaches, and explain how you would handle scale issues like high read/write volumes.'
          },
          {
            id: 3,
            question: 'Tell me about a time when you had to learn a new technology quickly.',
            category: 'Behavioral',
            difficulty: 'Medium',
            expectedAnswer: 'This question assesses your ability to adapt and learn quickly in a fast-paced environment.',
            tips: 'Use the STAR method and focus on your learning process, not just the outcome.'
          }
        ],
        sessions: []
      },
      {
        id: 3,
        title: 'Data Science Interview',
        jobTitle: 'Data Scientist',
        company: 'Analytics Insights Corp',
        interviewType: 'Technical',
        difficulty: 'Senior',
        duration: 60,
        questions: [
          {
            id: 1,
            question: 'Explain the difference between supervised and unsupervised learning with examples.',
            category: 'Technical',
            difficulty: 'Medium',
            expectedAnswer: 'Supervised learning uses labeled data to train models (e.g., classification, regression), while unsupervised learning finds patterns in unlabeled data (e.g., clustering, dimensionality reduction).',
            tips: 'Provide specific algorithm examples for each type and real-world applications.'
          },
          {
            id: 2,
            question: 'How would you handle imbalanced datasets in classification problems?',
            category: 'Technical',
            difficulty: 'Hard',
            expectedAnswer: 'Techniques include resampling methods (oversampling minority class or undersampling majority class), synthetic data generation (SMOTE), algorithm-level approaches (cost-sensitive learning), and ensemble methods.',
            tips: 'Discuss the trade-offs of different approaches and how you would evaluate model performance on imbalanced data.'
          },
          {
            id: 3,
            question: 'Describe a data science project where you had to clean and preprocess messy data.',
            category: 'Behavioral',
            difficulty: 'Medium',
            expectedAnswer: "This question assesses your practical experience with data cleaning and preprocessing, which is often 80% of a data scientist's job.",
            tips: 'Detail specific techniques you used (handling missing values, outliers, feature engineering) and how they improved your model.'
          },
          {
            id: 4,
            question: 'Implement a function to detect outliers in a dataset using the IQR method.',
            category: 'Coding',
            difficulty: 'Medium',
            expectedAnswer: 'The IQR (Interquartile Range) method identifies outliers as values below Q1 - 1.5*IQR or above Q3 + 1.5*IQR, where Q1 is the first quartile and Q3 is the third quartile.',
            tips: 'Explain why you might choose IQR over other methods like z-score and discuss the limitations.'
          }
        ],
        sessions: []
      },
      {
        id: 4,
        title: 'System Design Interview',
        jobTitle: 'Senior Software Engineer',
        company: 'ScaleTech Solutions',
        interviewType: 'System Design',
        difficulty: 'Senior',
        duration: 60,
        questions: [
          {
            id: 1,
            question: 'Design a URL shortening service like TinyURL.',
            category: 'System Design',
            difficulty: 'Medium',
            expectedAnswer: 'A URL shortener requires components for URL generation (hash function), storage (database for mapping short to long URLs), redirection service, and analytics. Consider scalability, availability, and potential bottlenecks.',
            tips: 'Follow a structured approach: requirements clarification, system interface definition, data model, algorithm design, scaling considerations, and potential improvements.'
          },
          {
            id: 2,
            question: "How would you design Twitter's newsfeed functionality?",
            category: 'System Design',
            difficulty: 'Hard',
            expectedAnswer: "Twitter's newsfeed requires handling high write volume (tweets), complex read patterns (timeline generation), and real-time updates. Consider fan-out approaches (push vs. pull), caching strategies, and database choices.",
            tips: 'Discuss trade-offs between different approaches and how you would handle scale issues like celebrity users with millions of followers.'
          },
          {
            id: 3,
            question: 'Design a distributed cache system.',
            category: 'System Design',
            difficulty: 'Hard',
            expectedAnswer: 'A distributed cache system needs to address data partitioning, replication, consistency, fault tolerance, eviction policies, and cache invalidation strategies.',
            tips: 'Reference existing systems like Redis or Memcached and explain how you would handle specific challenges like hot keys or cache stampedes.'
          }
        ],
        sessions: []
      },
      {
        id: 5,
        title: 'Behavioral Interview',
        jobTitle: 'Product Manager',
        company: 'User-First Products',
        interviewType: 'Behavioral',
        difficulty: 'Mid-Level',
        duration: 45,
        questions: [
          {
            id: 1,
            question: 'Tell me about a time when you had to make a difficult decision with limited information.',
            category: 'Behavioral',
            difficulty: 'Medium',
            expectedAnswer: 'This question assesses your decision-making process, risk assessment, and judgment under uncertainty.',
            tips: 'Use the STAR method and focus on your analytical approach, how you gathered what information you could, and how you evaluated options.'
          },
          {
            id: 2,
            question: 'Describe a situation where you had to work with a difficult team member or stakeholder.',
            category: 'Behavioral',
            difficulty: 'Medium',
            expectedAnswer: 'This question evaluates your interpersonal skills, conflict resolution abilities, and emotional intelligence.',
            tips: 'Focus on how you maintained professionalism, sought to understand their perspective, and worked toward a positive outcome.'
          },
          {
            id: 3,
            question: 'Give an example of a time when you failed to meet a goal or deadline. How did you handle it?',
            category: 'Behavioral',
            difficulty: 'Hard',
            expectedAnswer: 'This question assesses your accountability, resilience, and ability to learn from failures.',
            tips: 'Be honest about the failure, take responsibility, and emphasize what you learned and how you applied those lessons later.'
          },
          {
            id: 4,
            question: 'Tell me about a time when you had to influence someone without having direct authority over them.',
            category: 'Behavioral',
            difficulty: 'Hard',
            expectedAnswer: "This question evaluates your leadership, persuasion skills, and ability to build consensus.",
            tips: "Focus on how you built relationships, understood others' motivations, and communicated effectively to achieve buy-in."
          }
        ],
        sessions: []
      }
    ];

    setInterviews(mockInterviews);
  };

  // Request camera permission
  const requestCameraPermission = async () => {
    try {
      // Request both video and audio permissions
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });

      // Save the stream reference
      streamRef.current = stream;

      // Set the stream as the video source
      if (videoRef.current) {
        videoRef.current.srcObject = stream;

        // Ensure video plays when ready
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play().catch(e => {
            console.error('Error playing video:', e);
          });
        };
      }

      setCameraPermission('granted');
      console.log('Camera permission granted and stream connected');
      return true;
    } catch (err) {
      console.error('Error accessing camera:', err);
      setCameraPermission('denied');
      alert('Camera access is required for the interview preparation. Please allow camera access and try again.');
      return false;
    }
  };

  // Start interview session
  const startInterviewSession = async (interview) => {
    const hasPermission = cameraPermission === 'granted' || await requestCameraPermission();
    if (!hasPermission) {
      alert('Camera permission is required for the interview session.');
      return;
    }

    setCurrentInterview(interview);
    setCurrentQuestion(interview.questions[0]);
    setQuestionIndex(0);
    setSessionInProgress(true);
    setActiveTab('session');
    setFeedback(null);
  };

  // End interview session
  const endInterviewSession = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setSessionInProgress(false);
    setIsRecording(false);
    setCurrentInterview(null);
    setCurrentQuestion(null);
    setActiveTab('dashboard');

    // Stop practice mode if active
    if (practiceMode) {
      endPracticeMode();
    }
  };

  // Start recording
  const startRecording = () => {
    setIsRecording(true);
    // In a real implementation, this would start recording the video
    console.log('Recording started');
  };

  // Stop recording and analyze
  const stopRecordingAndAnalyze = () => {
    setIsRecording(false);
    setLoading(true);

    // In a real implementation, this would stop recording and send the video for analysis
    // For now, we'll simulate the analysis with a timeout
    setTimeout(() => {
      // Mock feedback with detailed analysis
      const mockFeedback = {
        // Basic scores
        overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
        technicalAccuracy: Math.floor(Math.random() * 30) + 70,
        communicationScore: Math.floor(Math.random() * 30) + 70,
        confidenceScore: Math.floor(Math.random() * 30) + 70,
        bodyLanguageScore: Math.floor(Math.random() * 30) + 70,
        structureScore: Math.floor(Math.random() * 30) + 70,
        relevanceScore: Math.floor(Math.random() * 30) + 70,

        // Basic feedback lists
        strengths: [
          'Clear explanation of technical concepts',
          'Good problem-solving approach',
          'Maintained good eye contact throughout'
        ],
        areasForImprovement: [
          'Could provide more specific examples',
          'Reduce use of filler words like "um" and "like"',
          'Consider more concise answers to behavioral questions'
        ],

        // Timeline feedback
        detailedFeedback: [
          {
            timestamp: 45,
            feedback: 'Excellent explanation of the algorithm',
            category: 'Technical',
            severity: 'Positive'
          },
          {
            timestamp: 120,
            feedback: 'Consider maintaining better posture here',
            category: 'Body Language',
            severity: 'Suggestion'
          },
          {
            timestamp: 180,
            feedback: 'Too many filler words in this response',
            category: 'Communication',
            severity: 'Minor Issue'
          }
        ],

        // Detailed analysis data
        technicalStrengths: [
          'Strong understanding of closure concepts',
          'Accurate explanation of scope and lexical environment',
          'Good practical example demonstrating data privacy'
        ],
        technicalWeaknesses: [
          'Could elaborate more on memory implications',
          'Missed opportunity to discuss performance considerations',
          'Example could be more complex to showcase advanced usage'
        ],
        codeQualityFeedback: 'The code example provided was clean and well-structured. Variable naming was clear and the implementation demonstrated good understanding of the concept. Consider adding comments to explain the more complex parts of your implementation.',

        communicationFeedback: 'Your communication was generally clear and well-paced. You maintained good eye contact and used appropriate technical terminology. To improve, try to vary your tone more to emphasize key points and avoid filler words like "um" and "basically" which were used frequently.',

        bodyLanguageFeedback: 'Your body language was mostly confident with good posture. Hand gestures were natural and helped illustrate points. Areas for improvement include reducing fidgeting and maintaining a more consistent energy level throughout the interview.',

        keyInsights: [
          'Technical knowledge is strong but could be communicated more effectively',
          'Answer structure is good but tends to be too lengthy',
          'Confidence level varies when discussing more complex topics',
          'Good at explaining concepts but could improve on practical application examples'
        ],

        improvementAreas: [
          {
            title: 'Technical Communication',
            description: 'While your technical knowledge is strong, you could improve how you communicate complex concepts to make them more accessible.',
            actions: [
              'Practice explaining technical concepts to non-technical friends',
              'Use analogies to simplify complex ideas',
              'Structure explanations with "what, why, how" framework'
            ],
            resources: [
              {
                title: 'The Feynman Technique for Technical Communication',
                url: 'https://example.com/feynman-technique'
              },
              {
                title: 'Speaking Tech to Non-Tech People',
                url: 'https://example.com/tech-communication'
              }
            ]
          },
          {
            title: 'Answer Conciseness',
            description: 'Your answers tend to be comprehensive but sometimes too lengthy, which might lose the interviewer\'s attention.',
            actions: [
              'Practice the STAR method (Situation, Task, Action, Result) for structured, concise responses',
              'Time your practice answers and aim to keep them under 2 minutes',
              'Focus on the most impactful points rather than covering everything'
            ],
            resources: [
              {
                title: 'The STAR Method for Interview Responses',
                url: 'https://example.com/star-method'
              },
              {
                title: 'Concise Communication in Technical Interviews',
                url: 'https://example.com/concise-tech-interviews'
              }
            ]
          }
        ]
      };

      setFeedback(mockFeedback);
      setLoading(false);
    }, 2000);
  };

  // Move to next question
  const nextQuestion = () => {
    if (currentInterview && questionIndex < currentInterview.questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setCurrentQuestion(currentInterview.questions[questionIndex + 1]);
      setFeedback(null);

      // Capture activity if in practice mode
      if (practiceMode) {
        captureActivity();
      }
    } else {
      // End of interview
      if (practiceMode) {
        endPracticeMode();
      } else {
        endInterviewSession();
      }
    }
  };

  // Practice mode functions
  const startPracticeMode = async (interview) => {
    // Request camera permission first
    const hasPermission = cameraPermission === 'granted' || await requestCameraPermission();
    if (!hasPermission) {
      alert('Camera permission is required for practice mode.');
      return;
    }

    setPracticeMode(true);
    setActivityCapture([]);
    setPracticeTimer(0);

    // Start practice timer
    const interval = setInterval(() => {
      setPracticeTimer(prev => prev + 1);

      // Capture activity every 30 seconds
      if (practiceTimer % 30 === 0 && practiceTimer > 0) {
        captureActivity();
      }
    }, 1000);

    setPracticeTimerInterval(interval);

    // Start the interview session with the selected interview
    setCurrentInterview(interview);
    setCurrentQuestion(interview.questions[0]);
    setQuestionIndex(0);
    setSessionInProgress(true);
    setActiveTab('session');
    setFeedback(null);
  };

  const endPracticeMode = () => {
    setPracticeMode(false);

    // Clear practice timer
    if (practiceTimerInterval) {
      clearInterval(practiceTimerInterval);
      setPracticeTimerInterval(null);
    }

    // Generate practice report
    generatePracticeReport();

    // End the interview session
    endInterviewSession();
  };

  const captureActivity = () => {
    // In a real implementation, this would capture screenshots, typing activity, etc.
    // For this demo, we'll just log the timestamp and question

    const activity = {
      timestamp: new Date().toISOString(),
      questionIndex,
      question: currentQuestion?.question,
      isRecording,
      elapsedTime: practiceTimer
    };

    setActivityCapture(prev => [...prev, activity]);

    // Take a "screenshot" (in a real implementation)
    console.log(`Activity captured at ${formatTime(practiceTimer)}`);
  };

  const generatePracticeReport = () => {
    // In a real implementation, this would generate a comprehensive report
    // For this demo, we'll just show a simple alert

    const totalTime = formatTime(practiceTimer);
    const questionsAttempted = activityCapture.filter(a => a.isRecording).length;

    alert(`Practice Session Report:
    - Total practice time: ${totalTime}
    - Questions attempted: ${questionsAttempted}
    - Activity captures: ${activityCapture.length}

    Keep practicing to improve your interview skills!`);
  };

  // Helper function to format time (seconds to MM:SS)
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Render dashboard tab
  const renderDashboard = () => (
    <div className="interview-dashboard">
      <h2>AI Interview Preparation</h2>
      <p className="dashboard-description">
        Practice your interview skills with our AI-powered interview simulator.
        Get real-time feedback on your responses, body language, and communication style.
      </p>

      <div className="interview-list">
        <h3>Available Interview Templates</h3>
        {interviews.map(interview => (
          <div key={interview.id} className="interview-card">
            <div className="interview-card-header">
              <h4>{interview.title}</h4>
              <span className={`interview-type ${interview.interviewType.toLowerCase()}`}>
                {interview.interviewType}
              </span>
            </div>
            <div className="interview-card-details">
              <p><strong>Position:</strong> {interview.jobTitle}</p>
              <p><strong>Company:</strong> {interview.company}</p>
              <p><strong>Difficulty:</strong> {interview.difficulty}</p>
              <p><strong>Duration:</strong> {interview.duration} minutes</p>
              <p><strong>Questions:</strong> {interview.questions.length}</p>
            </div>
            <div className="interview-card-actions">
              <div className="action-buttons">
                <button
                  className="btn btn-primary"
                  onClick={() => startInterviewSession(interview)}
                >
                  Start Practice
                </button>
                <button
                  className="btn btn-secondary"
                  onClick={() => startPracticeMode(interview)}
                >
                  Practice with Camera
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Render interview session tab
  const renderSession = () => (
    <div className="interview-session">
      {currentQuestion && (
        <>
          <div className="session-header">
            <h2>{currentInterview.title}</h2>
            <div className="question-counter">
              Question {questionIndex + 1} of {currentInterview.questions.length}
            </div>
          </div>

          {/* Practice Mode Info */}
          {practiceMode && (
            <div className="practice-info">
              <div className="practice-timer">
                Practice Time: {formatTime(practiceTimer)}
              </div>
              <div className="practice-captures">
                Activity Captures: {activityCapture.length}
              </div>
            </div>
          )}

          <div className="session-content">
            <div className="video-container">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted={false}
                className={isRecording ? 'recording' : ''}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              {isRecording && <div className="recording-indicator">Recording</div>}
              {practiceMode && <div className="activity-capture-indicator">Activity Capture</div>}
              {!cameraPermission && (
                <div className="camera-permission-overlay">
                  <button onClick={requestCameraPermission} className="camera-permission-btn">
                    Enable Camera
                  </button>
                </div>
              )}
            </div>

            <div className="question-container">
              <div className="question-card">
                <div className="question-category">
                  {currentQuestion.category} - {currentQuestion.difficulty}
                </div>
                <h3 className="question-text">{currentQuestion.question}</h3>

                <div className="question-actions">
                  {!isRecording ? (
                    <button
                      className="btn btn-primary"
                      onClick={startRecording}
                      disabled={loading}
                    >
                      Start Answering
                    </button>
                  ) : (
                    <button
                      className="btn btn-danger"
                      onClick={stopRecordingAndAnalyze}
                      disabled={loading}
                    >
                      Stop Recording
                    </button>
                  )}
                </div>
              </div>

              {loading && (
                <div className="loading-container">
                  <div className="loading-spinner"></div>
                  <p>Analyzing your response...</p>
                </div>
              )}

              {feedback && (
                <div className="feedback-container">
                  <h3>AI Feedback</h3>

                  <div className="feedback-scores">
                    <div className="feedback-score">
                      <div className="score-label">Overall</div>
                      <div className="score-value">{feedback.overallScore}</div>
                    </div>
                    <div className="feedback-score">
                      <div className="score-label">Technical</div>
                      <div className="score-value">{feedback.technicalAccuracy}</div>
                    </div>
                    <div className="feedback-score">
                      <div className="score-label">Communication</div>
                      <div className="score-value">{feedback.communicationScore}</div>
                    </div>
                    <div className="feedback-score">
                      <div className="score-label">Confidence</div>
                      <div className="score-value">{feedback.confidenceScore}</div>
                    </div>
                    <div className="feedback-score">
                      <div className="score-label">Body Language</div>
                      <div className="score-value">{feedback.bodyLanguageScore}</div>
                    </div>
                  </div>

                  <div className="feedback-details">
                    <div className="feedback-section">
                      <h4>Strengths</h4>
                      <ul>
                        {feedback.strengths.map((strength, index) => (
                          <li key={index}>{strength}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="feedback-section">
                      <h4>Areas for Improvement</h4>
                      <ul>
                        {feedback.areasForImprovement.map((area, index) => (
                          <li key={index}>{area}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="feedback-actions">
                    <button
                      className="btn btn-secondary"
                      onClick={() => setShowDetailedAnalysis(true)}
                    >
                      View Detailed Analysis
                    </button>
                    <button
                      className="btn btn-primary next-question-btn"
                      onClick={nextQuestion}
                    >
                      {questionIndex < currentInterview.questions.length - 1
                        ? 'Next Question'
                        : 'Finish Interview'}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          <button
            className="btn btn-secondary end-session-btn"
            onClick={endInterviewSession}
          >
            End Session
          </button>
        </>
      )}
    </div>
  );

  return (
    <div className="interview-prep-container">
      {!sessionInProgress ? (
        <div className="interview-tabs">
          <button
            className={activeTab === 'dashboard' ? 'active' : ''}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={activeTab === 'history' ? 'active' : ''}
            onClick={() => setActiveTab('history')}
          >
            History
          </button>
          <button
            className={activeTab === 'settings' ? 'active' : ''}
            onClick={() => setActiveTab('settings')}
          >
            Settings
          </button>
        </div>
      ) : null}

      <div className="interview-content">
        {activeTab === 'dashboard' && !sessionInProgress && renderDashboard()}
        {activeTab === 'history' && !sessionInProgress && (
          <div className="interview-history">
            <h2>Interview History</h2>
            <p>Your past interview sessions will appear here.</p>
          </div>
        )}
        {activeTab === 'settings' && !sessionInProgress && (
          <div className="interview-settings">
            <h2>Settings</h2>
            <p className="settings-description">Customize your interview experience.</p>

            <div className="settings-section">
              <h3>Camera Settings</h3>

              <div className="setting-item">
                <div className="setting-info">
                  <h4>Camera Test</h4>
                  <p>Test your camera before starting an interview.</p>
                </div>
                <div className="setting-control">
                  <button
                    className="btn btn-primary"
                    onClick={requestCameraPermission}
                  >
                    Test Camera
                  </button>
                </div>
              </div>

              {cameraPermission === 'granted' && (
                <div className="camera-preview-container">
                  <video
                    ref={videoRef}
                    autoPlay
                    muted
                    className="camera-preview"
                  />
                  <p className="camera-status success">Camera is working properly!</p>
                </div>
              )}

              {cameraPermission === 'denied' && (
                <div className="camera-error">
                  <p className="camera-status error">Camera access denied. Please check your browser settings.</p>
                </div>
              )}
            </div>
          </div>
        )}
        {(activeTab === 'session' || sessionInProgress) && renderSession()}
      </div>

      {/* Detailed Analysis Report Modal */}
      {showDetailedAnalysis && feedback && currentInterview && (
        <div className="modal-overlay">
          <InterviewAnalysisReport
            feedback={feedback}
            interviewData={currentInterview}
            onClose={() => setShowDetailedAnalysis(false)}
          />
        </div>
      )}
    </div>
  );
}

export default InterviewPrep;
