import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './LearningCenter.css';
import '../styles/animations.css';
import ScrollReveal from '../components/ScrollReveal';

function LearningCenter() {
  const [paths, setPaths] = useState([]);
  const [userProgress, setUserProgress] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch learning paths
    fetchLearningPaths();
    fetchUserProgress();
  }, []);

  const fetchLearningPaths = async () => {
    try {
      setLoading(true);
      // In a real implementation, this would call your API
      // For now, we'll use mock data
      setTimeout(() => {
        setPaths(getLearningPathsData());
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
          "6": 0
        });
      }, 1000);
    } catch (error) {
      console.error("Error fetching user progress:", error);
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

  const filteredPaths = activeTab === 'all'
    ? paths
    : activeTab === 'algorithms'
      ? paths.filter(path => !path.isLanguage)
      : paths.filter(path => path.isLanguage);

  if (loading) {
    return (
      <div className="learning-center-container">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading learning paths...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="learning-center-container">
      <ScrollReveal animation="fade-in-down">
        <div className="learning-center-header">
          <h1 className="animated-gradient">Learning Center</h1>
          <p>Explore our curated learning paths to master programming concepts</p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0.2}>
        <div className="featured-path">
          <h2>Recommended Path</h2>
          <div
            className="featured-path-card card-shine hover-lift"
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
              className="continue-btn btn-primary"
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
    </div>
  );
}

// Function to get learning paths data
function getLearningPathsData() {
  // Combine algorithm paths and language paths
  return [...getAlgorithmPaths(), ...getLanguagePaths()];
}

