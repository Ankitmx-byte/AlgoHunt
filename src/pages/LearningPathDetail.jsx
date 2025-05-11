import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ModuleContent from '../components/ModuleContent';
import ScrollReveal from '../components/ScrollReveal';
import { getModuleContent } from '../data/moduleContentData';
import { getLanguageLearningPathDetail } from '../data/languageLearningPathsData';
import { getAlgorithmPaths, getLanguagePaths } from './LearningCenter';
import './LearningPathDetail.css';
import '../styles/animations.css';

function LearningPathDetail() {
  const { pathId } = useParams();
  const navigate = useNavigate();
  const [path, setPath] = useState(null);
  const [modules, setModules] = useState([]); // Initialize as empty array to prevent mapping errors
  const [userProgress, setUserProgress] = useState({});
  const [activeModuleId, setActiveModuleId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModuleContent, setShowModuleContent] = useState(false);
  const [currentModuleContent, setCurrentModuleContent] = useState(null);

  useEffect(() => {
    // Fetch learning path details
    fetchLearningPath();
    fetchModules();
    fetchUserProgress();
  }, [pathId]);

  const fetchLearningPath = async () => {
    try {
      // In a real implementation, this would call your API
      // For now, we'll use mock data
      setLoading(true);

      // Simulate API call
      setTimeout(() => {
        // Get all learning paths from the LearningCenter component
        const allPaths = [...getAlgorithmPaths(), ...getLanguagePaths()];

        // Find the path with the matching ID
        const foundPath = allPaths.find(p => p.id === pathId);

        if (foundPath) {
          setPath(foundPath);

          // Set the first module as active by default if user hasn't started any module
          if (foundPath.modules && foundPath.modules.length > 0) {
            setActiveModuleId(foundPath.modules[0].id || `module-${foundPath.id}-1`);
          }
        } else if (pathId.startsWith('lang-')) {
          // For backward compatibility with old language path IDs
          const languagePath = getLanguageLearningPathDetail(pathId);
          setPath(languagePath);

          // Set the first module as active by default if user hasn't started any module
          if (languagePath && languagePath.modules && languagePath.modules.length > 0) {
            setActiveModuleId(languagePath.modules[0].id);
          }
        } else {
          // For backward compatibility with old path IDs
          const mockPath = getMockPath(pathId);
          setPath(mockPath);

          // Set the first module as active by default if user hasn't started any module
          if (mockPath && mockPath.modules && mockPath.modules.length > 0) {
            setActiveModuleId(mockPath.modules[0].id);
          }
        }

        setLoading(false);
      }, 800);
    } catch (error) {
      console.error("Error fetching learning path:", error);
      setLoading(false);
    }
  };

  const fetchModules = async () => {
    try {
      // In a real implementation, this would call your API
      // For now, we'll use mock data
      setTimeout(() => {
        // Get all learning paths from the LearningCenter component
        const allPaths = [...getAlgorithmPaths(), ...getLanguagePaths()];

        // Find the path with the matching ID
        const foundPath = allPaths.find(p => p.id === pathId);

        if (foundPath && foundPath.modules) {
          setModules(foundPath.modules);
        } else if (pathId.startsWith('lang-')) {
          // For backward compatibility with old language path IDs
          const languagePath = getLanguageLearningPathDetail(pathId);
          if (languagePath && languagePath.modules) {
            setModules(languagePath.modules);
          }
        } else {
          // For backward compatibility with old path IDs
          const mockModules = getMockModules(pathId);
          setModules(mockModules);
        }
      }, 1000);
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const fetchUserProgress = async () => {
    try {
      // In a real implementation, this would call your API
      // For now, we'll use mock data
      setTimeout(() => {
        const mockProgress = {
          pathProgress: 35,
          completedModules: ["m1", "m2"],
          moduleProgress: {
            "m1": 100,
            "m2": 100,
            "m3": 40,
            "m4": 0,
            "m5": 0
          }
        };
        setUserProgress(mockProgress);
      }, 1200);
    } catch (error) {
      console.error("Error fetching user progress:", error);
    }
  };

  const handleModuleClick = (moduleId) => {
    setActiveModuleId(moduleId);
    setShowModuleContent(false); // Hide module content when switching modules
  };

  const handleStartModule = (moduleId) => {
    // Check if moduleId is valid
    if (!moduleId) {
      console.error('handleStartModule called with invalid moduleId');
      return;
    }

    // Load module content
    const moduleContent = getModuleContent(moduleId);

    if (moduleContent) {
      setCurrentModuleContent(moduleContent);
      setShowModuleContent(true);

      // In a real app, this would also update the user's progress
      console.log(`Starting module ${moduleId}`);
    } else {
      // If no content is found in the module content data, check if the module has video data
      const selectedModule = modules.find(m => m.id === moduleId);

      if (selectedModule && selectedModule.hasVideo) {
        // Create a content object with the video
        const videoContent = {
          id: moduleId,
          title: selectedModule.title,
          content: [
            {
              type: "video",
              title: selectedModule.videoTitle || "Video Tutorial",
              description: selectedModule.videoDescription || "Learn about " + selectedModule.title,
              source: selectedModule.videoSource || "YouTube",
              url: selectedModule.videoUrl,
              duration: selectedModule.videoDuration || "Unknown duration"
            },
            {
              type: "text",
              title: "About this module",
              body: `<p>${selectedModule.description}</p>
              <h4>Topics covered:</h4>
              <ul>
                ${selectedModule.topics.map(topic => `<li>${topic}</li>`).join('')}
              </ul>
              <p>Estimated time to complete: ${selectedModule.estimatedTime}</p>`
            }
          ]
        };

        setCurrentModuleContent(videoContent);
        setShowModuleContent(true);
        console.log(`Starting module ${moduleId} with video content`);
      } else {
        // Create a generic content object for modules without specific content
        const genericContent = {
          id: moduleId || 'generic-module',
          title: selectedModule ? selectedModule.title : 'Module Content',
          content: [
            {
              type: "text",
              title: "Module Content",
              body: `<p>${selectedModule ? selectedModule.description : 'This module content is being developed.'}</p>
              ${selectedModule && selectedModule.topics ?
                `<h4>Topics covered:</h4>
                <ul>
                  ${selectedModule.topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>` : ''
              }
              ${selectedModule ? `<p>Estimated time to complete: ${selectedModule.estimatedTime || 'Not specified'}</p>` : ''}
              <p>More detailed content for this module will be available soon.</p>`
            }
          ]
        };

        setCurrentModuleContent(genericContent);
        setShowModuleContent(true);
        console.log(`Starting module with generic content`);
      }
    }
  };

  const handleContinueModule = (moduleId) => {
    // Check if moduleId is valid
    if (!moduleId) {
      console.error('handleContinueModule called with invalid moduleId');
      return;
    }

    // Similar to handleStartModule, but would resume from where the user left off
    const moduleContent = getModuleContent(moduleId);

    if (moduleContent) {
      setCurrentModuleContent(moduleContent);
      setShowModuleContent(true);

      // In a real app, this would also load the user's progress
      console.log(`Continuing module ${moduleId}`);
    } else {
      // If no content is found in the module content data, check if the module has video data
      const selectedModule = modules.find(m => m.id === moduleId);

      if (selectedModule && selectedModule.hasVideo) {
        // Create a content object with the video
        const videoContent = {
          id: moduleId,
          title: selectedModule.title,
          content: [
            {
              type: "video",
              title: selectedModule.videoTitle || "Video Tutorial",
              description: selectedModule.videoDescription || "Learn about " + selectedModule.title,
              source: selectedModule.videoSource || "YouTube",
              url: selectedModule.videoUrl,
              duration: selectedModule.videoDuration || "Unknown duration"
            },
            {
              type: "text",
              title: "About this module",
              body: `<p>${selectedModule.description}</p>
              <h4>Topics covered:</h4>
              <ul>
                ${selectedModule.topics.map(topic => `<li>${topic}</li>`).join('')}
              </ul>
              <p>Estimated time to complete: ${selectedModule.estimatedTime}</p>`
            }
          ]
        };

        setCurrentModuleContent(videoContent);
        setShowModuleContent(true);
        console.log(`Continuing module ${moduleId} with video content`);
      } else {
        // Create a generic content object for modules without specific content
        const genericContent = {
          id: moduleId || 'generic-module',
          title: selectedModule ? selectedModule.title : 'Module Content',
          content: [
            {
              type: "text",
              title: "Module Content",
              body: `<p>${selectedModule ? selectedModule.description : 'This module content is being developed.'}</p>
              ${selectedModule && selectedModule.topics ?
                `<h4>Topics covered:</h4>
                <ul>
                  ${selectedModule.topics.map(topic => `<li>${topic}</li>`).join('')}
                </ul>` : ''
              }
              ${selectedModule ? `<p>Estimated time to complete: ${selectedModule.estimatedTime || 'Not specified'}</p>` : ''}
              <p>More detailed content for this module will be available soon.</p>`
            }
          ]
        };

        setCurrentModuleContent(genericContent);
        setShowModuleContent(true);
        console.log(`Continuing module with generic content`);
      }
    }
  };

  const handleCompleteModule = (moduleId) => {
    // In a real app, this would update the user's progress
    console.log(`Completed module ${moduleId}`);

    // Update local state to reflect completion
    setUserProgress(prev => ({
      ...prev,
      completedModules: [...(prev.completedModules || []), moduleId],
      moduleProgress: {
        ...(prev.moduleProgress || {}),
        [moduleId]: 100
      }
    }));

    // Return to module overview
    setShowModuleContent(false);
  };

  const handleBackToModuleOverview = () => {
    setShowModuleContent(false);
  };

  const handleBackToLearningPaths = () => {
    navigate('/learning');
  };

  if (loading) {
    return (
      <div className="learning-detail-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading learning path...</div>
        </div>
      </div>
    );
  }

  if (!path) {
    return (
      <div className="learning-detail-container">
        <div className="error-message">
          <h2>Learning Path Not Found</h2>
          <p>The learning path you're looking for doesn't exist or has been removed.</p>
          <button onClick={handleBackToLearningPaths} className="back-btn">
            Back to Learning Paths
          </button>
        </div>
      </div>
    );
  }

  const activeModule = modules.find(module => module.id === activeModuleId);

  // If showing module content, render the ModuleContent component
  if (showModuleContent && currentModuleContent) {
    return (
      <div className="learning-detail-container">
        <div className="learning-detail-header">
          <button onClick={handleBackToModuleOverview} className="back-btn">
            ← Back to Module Overview
          </button>
          <h1>{currentModuleContent.title}</h1>
        </div>

        <ModuleContent
          module={currentModuleContent}
          onComplete={handleCompleteModule}
          onBack={handleBackToModuleOverview}
        />
      </div>
    );
  }

  return (
    <div className="learning-detail-container">
      <ScrollReveal animation="fade-in-down">
        <div className="learning-detail-header">
          <div className="header-background"></div>
          <div className="header-content">
            <button onClick={handleBackToLearningPaths} className="back-btn btn-arrow">
              <span className="arrow">←</span> Back to Learning Paths
            </button>
            <h1 className="animated-gradient">{path.title}</h1>
            <div className="path-meta-detail">
              <span className="difficulty">{path.difficulty}</span>
              <span className="modules-count"><i className="fas fa-book"></i> {path.moduleCount} Modules</span>
              <span className="estimated-time"><i className="fas fa-clock"></i> {path.estimatedTime}</span>
              {path.source && <span className="source"><i className="fas fa-database"></i> Source: {path.source}</span>}
            </div>
            <p className="path-description">{path.description}</p>

            {path.prerequisites && path.prerequisites.length > 0 && (
              <div className="path-prerequisites">
                <h3>Prerequisites</h3>
                <ul>
                  {path.prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>
            )}

            {path.learningOutcomes && path.learningOutcomes.length > 0 && (
              <div className="path-outcomes">
                <h3>Learning Outcomes</h3>
                <ul>
                  {path.learningOutcomes.map((outcome, index) => (
                    <li key={index}>{outcome}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="overall-progress">
              <div className="progress-label">Overall Progress</div>
              <div className="progress-bar progress-bar-animated">
                <div
                  className="progress"
                  style={{ width: `${userProgress.pathProgress || 0}%` }}
                ></div>
                <span>{userProgress.pathProgress || 0}% Complete</span>
              </div>
            </div>
          </div>
        </div>
      </ScrollReveal>

      <div className="learning-detail-content">
        <ScrollReveal animation="fade-in-left" delay={0.2}>
          <div className="modules-sidebar">
            <h2>Modules</h2>
            <div className="modules-list stagger-fade-up">
              {Array.isArray(modules) && modules.length > 0 ? (
                modules.map((module, index) => {
                  const isCompleted = userProgress.completedModules?.includes(module.id);
                  const progress = userProgress.moduleProgress?.[module.id] || 0;
                  const isActive = activeModuleId === module.id;
                  const isLocked = index > 0 && !userProgress.completedModules?.includes(modules[index-1].id);

                  return (
                    <div
                      key={module.id}
                      className={`module-item hover-lift ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''} ${isLocked ? 'locked' : ''}`}
                      onClick={() => !isLocked && handleModuleClick(module.id)}
                      data-index={index}
                      style={{"--stagger-delay": "0.08s"}}
                    >
                      <div className="module-status">
                        {isCompleted ? '✓' : isLocked ? '🔒' : progress > 0 ? '⋯' : '○'}
                      </div>
                      <div className="module-info">
                        <h3>{module.title}</h3>
                        <div className="module-meta">
                          <span><i className="fas fa-clock"></i> {module.estimatedTime}</span>
                          {progress > 0 && !isCompleted && (
                            <span><i className="fas fa-spinner"></i> {progress}% complete</span>
                          )}
                          {isLocked && (
                            <span className="locked-text">Complete previous module to unlock</span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="no-modules-message">
                  <p>No modules available for this learning path yet.</p>
                </div>
              )}
            </div>

            <div className="certificate-section">
              <h3>Path Certificate</h3>
              <div className="certificate-preview">
                <div className="certificate-icon">🏆</div>
                <div className="certificate-info">
                  <p>Complete all modules to earn your certificate</p>
                  <div className="certificate-progress">
                    <span>{userProgress.completedModules?.length || 0}/{modules.length} modules completed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal animation="fade-in-right" delay={0.3}>
          <div className="module-content">
            {activeModule ? (
              <>
                <h2 className="fade-in">{activeModule.title}</h2>
                <div className="module-description fade-in">
                  <p>{activeModule ? activeModule.description : 'Select a module to view its details.'}</p>
                </div>

                <div className="module-topics fade-in">
                  <h3>Topics Covered</h3>
                  <ul className="stagger-fade-up">
                    {activeModule && Array.isArray(activeModule.topics) ? (
                      activeModule.topics.map((topic, index) => (
                        <li key={index} data-index={index} style={{"--stagger-delay": "0.05s"}}>
                          <span className="topic-icon">📌</span> {topic}
                        </li>
                      ))
                    ) : (
                      <li>No topics available</li>
                    )}
                  </ul>
                </div>

                <div className="module-resources fade-in">
                  <h3>Learning Resources</h3>
                  <div className="resources-list stagger-fade-up">
                    {/* Show video resource if module has video */}
                    {activeModule && activeModule.hasVideo && activeModule.videoUrl && (
                      <div className="resource-item video-resource hover-lift" data-index="0">
                        <div className="resource-icon">
                          🎬
                        </div>
                        <div className="resource-info">
                          <h4>{activeModule.videoTitle || "Video Tutorial"}</h4>
                          <p>{activeModule.videoDescription || `Learn about ${activeModule.title}`}</p>
                          <div className="resource-meta">
                            <span><i className="fas fa-video"></i> Video</span>
                            <span><i className="fas fa-clock"></i> {activeModule.videoDuration || "Video tutorial"}</span>
                            <span><i className="fas fa-external-link-alt"></i> Source: {activeModule.videoSource || "YouTube"}</span>
                          </div>
                        </div>
                        <div className="resource-preview">
                          <img
                            src={`https://img.youtube.com/vi/${activeModule.videoUrl.split('/').pop()}/mqdefault.jpg`}
                            alt="Video thumbnail"
                            className="video-thumbnail"
                          />
                        </div>
                      </div>
                    )}

                    {/* Show other resources if available */}
                    {activeModule && Array.isArray(activeModule.resources) && activeModule.resources.length > 0 ? (
                      activeModule.resources.map((resource, index) => (
                        <div
                          key={index}
                          className="resource-item hover-lift"
                          data-index={activeModule.hasVideo ? index + 1 : index}
                          style={{"--stagger-delay": "0.08s"}}
                        >
                          <div className="resource-icon">
                            {resource.type === 'video' ? '🎬' :
                             resource.type === 'article' ? '📄' :
                             resource.type === 'exercise' ? '💻' : '📚'}
                          </div>
                          <div className="resource-info">
                            <h4>{resource.title}</h4>
                            <p>{resource.description}</p>
                            <div className="resource-meta">
                              <span>{resource.type}</span>
                              <span>{resource.duration}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      activeModule && !activeModule.hasVideo && (
                        <div className="no-resources-message" data-index="0">
                          <p>No learning resources available for this module yet.</p>
                        </div>
                      )
                    )}

                    {/* Show message if no active module */}
                    {!activeModule && (
                      <div className="no-resources-message">
                        <p>Select a module from the sidebar to view its resources.</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="module-actions fade-in">
                  {activeModule && (
                    userProgress.moduleProgress?.[activeModule.id] > 0 && userProgress.moduleProgress?.[activeModule.id] < 100 ? (
                      <button
                        className="continue-module-btn btn-primary pulse"
                        onClick={() => handleContinueModule(activeModule.id)}
                      >
                        Continue Module
                        <span className="btn-glow"></span>
                      </button>
                    ) : userProgress.completedModules?.includes(activeModule.id) ? (
                      <button
                        className="review-module-btn btn-primary"
                        onClick={() => handleStartModule(activeModule.id)}
                      >
                        Review Module
                        <span className="btn-glow"></span>
                      </button>
                    ) : (
                      <button
                        className="start-module-btn btn-primary pulse"
                        onClick={() => handleStartModule(activeModule.id)}
                      >
                        Start Module
                        <span className="btn-glow"></span>
                      </button>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="no-module-selected">
                <p>Select a module from the sidebar to view its content</p>
              </div>
            )}
          </div>
        </ScrollReveal>
      </div>

      <ScrollReveal animation="fade-in-up" delay={0.4}>
        <div className="related-paths-section">
          <h2>Related Learning Paths</h2>
          <div className="related-paths">
            <div className="related-path-card hover-lift">
              <h3>JavaScript Fundamentals</h3>
              <p>Master the fundamentals of JavaScript, the language of the web.</p>
              <button className="view-path-btn" onClick={() => navigate('/learning/lang-js-1')}>
                View Path
              </button>
            </div>
            <div className="related-path-card hover-lift">
              <h3>React Fundamentals</h3>
              <p>Learn React, the popular JavaScript library for building user interfaces.</p>
              <button className="view-path-btn" onClick={() => navigate('/learning/lang-react-1')}>
                View Path
              </button>
            </div>
            <div className="related-path-card hover-lift">
              <h3>Python Fundamentals</h3>
              <p>Learn Python from scratch - one of the most beginner-friendly programming languages.</p>
              <button className="view-path-btn" onClick={() => navigate('/learning/lang-py-1')}>
                View Path
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>
    </div>
  );
}

// Mock data functions
function getMockPath(pathId) {
  const paths = {
    "1": {
      id: "1",
      title: "Data Structures Fundamentals",
      difficulty: "Beginner",
      moduleCount: 5,
      estimatedTime: "10-12 hours",
      description: "Master the essential data structures that form the foundation of efficient algorithms and software development. This path covers arrays, linked lists, stacks, queues, trees, and more.",
      prerequisites: ["Basic programming knowledge", "Understanding of variables and functions"],
      learningOutcomes: [
        "Implement common data structures from scratch",
        "Analyze the time and space complexity of operations",
        "Choose the right data structure for specific problems",
        "Optimize code using appropriate data structures"
      ]
    },
    "2": {
      id: "2",
      title: "Advanced Algorithms Mastery",
      difficulty: "Advanced",
      moduleCount: 7,
      estimatedTime: "15-20 hours",
      description: "Dive deep into advanced algorithmic techniques used in competitive programming and technical interviews. Learn graph algorithms, dynamic programming, and optimization techniques.",
      prerequisites: ["Strong programming foundation", "Basic data structures knowledge", "Understanding of time complexity"],
      learningOutcomes: [
        "Solve complex algorithmic problems efficiently",
        "Implement advanced algorithms from scratch",
        "Optimize solutions for time and space complexity",
        "Apply algorithmic thinking to real-world problems"
      ]
    }
  };

  return paths[pathId];
}

function getMockModules(pathId) {
  if (pathId === "1") {
    return [
      {
        id: "m1",
        title: "Arrays and Strings",
        description: "Learn about arrays, dynamic arrays, and string manipulation techniques. Understand how arrays are stored in memory and the complexity of common operations.",
        estimatedTime: "2 hours",
        topics: [
          "Static vs Dynamic Arrays",
          "Array Memory Layout",
          "Common Array Operations",
          "String Manipulation",
          "Array-based Techniques"
        ],
        resources: [
          {
            type: "article",
            title: "Introduction to Arrays",
            description: "A comprehensive guide to understanding arrays and their implementation",
            duration: "15 min read",
            url: "https://example.com/arrays-intro"
          },
          {
            type: "video",
            title: "Array Data Structure",
            description: "Visual explanation of how arrays work in memory",
            duration: "22 min",
            url: "https://example.com/array-video"
          },
          {
            type: "exercise",
            title: "Array Manipulation Practice",
            description: "Solve 5 problems involving array operations",
            duration: "45 min",
            url: "https://example.com/array-exercises"
          }
        ]
      },
      {
        id: "m2",
        title: "Linked Lists",
        description: "Explore singly and doubly linked lists, their implementation, and common operations. Learn when to use linked lists over arrays.",
        estimatedTime: "2.5 hours",
        topics: [
          "Singly Linked Lists",
          "Doubly Linked Lists",
          "Circular Linked Lists",
          "Linked List Operations",
          "Linked List vs Arrays"
        ],
        resources: [
          {
            type: "article",
            title: "Linked Lists Explained",
            description: "Detailed explanation of linked list data structures",
            duration: "20 min read",
            url: "https://example.com/linked-lists"
          },
          {
            type: "video",
            title: "Implementing Linked Lists",
            description: "Step-by-step guide to implementing linked lists from scratch",
            duration: "35 min",
            url: "https://example.com/linked-list-implementation"
          },
          {
            type: "exercise",
            title: "Linked List Challenges",
            description: "Practice problems focusing on linked list manipulation",
            duration: "1 hour",
            url: "https://example.com/linked-list-exercises"
          }
        ]
      },
      {
        id: "m3",
        title: "Stacks and Queues",
        description: "Learn about stack and queue data structures, their implementations, and applications. Understand LIFO and FIFO principles.",
        estimatedTime: "2 hours",
        topics: [
          "Stack Operations and Implementation",
          "Queue Operations and Implementation",
          "Circular Queues",
          "Priority Queues",
          "Applications of Stacks and Queues"
        ],
        resources: [
          {
            type: "article",
            title: "Understanding Stacks and Queues",
            description: "Comprehensive guide to stack and queue data structures",
            duration: "25 min read",
            url: "https://example.com/stacks-queues"
          },
          {
            type: "video",
            title: "Stack and Queue Visualized",
            description: "Visual explanation of how stacks and queues work",
            duration: "28 min",
            url: "https://example.com/stack-queue-video"
          },
          {
            type: "exercise",
            title: "Stack and Queue Problems",
            description: "Solve problems using stacks and queues",
            duration: "50 min",
            url: "https://example.com/stack-queue-exercises"
          }
        ]
      },
      {
        id: "m4",
        title: "Trees and Binary Search Trees",
        description: "Explore tree data structures with a focus on binary trees and binary search trees. Learn tree traversal algorithms and operations.",
        estimatedTime: "3 hours",
        topics: [
          "Tree Terminology",
          "Binary Trees",
          "Binary Search Trees",
          "Tree Traversal Algorithms",
          "BST Operations"
        ],
        resources: [
          {
            type: "article",
            title: "Introduction to Trees",
            description: "Learn about tree data structures and their properties",
            duration: "30 min read",
            url: "https://example.com/trees-intro"
          },
          {
            type: "video",
            title: "Binary Search Trees Explained",
            description: "Detailed explanation of BST with examples",
            duration: "40 min",
            url: "https://example.com/bst-video"
          },
          {
            type: "exercise",
            title: "Tree Traversal Practice",
            description: "Implement different tree traversal algorithms",
            duration: "1.5 hours",
            url: "https://example.com/tree-exercises"
          }
        ]
      },
      {
        id: "m5",
        title: "Hash Tables",
        description: "Learn about hash tables, hash functions, collision resolution, and implementation techniques. Understand when to use hash tables for optimal performance.",
        estimatedTime: "2.5 hours",
        topics: [
          "Hash Functions",
          "Collision Resolution Techniques",
          "Hash Table Implementation",
          "Hash Table Operations",
          "Applications of Hash Tables"
        ],
        resources: [
          {
            type: "article",
            title: "Hash Tables Demystified",
            description: "Comprehensive guide to understanding hash tables",
            duration: "25 min read",
            url: "https://example.com/hash-tables"
          },
          {
            type: "video",
            title: "Hash Functions and Collision Resolution",
            description: "Learn about different hash functions and handling collisions",
            duration: "35 min",
            url: "https://example.com/hash-functions-video"
          },
          {
            type: "exercise",
            title: "Hash Table Implementation Challenge",
            description: "Build your own hash table from scratch",
            duration: "1 hour",
            url: "https://example.com/hash-table-exercise"
          }
        ]
      }
    ];
  } else if (pathId === "2") {
    // Return modules for Advanced Algorithms Mastery path
    return [
      {
        id: "m1",
        title: "Graph Algorithms Fundamentals",
        description: "Learn about graph representations and fundamental graph algorithms including traversals, shortest paths, and minimum spanning trees.",
        estimatedTime: "3 hours",
        topics: [
          "Graph Representations",
          "Breadth-First Search (BFS)",
          "Depth-First Search (DFS)",
          "Topological Sort",
          "Connected Components"
        ],
        resources: [
          {
            type: "article",
            title: "Introduction to Graph Theory",
            description: "Comprehensive overview of graph concepts and terminology",
            duration: "30 min read",
            url: "https://example.com/graph-theory"
          },
          {
            type: "video",
            title: "Graph Traversal Algorithms",
            description: "Visual explanation of BFS and DFS with examples",
            duration: "45 min",
            url: "https://example.com/graph-traversal"
          },
          {
            type: "exercise",
            title: "Graph Algorithm Implementation",
            description: "Implement BFS, DFS, and topological sort",
            duration: "1.5 hours",
            url: "https://example.com/graph-exercises"
          }
        ]
      },
      // Additional modules would be defined here
    ];
  }

  return [];
}

export default LearningPathDetail;
