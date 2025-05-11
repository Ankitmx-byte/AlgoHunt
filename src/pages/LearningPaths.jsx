import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LearningPaths.css';
import '../styles/animations.css';
import ScrollReveal from '../components/ScrollReveal';
import { getLanguageLearningPaths } from '../data/languageLearningPathsData';
import { getVideoResources } from '../data/videoResourcesData';

function LearningPaths() {
  const [paths, setPaths] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const [videoResources, setVideoResources] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch personalized learning paths
    fetchLearningPaths();
    fetchUserProgress();
    fetchVideoResources();
  }, []);

  const fetchLearningPaths = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would call your API
      // For now, we'll use mock data based on open source datasets
      setTimeout(() => {
        // Combine algorithm/data structure paths with language learning paths
        const algorithmPaths = getLearningPathsData();
        const languagePaths = getLanguageLearningPaths();

        // Combine both types of paths
        setPaths([...algorithmPaths, ...languagePaths]);
        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching learning paths:", error);
      setLoading(false);
    }
  };

  const fetchUserProgress = async () => {
    try {
      // In a real implementation, this would call your API
      // For now, we'll use mock data
      setTimeout(() => {
        setUserProgress({
          "1": 35,
          "2": 45,
          "3": 10,
          "4": 0,
          "5": 0,
          "6": 0,
          "python": 20,
          "javascript": 15,
          "java": 5,
          "cpp": 0,
          "go": 0
        });
      }, 1000);
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };

  const fetchVideoResources = async () => {
    try {
      // In a real implementation, this would call your API
      // For now, we'll use mock data
      const videos = getVideoResources();
      setVideoResources(videos);
    } catch (error) {
      console.error("Error fetching video resources:", error);
    }
  };

  const handlePathClick = (pathId) => {
    navigate(`/learning/${pathId}`);
  };

  const handleContinueLearning = (pathId, event) => {
    event.stopPropagation(); // Prevent the card click event from firing
    navigate(`/learning/${pathId}`);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleWatchVideo = (videoUrl) => {
    window.open(videoUrl, '_blank');
  };

  const filteredPaths = activeTab === 'all'
    ? paths
    : activeTab === 'algorithms'
      ? paths.filter(path => !path.isLanguage)
      : paths.filter(path => path.isLanguage);

  if (loading) {
    return (
      <div className="learning-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading learning paths...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="learning-container">
      <ScrollReveal animation="fade-in-down">
        <div className="learning-header">
          <h1 className="animated-gradient">Personalized Learning Paths</h1>
          <p>AI-curated learning journeys based on your performance and goals</p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0.2}>
        <div className="recommended-path">
          <h2>Recommended For You</h2>
          <div
            className="path-card featured card-shine"
            onClick={() => handlePathClick("2")}
          >
            <h3>Advanced Algorithms Mastery</h3>
            <div className="path-meta">
              <span className="difficulty">Advanced</span>
              <span className="modules">7 Modules</span>
              <span className="estimated-time">15-20 hours</span>
            </div>
            <div className="progress-bar">
              <div className="progress" style={{ width: '45%' }}></div>
              <span>45% Complete</span>
            </div>
            <p><strong>Why this is recommended for you:</strong> Based on your recent battle performance, we've noticed you excel at basic algorithms but could benefit from advanced graph algorithms and dynamic programming techniques to improve your problem-solving skills in competitive scenarios.</p>
            <button
              className="continue-btn pulse"
              onClick={(e) => handleContinueLearning("2", e)}
            >
              Continue Your Journey
              <span className="btn-glow"></span>
            </button>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0.3}>
        <div className="learning-tabs">
          <button
            className={`tab-btn ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => handleTabChange('all')}
          >
            All Paths
          </button>
          <button
            className={`tab-btn ${activeTab === 'algorithms' ? 'active' : ''}`}
            onClick={() => handleTabChange('algorithms')}
          >
            Algorithms & Data Structures
          </button>
          <button
            className={`tab-btn ${activeTab === 'languages' ? 'active' : ''}`}
            onClick={() => handleTabChange('languages')}
          >
            Programming Languages
          </button>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0.4}>
        <div className="all-paths">
          <div className="paths-grid stagger-fade-up">
            {filteredPaths.map((path, index) => (
              <div
                key={path.id}
                className="path-card hover-lift card-shine"
                onClick={() => handlePathClick(path.id)}
                data-index={index}
                style={{"--stagger-delay": "0.1s"}}
              >
                <h3>{path.title}</h3>
                <div className="path-meta">
                  <span className="difficulty">{path.difficulty}</span>
                  <span className="modules">{path.moduleCount} Modules</span>
                  {path.estimatedTime && (
                    <span className="estimated-time">{path.estimatedTime}</span>
                  )}
                </div>
                <div className="progress-bar">
                  <div
                    className="progress"
                    style={{ width: `${userProgress[path.id] || 0}%` }}
                  ></div>
                  <span>{userProgress[path.id] || 0}% Complete</span>
                </div>
                <p>{path.description}</p>
                <button
                  className="start-btn btn-primary"
                  onClick={(e) => handleContinueLearning(path.id, e)}
                >
                  {userProgress[path.id] > 0 ? 'Continue' : 'Start Learning'}
                  <span className="btn-glow"></span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0.5}>
        <div className="video-resources">
          <h2>Video Resources</h2>
          <div className="video-grid stagger-fade-up">
            {videoResources.slice(0, 3).map((video, index) => (
              <div
                key={index}
                className="video-card hover-lift"
                data-index={index}
                style={{"--stagger-delay": "0.1s"}}
              >
                <div className="video-thumbnail">
                  <img src={video.thumbnail} alt={video.title} />
                  <button
                    className="play-btn pulse"
                    onClick={() => handleWatchVideo(video.url)}
                  >
                    ▶
                  </button>
                </div>
                <h3>{video.title}</h3>
                <p>{video.description}</p>
                <div className="video-meta">
                  <span>{video.duration}</span>
                  <span>{video.source}</span>
                </div>
              </div>
            ))}
          </div>
          <button className="view-all-btn hover-lift">View All Video Resources</button>
        </div>
      </ScrollReveal>
    </div>
  );
}

// Function to get learning paths data from open source datasets
function getLearningPathsData() {
  return [
    {
      id: "1",
      title: "Data Structures Fundamentals",
      difficulty: "Beginner",
      moduleCount: 5,
      estimatedTime: "10-12 hours",
      description: "Master the essential data structures that form the foundation of efficient algorithms and software development. This path covers arrays, linked lists, stacks, queues, trees, and more.",
      source: "Open Data Structures",
      isLanguage: false
    },
    {
      id: "2",
      title: "Advanced Algorithms Mastery",
      difficulty: "Advanced",
      moduleCount: 7,
      estimatedTime: "15-20 hours",
      description: "Dive deep into advanced algorithmic techniques used in competitive programming and technical interviews. Learn graph algorithms, dynamic programming, and optimization techniques.",
      source: "CLRS & Algorithms by Jeff Erickson",
      isLanguage: false
    },
    {
      id: "3",
      title: "System Design Fundamentals",
      difficulty: "Intermediate",
      moduleCount: 6,
      estimatedTime: "12-15 hours",
      description: "Learn how to design scalable systems and understand the trade-offs involved in system design decisions. Covers load balancing, caching, database sharding, and more.",
      source: "System Design Primer",
      isLanguage: false
    },
    {
      id: "4",
      title: "Machine Learning Essentials",
      difficulty: "Intermediate",
      moduleCount: 8,
      estimatedTime: "20-25 hours",
      description: "Build a strong foundation in machine learning concepts and algorithms. Learn about supervised and unsupervised learning, neural networks, and model evaluation.",
      source: "Scikit-learn & TensorFlow documentation",
      isLanguage: false
    },
    {
      id: "5",
      title: "Frontend Development Mastery",
      difficulty: "Intermediate",
      moduleCount: 6,
      estimatedTime: "15-18 hours",
      description: "Master modern frontend development with React, state management, responsive design, and performance optimization techniques.",
      source: "React documentation & MDN Web Docs",
      isLanguage: false
    },
    {
      id: "6",
      title: "Backend Development with Node.js",
      difficulty: "Intermediate",
      moduleCount: 7,
      estimatedTime: "16-20 hours",
      description: "Learn server-side development with Node.js, Express, RESTful APIs, authentication, and database integration.",
      source: "Node.js documentation & Express.js Guide",
      isLanguage: false
    }
  ];
}

export default LearningPaths;