// Function to get algorithm and general programming paths
export function getAlgorithmPaths() {
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

// Function to get programming language learning paths
export function getLanguagePaths() {
  return [
    {
      id: "7",
      title: "Python Mastery: From Beginner to Pro",
      difficulty: "Beginner to Advanced",
      moduleCount: 10,
      estimatedTime: "25-30 hours",
      description: "Comprehensive Python learning path covering everything from basic syntax to advanced concepts like decorators, generators, and metaprogramming. Includes practical projects and real-world applications.",
      source: "Python.org, Real Python, MIT OpenCourseWare",
      isLanguage: true,
      language: "Python",
      modules: [
        {
          id: "py-mod-1",
          title: "Python Fundamentals",
          description: "Learn the basics of Python programming language, including syntax, data types, control flow, and functions.",
          estimatedTime: "3-4 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=rfscVS0vtbw",
          videoTitle: "Learn Python - Full Course for Beginners",
          videoDescription: "This comprehensive course will introduce you to the Python programming language from scratch.",
          videoSource: "freeCodeCamp",
          videoDuration: "4h 26m",
          topics: ["Syntax Basics", "Data Types", "Control Flow", "Functions"],
          resources: [
            { type: "Documentation", link: "https://docs.python.org/3/tutorial/", title: "Official Python Tutorial" },
            { type: "Video", link: "https://www.youtube.com/watch?v=rfscVS0vtbw", title: "Learn Python - Full Course for Beginners [freeCodeCamp]" }
          ]
        },
        {
          id: "py-mod-2",
          title: "Data Structures in Python",
          description: "Master Python's built-in data structures and learn how to use them effectively in your programs.",
          estimatedTime: "4-5 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=R-HLU9Fl5ug",
          videoTitle: "Python Data Structures Tutorial",
          videoDescription: "Learn about Python's powerful data structures and how to use them in your programs.",
          videoSource: "Programming with Mosh",
          videoDuration: "1h 12m",
          topics: ["Lists", "Dictionaries", "Sets", "Tuples", "Collections Module"],
          resources: [
            { type: "Documentation", link: "https://realpython.com/python-data-structures/", title: "Python Data Structures" },
            { type: "Video", link: "https://www.youtube.com/watch?v=R-HLU9Fl5ug", title: "Python Data Structures Tutorial" }
          ]
        },
        {
          id: "py-mod-3",
          title: "Object-Oriented Programming",
          description: "Learn how to use Python's object-oriented programming features to create reusable and maintainable code.",
          estimatedTime: "5-6 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=ZDa-Z5JzLYM",
          videoTitle: "Python OOP Tutorial Series",
          videoDescription: "This tutorial series will teach you everything you need to know about object-oriented programming in Python.",
          videoSource: "Corey Schafer",
          videoDuration: "6h 30m (Series)",
          topics: ["Classes & Objects", "Inheritance", "Polymorphism", "Encapsulation"],
          resources: [
            { type: "Documentation", link: "https://realpython.com/python3-object-oriented-programming/", title: "OOP in Python 3" },
            { type: "Video", link: "https://www.youtube.com/watch?v=ZDa-Z5JzLYM", title: "Python OOP Tutorial Series" }
          ]
        }
      ]
    },
    {
      id: "8",
      title: "JavaScript: Complete Developer Guide",
      difficulty: "Beginner to Advanced",
      moduleCount: 12,
      estimatedTime: "30-35 hours",
      description: "Master JavaScript from the ground up. Learn core concepts, ES6+ features, asynchronous programming, and modern frameworks. Build real-world projects to solidify your knowledge.",
      source: "MDN Web Docs, JavaScript.info, freeCodeCamp",
      isLanguage: true,
      language: "JavaScript",
      modules: [
        {
          id: "js-mod-1",
          title: "JavaScript Fundamentals",
          description: "Learn the core concepts of JavaScript, including variables, data types, operators, control flow, and functions.",
          estimatedTime: "4-5 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=PkZNo7MFNFg",
          videoTitle: "Learn JavaScript - Full Course for Beginners",
          videoDescription: "This comprehensive course will introduce you to JavaScript from scratch, covering all the fundamentals you need to know.",
          videoSource: "freeCodeCamp",
          videoDuration: "3h 26m",
          topics: ["Variables & Data Types", "Operators", "Control Flow", "Functions"],
          resources: [
            { type: "Documentation", link: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide", title: "MDN JavaScript Guide" },
            { type: "Video", link: "https://www.youtube.com/watch?v=PkZNo7MFNFg", title: "Learn JavaScript - Full Course for Beginners [freeCodeCamp]" }
          ]
        },
        {
          id: "js-mod-2",
          title: "Advanced JavaScript Concepts",
          description: "Dive deeper into JavaScript's advanced concepts, including closures, prototypes, the 'this' keyword, and ES6+ features.",
          estimatedTime: "5-6 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=Mus_vwhTCq0",
          videoTitle: "JavaScript: Understanding the Weird Parts",
          videoDescription: "This in-depth course explains JavaScript's most confusing and advanced concepts in a clear, understandable way.",
          videoSource: "Tony Alicea",
          videoDuration: "3h 28m",
          topics: ["Closures", "Prototypes", "This Keyword", "ES6+ Features"],
          resources: [
            { type: "Documentation", link: "https://javascript.info/", title: "The Modern JavaScript Tutorial" },
            { type: "Video", link: "https://www.youtube.com/watch?v=Mus_vwhTCq0", title: "JavaScript: Understanding the Weird Parts" }
          ]
        },
        {
          id: "js-mod-3",
          title: "Asynchronous JavaScript",
          description: "Master asynchronous programming in JavaScript, including callbacks, promises, async/await, and the event loop.",
          estimatedTime: "4-5 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=8aGhZQkoFbQ",
          videoTitle: "What the heck is the event loop anyway?",
          videoDescription: "This talk explains how JavaScript's event loop works and how it enables asynchronous programming.",
          videoSource: "JSConf",
          videoDuration: "26m 52s",
          topics: ["Callbacks", "Promises", "Async/Await", "Event Loop"],
          resources: [
            { type: "Documentation", link: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous", title: "Asynchronous JavaScript" },
            { type: "Video", link: "https://www.youtube.com/watch?v=8aGhZQkoFbQ", title: "What the heck is the event loop anyway?" }
          ]
        }
      ]
    },
    {
      id: "9",
      title: "Java Programming: Complete Course",
      difficulty: "Beginner to Advanced",
      moduleCount: 10,
      estimatedTime: "28-32 hours",
      description: "Comprehensive Java learning path covering core concepts, object-oriented programming, collections, multithreading, and enterprise Java development. Includes hands-on projects and best practices.",
      source: "Oracle Java Documentation, Baeldung, Java Brains",
      isLanguage: true,
      language: "Java",
      modules: [
        {
          id: "java-mod-1",
          title: "Java Fundamentals",
          description: "Learn the basics of Java programming language, including syntax, data types, control flow, and methods.",
          estimatedTime: "4-5 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=eIrMbAQSU34",
          videoTitle: "Java Tutorial for Beginners",
          videoDescription: "This comprehensive course will introduce you to Java programming from scratch, covering all the fundamentals you need to know.",
          videoSource: "Programming with Mosh",
          videoDuration: "2h 30m",
          topics: ["Syntax Basics", "Data Types", "Control Flow", "Methods"],
          resources: [
            { type: "Documentation", link: "https://docs.oracle.com/javase/tutorial/", title: "The Java Tutorials" },
            { type: "Video", link: "https://www.youtube.com/watch?v=eIrMbAQSU34", title: "Java Tutorial for Beginners [Programming with Mosh]" }
          ]
        },
        {
          id: "java-mod-2",
          title: "Object-Oriented Programming in Java",
          description: "Master object-oriented programming concepts in Java, including classes, objects, inheritance, polymorphism, interfaces, and abstract classes.",
          estimatedTime: "5-6 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=7GwptabrYyk",
          videoTitle: "Object-Oriented Programming in Java",
          videoDescription: "This course covers all the essential object-oriented programming concepts in Java with practical examples.",
          videoSource: "Telusko",
          videoDuration: "1h 45m",
          topics: ["Classes & Objects", "Inheritance", "Polymorphism", "Interfaces", "Abstract Classes"],
          resources: [
            { type: "Documentation", link: "https://www.baeldung.com/java-tutorial", title: "Baeldung Java Tutorial" },
            { type: "Video", link: "https://www.youtube.com/watch?v=7GwptabrYyk", title: "Object-Oriented Programming in Java" }
          ]
        },
        {
          id: "java-mod-3",
          title: "Java Collections Framework",
          description: "Learn how to use Java's Collections Framework to store, manipulate, and process data efficiently.",
          estimatedTime: "4-5 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=VU4XYScntxw",
          videoTitle: "Java Collections Framework",
          videoDescription: "This tutorial covers all the essential collection types in Java, including lists, sets, maps, and queues.",
          videoSource: "Coding with John",
          videoDuration: "1h 20m",
          topics: ["Lists", "Sets", "Maps", "Queues", "Streams API"],
          resources: [
            { type: "Documentation", link: "https://docs.oracle.com/javase/tutorial/collections/", title: "Collections Framework Tutorial" },
            { type: "Video", link: "https://www.youtube.com/watch?v=VU4XYScntxw", title: "Java Collections Framework" }
          ]
        }
      ]
    },
    {
      id: "10",
      title: "C++ Programming Masterclass",
      difficulty: "Intermediate to Advanced",
      moduleCount: 9,
      estimatedTime: "25-30 hours",
      description: "Deep dive into C++ programming, covering modern C++ features, memory management, templates, STL, and performance optimization. Build robust and efficient applications with C++.",
      source: "CPlusPlus.com, C++ Reference, The Cherno",
      isLanguage: true,
      language: "C++",
      modules: [
        {
          id: "cpp-mod-1",
          title: "C++ Fundamentals",
          description: "Learn the basics of C++ programming language, including syntax, data types, control flow, functions, and pointers.",
          estimatedTime: "5-6 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=vLnPwxZdW4Y",
          videoTitle: "C++ Tutorial for Beginners - Full Course",
          videoDescription: "This comprehensive course will introduce you to C++ programming from scratch, covering all the fundamentals you need to know.",
          videoSource: "freeCodeCamp",
          videoDuration: "4h 1m",
          topics: ["Syntax Basics", "Data Types", "Control Flow", "Functions", "Pointers"],
          resources: [
            { type: "Documentation", link: "https://www.learncpp.com/", title: "Learn C++" },
            { type: "Video", link: "https://www.youtube.com/watch?v=vLnPwxZdW4Y", title: "C++ Tutorial for Beginners - Full Course [freeCodeCamp]" }
          ]
        },
        {
          id: "cpp-mod-2",
          title: "Object-Oriented Programming in C++",
          description: "Master object-oriented programming concepts in C++, including classes, objects, inheritance, polymorphism, and operator overloading.",
          estimatedTime: "4-5 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=wN0x9eZLix4",
          videoTitle: "Object-Oriented Programming in C++",
          videoDescription: "This course covers all the essential object-oriented programming concepts in C++ with practical examples.",
          videoSource: "The Cherno",
          videoDuration: "1h 30m",
          topics: ["Classes & Objects", "Inheritance", "Polymorphism", "Operator Overloading"],
          resources: [
            { type: "Documentation", link: "https://en.cppreference.com/w/cpp/language/classes", title: "C++ Classes Reference" },
            { type: "Video", link: "https://www.youtube.com/watch?v=wN0x9eZLix4", title: "Object-Oriented Programming in C++" }
          ]
        },
        {
          id: "cpp-mod-3",
          title: "Modern C++ Features",
          description: "Explore modern C++ features introduced in C++11, C++14, and C++17, including smart pointers, move semantics, lambda expressions, and templates.",
          estimatedTime: "5-6 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=PNRju6_yn3o",
          videoTitle: "Modern C++ Features",
          videoDescription: "This tutorial covers the modern features of C++ that make the language more powerful and easier to use.",
          videoSource: "CppCon",
          videoDuration: "1h 45m",
          topics: ["Smart Pointers", "Move Semantics", "Lambda Expressions", "Templates"],
          resources: [
            { type: "Documentation", link: "https://en.cppreference.com/w/cpp/language", title: "C++ Language Reference" },
            { type: "Video", link: "https://www.youtube.com/watch?v=PNRju6_yn3o", title: "Modern C++ Features" }
          ]
        }
      ]
    },
    {
      id: "11",
      title: "HTML & CSS: Web Development Fundamentals",
      difficulty: "Beginner",
      moduleCount: 8,
      estimatedTime: "20-25 hours",
      description: "Learn the building blocks of web development with HTML and CSS. Master semantic HTML, responsive design, CSS layouts, animations, and modern CSS frameworks.",
      source: "MDN Web Docs, W3Schools, CSS-Tricks",
      isLanguage: true,
      language: "HTML/CSS",
      modules: [
        {
          id: "html-mod-1",
          title: "HTML Fundamentals",
          description: "Learn the basics of HTML, including document structure, semantic elements, forms, and multimedia.",
          estimatedTime: "3-4 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=pQN-pnXPaVg",
          videoTitle: "HTML Full Course - Build a Website Tutorial",
          videoDescription: "This comprehensive course will introduce you to HTML from scratch, covering all the fundamentals you need to know.",
          videoSource: "freeCodeCamp",
          videoDuration: "2h 1m",
          topics: ["Document Structure", "Semantic Elements", "Forms", "Multimedia"],
          resources: [
            { type: "Documentation", link: "https://developer.mozilla.org/en-US/docs/Learn/HTML", title: "MDN HTML Guide" },
            { type: "Video", link: "https://www.youtube.com/watch?v=pQN-pnXPaVg", title: "HTML Full Course - Build a Website Tutorial [freeCodeCamp]" }
          ]
        },
        {
          id: "css-mod-1",
          title: "CSS Fundamentals",
          description: "Master the basics of CSS, including selectors, the box model, typography, colors, and backgrounds.",
          estimatedTime: "4-5 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=1Rs2ND1ryYc",
          videoTitle: "CSS Tutorial - Zero to Hero",
          videoDescription: "This course covers all the essential CSS concepts you need to know to style your web pages.",
          videoSource: "freeCodeCamp",
          videoDuration: "1h 30m",
          topics: ["Selectors", "Box Model", "Typography", "Colors & Backgrounds"],
          resources: [
            { type: "Documentation", link: "https://developer.mozilla.org/en-US/docs/Learn/CSS", title: "MDN CSS Guide" },
            { type: "Video", link: "https://www.youtube.com/watch?v=1Rs2ND1ryYc", title: "CSS Tutorial - Zero to Hero [freeCodeCamp]" }
          ]
        },
        {
          id: "css-mod-2",
          title: "Responsive Web Design",
          description: "Learn how to create responsive websites that look great on all devices using media queries, flexbox, and CSS grid.",
          estimatedTime: "4-5 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=JJSoEo8JSnc",
          videoTitle: "Flexbox CSS In 20 Minutes",
          videoDescription: "This tutorial explains how to use CSS Flexbox to create flexible and responsive layouts.",
          videoSource: "Traversy Media",
          videoDuration: "20m",
          topics: ["Media Queries", "Flexbox", "CSS Grid", "Mobile-First Design"],
          resources: [
            { type: "Documentation", link: "https://css-tricks.com/snippets/css/a-guide-to-flexbox/", title: "A Complete Guide to Flexbox" },
            { type: "Video", link: "https://www.youtube.com/watch?v=JJSoEo8JSnc", title: "Flexbox CSS In 20 Minutes" }
          ]
        }
      ]
    },
    {
      id: "12",
      title: "Go (Golang) Programming: From Basics to Advanced",
      difficulty: "Beginner to Advanced",
      moduleCount: 8,
      estimatedTime: "22-26 hours",
      description: "Master Go programming language from scratch. Learn Go's concurrency model, standard library, error handling, and best practices for building efficient and scalable applications.",
      source: "Go.dev, Go by Example, Ardan Labs",
      isLanguage: true,
      language: "Go",
      modules: [
        {
          id: "go-mod-1",
          title: "Go Fundamentals",
          description: "Learn the basics of Go programming language, including syntax, data types, control flow, functions, and packages.",
          estimatedTime: "4-5 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=YS4e4q9oBaU",
          videoTitle: "Learn Go Programming - Golang Tutorial for Beginners",
          videoDescription: "This comprehensive course will introduce you to Go programming from scratch, covering all the fundamentals you need to know.",
          videoSource: "freeCodeCamp",
          videoDuration: "3h 26m",
          topics: ["Syntax Basics", "Data Types", "Control Flow", "Functions", "Packages"],
          resources: [
            { type: "Documentation", link: "https://go.dev/doc/", title: "Go Documentation" },
            { type: "Video", link: "https://www.youtube.com/watch?v=YS4e4q9oBaU", title: "Learn Go Programming - Golang Tutorial for Beginners [freeCodeCamp]" }
          ]
        },
        {
          id: "go-mod-2",
          title: "Go Concurrency",
          description: "Master Go's powerful concurrency model, including goroutines, channels, select, and concurrency patterns.",
          estimatedTime: "3-4 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=LvgVSSpwND8",
          videoTitle: "Concurrency in Go",
          videoDescription: "This tutorial explains Go's concurrency model and how to use goroutines and channels effectively.",
          videoSource: "Jake Wright",
          videoDuration: "45m",
          topics: ["Goroutines", "Channels", "Select", "Sync Package", "Concurrency Patterns"],
          resources: [
            { type: "Documentation", link: "https://gobyexample.com/", title: "Go by Example: Concurrency" },
            { type: "Video", link: "https://www.youtube.com/watch?v=LvgVSSpwND8", title: "Concurrency in Go" }
          ]
        },
        {
          id: "go-mod-3",
          title: "Building Web Applications with Go",
          description: "Learn how to build web applications with Go, including HTTP servers, routing, middleware, database integration, and REST APIs.",
          estimatedTime: "5-6 hours",
          hasVideo: true,
          videoUrl: "https://www.youtube.com/watch?v=jFfo23yIWac",
          videoTitle: "Building Web Apps with Go",
          videoDescription: "This tutorial shows you how to build web applications with Go from scratch.",
          videoSource: "Traversy Media",
          videoDuration: "1h 15m",
          topics: ["HTTP Server", "Routing", "Middleware", "Database Integration", "REST APIs"],
          resources: [
            { type: "Documentation", link: "https://golang.org/doc/articles/wiki/", title: "Writing Web Applications in Go" },
            { type: "Video", link: "https://www.youtube.com/watch?v=jFfo23yIWac", title: "Building Web Apps with Go" }
          ]
        }
      ]
    }
  ];
}

export default LearningCenter;
