import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ParticleCanvas3D from '../components/ParticleCanvas3D';
import PremiumButton from '../components/PremiumButton';
import PremiumCard from '../components/PremiumCard';
import AnimatedText from '../components/AnimatedText';
import PremiumCodeEditor from '../components/PremiumCodeEditor';

import './HomePage.css';
import '../styles/designSystem.css';
import '../styles/premiumAnimations.css';

// Sample code for the code editor
const sampleCode = `function findOptimalSolution(array) {
  // Initialize variables
  let result = [];
  let current = 0;
  let best = -Infinity;

  // Iterate through the array
  for (let i = 0; i < array.length; i++) {
    // Update current sum
    current = Math.max(array[i], current + array[i]);

    // Update best result if needed
    best = Math.max(best, current);

    // Add to result if it improves solution
    if (current > 0) {
      result.push(array[i]);
    }
  }

  // Return the optimal solution
  return { result, maxSum: best };
}`;

function HomePage() {
  const [showDemo, setShowDemo] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const navigate = useNavigate();

  // Add scroll event listener for section animations
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      // Get sections
      const featuresSection = document.querySelector('.features-section');
      const learningPathsSection = document.querySelector('.learning-paths-section');

      // Determine active section based on scroll position
      if (featuresSection && scrollPosition >= featuresSection.offsetTop - windowHeight / 2) {
        setActiveSection('features');
      } else if (learningPathsSection && scrollPosition >= learningPathsSection.offsetTop - windowHeight / 2) {
        setActiveSection('learning-paths');
      } else {
        setActiveSection('hero');
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleWatchDemo = () => {
    setShowDemo(true);
  };

  const handleCloseDemo = () => {
    setShowDemo(false);
  };

  const handleGetStarted = () => {
    navigate('/battle/practice');
  };

  const handleTypingComplete = () => {
    setTypingComplete(true);
  };

  return (
    <div className="home-container">
      {/* Hero section with 3D particle background */}
      <div className="hero-section">
        <ParticleCanvas3D
          particleCount={150}
          particleColor="rgba(99, 102, 241, 0.8)"
          depth={400}
          speed={0.3}
          connectParticles={true}
        />

        <div className="hero-content">
          <h1 className="hero-title">
            <AnimatedText
              text="Master Coding."
              variant="gradient"
              animation="typing"
              speed={80}
              delay={300}
              onComplete={handleTypingComplete}
            />
            <br />
            <AnimatedText
              text="Get Hired."
              variant="gradient"
              animation="typing"
              speed={80}
              delay={1500}
            />
          </h1>
          <p className={`hero-subtitle ${typingComplete ? 'animate-fade-up' : 'hidden'}`}>
            AI-driven competitive coding platform that evaluates your skills and connects you to opportunities
          </p>
          <div className={`hero-buttons ${typingComplete ? 'animate-fade-up delay-300' : 'hidden'}`}>
            <PremiumButton
              variant="primary"
              size="lg"
              onClick={handleGetStarted}
              glowEffect={true}
              hoverScale={true}
              icon={<span>🚀</span>}
            >
              Get Started
            </PremiumButton>

            <PremiumButton
              variant="outline"
              size="lg"
              onClick={handleWatchDemo}
              icon={<span>▶️</span>}
            >
              Watch Demo
            </PremiumButton>
          </div>
        </div>

        <div className="code-animation">
          <PremiumCodeEditor
            code={sampleCode}
            language="javascript"
            theme="dracula"
            animate={true}
            typingSpeed={20}
            highlightLines={[7, 10, 13, 20]}
          />
        </div>
      </div>

      <section className="features-section">
        <h2>
          <AnimatedText
            text="Why Choose AlgoHunt?"
            variant="shimmer"
            animation="fade-in"
          />
        </h2>
        <div className="features-grid">
          <PremiumCard
            variant="dark"
            elevation="lg"
            hoverEffect={true}
            glowEffect={true}
            glowColor="primary"
            className={`animate-fade-up delay-100 ${activeSection === 'features' ? 'animate-play' : 'animate-pause'}`}
          >
            <PremiumCard.Header>
              <div className="feature-icon">
                <span className="icon-symbol animate-pulse">🧠</span>
              </div>
            </PremiumCard.Header>
            <PremiumCard.Body>
              <PremiumCard.Title>AI-Powered Matchmaking</PremiumCard.Title>
              <PremiumCard.Text>
                Our advanced AI matches you with opponents at your skill level for fair and challenging battles
              </PremiumCard.Text>
            </PremiumCard.Body>
          </PremiumCard>

          <PremiumCard
            variant="dark"
            elevation="lg"
            hoverEffect={true}
            glowEffect={true}
            glowColor="secondary"
            className={`animate-fade-up delay-200 ${activeSection === 'features' ? 'animate-play' : 'animate-pause'}`}
          >
            <PremiumCard.Header>
              <div className="feature-icon">
                <span className="icon-symbol animate-pulse">📊</span>
              </div>
            </PremiumCard.Header>
            <PremiumCard.Body>
              <PremiumCard.Title>Skill Assessment</PremiumCard.Title>
              <PremiumCard.Text>
                Get detailed insights about your coding strengths and areas for improvement
              </PremiumCard.Text>
            </PremiumCard.Body>
          </PremiumCard>

          <PremiumCard
            variant="dark"
            elevation="lg"
            hoverEffect={true}
            glowEffect={true}
            glowColor="accent"
            className={`animate-fade-up delay-300 ${activeSection === 'features' ? 'animate-play' : 'animate-pause'}`}
          >
            <PremiumCard.Header>
              <div className="feature-icon">
                <span className="icon-symbol animate-pulse">🏆</span>
              </div>
            </PremiumCard.Header>
            <PremiumCard.Body>
              <PremiumCard.Title>Competitive Tournaments</PremiumCard.Title>
              <PremiumCard.Text>
                Participate in regular coding tournaments with prizes and recognition
              </PremiumCard.Text>
            </PremiumCard.Body>
          </PremiumCard>

          <PremiumCard
            variant="dark"
            elevation="lg"
            hoverEffect={true}
            glowEffect={true}
            glowColor="success"
            className={`animate-fade-up delay-400 ${activeSection === 'features' ? 'animate-play' : 'animate-pause'}`}
          >
            <PremiumCard.Header>
              <div className="feature-icon">
                <span className="icon-symbol animate-pulse">💼</span>
              </div>
            </PremiumCard.Header>
            <PremiumCard.Body>
              <PremiumCard.Title>Job Opportunities</PremiumCard.Title>
              <PremiumCard.Text>
                Connect directly with companies looking for your specific coding skills
              </PremiumCard.Text>
            </PremiumCard.Body>
          </PremiumCard>
        </div>
      </section>

      {/* Learning Paths Section */}
      <section className="learning-paths-section">
        <h2>
          <AnimatedText
            text="Learning Paths"
            variant="rainbow"
            animation="fade-in"
          />
        </h2>
        <div className="learning-paths-grid">
          <PremiumCard
            variant="gradient"
            elevation="xl"
            hoverEffect={true}
            borderEffect={true}
            className={`animate-fade-up delay-100 ${activeSection === 'learning-paths' ? 'animate-play' : 'animate-pause'}`}
          >
            <PremiumCard.Image
              src="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt="Data Structures"
            />
            <PremiumCard.Body>
              <PremiumCard.Badge variant="primary">Beginner to Advanced</PremiumCard.Badge>
              <PremiumCard.Title>Data Structures</PremiumCard.Title>
              <PremiumCard.Text>
                Master essential data structures like arrays, linked lists, trees, and graphs
              </PremiumCard.Text>
              <div className="card-button-container">
                <PremiumButton
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/learning')}
                  icon={<span>→</span>}
                  iconPosition="right"
                >
                  Explore Path
                </PremiumButton>
              </div>
            </PremiumCard.Body>
          </PremiumCard>

          <PremiumCard
            variant="gradient"
            elevation="xl"
            hoverEffect={true}
            borderEffect={true}
            className={`animate-fade-up delay-200 ${activeSection === 'learning-paths' ? 'animate-play' : 'animate-pause'}`}
          >
            <PremiumCard.Image
              src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt="Algorithms"
            />
            <PremiumCard.Body>
              <PremiumCard.Badge variant="secondary">Intermediate</PremiumCard.Badge>
              <PremiumCard.Title>Algorithms</PremiumCard.Title>
              <PremiumCard.Text>
                Learn sorting, searching, dynamic programming, and graph algorithms
              </PremiumCard.Text>
              <div className="card-button-container">
                <PremiumButton
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/learning')}
                  icon={<span>→</span>}
                  iconPosition="right"
                >
                  Explore Path
                </PremiumButton>
              </div>
            </PremiumCard.Body>
          </PremiumCard>

          <PremiumCard
            variant="gradient"
            elevation="xl"
            hoverEffect={true}
            borderEffect={true}
            className={`animate-fade-up delay-300 ${activeSection === 'learning-paths' ? 'animate-play' : 'animate-pause'}`}
          >
            <PremiumCard.Image
              src="https://images.unsplash.com/photo-1580894732444-8ecded7900cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
              alt="Problem Solving"
            />
            <PremiumCard.Body>
              <PremiumCard.Badge variant="accent">All Levels</PremiumCard.Badge>
              <PremiumCard.Title>Problem Solving</PremiumCard.Title>
              <PremiumCard.Text>
                Develop your problem-solving skills with real-world coding challenges
              </PremiumCard.Text>
              <div className="card-button-container">
                <PremiumButton
                  variant="outline"
                  size="md"
                  onClick={() => navigate('/learning')}
                  icon={<span>→</span>}
                  iconPosition="right"
                >
                  Explore Path
                </PremiumButton>
              </div>
            </PremiumCard.Body>
          </PremiumCard>
        </div>
      </section>

      {/* Demo Modal */}
      {showDemo && (
        <div className="demo-modal-overlay animate-fade-in">
          <div className="demo-modal animate-scale-in">
            <button className="close-demo-btn" onClick={handleCloseDemo}>×</button>
            <h2>
              <AnimatedText
                text="Welcome to AlgoHunt!"
                variant="gradient"
                animation="fade-in"
              />
            </h2>

            <div className="demo-steps">
              <PremiumCard
                variant="dark"
                elevation="md"
                glassmorphism={true}
                className="animate-fade-up delay-100"
              >
                <PremiumCard.Body>
                  <div className="step-number animate-pulse">1</div>
                  <PremiumCard.Title>Choose Your Battle</PremiumCard.Title>
                  <PremiumCard.Text>
                    Select from 1v1 battles, tournaments, or practice mode to improve your skills
                  </PremiumCard.Text>
                  <PremiumCard.Image
                    src="/images/demo/battle-selection.png"
                    alt="Battle Selection"
                  />
                </PremiumCard.Body>
              </PremiumCard>

              <PremiumCard
                variant="dark"
                elevation="md"
                glassmorphism={true}
                className="animate-fade-up delay-200"
              >
                <PremiumCard.Body>
                  <div className="step-number animate-pulse">2</div>
                  <PremiumCard.Title>Solve Coding Challenges</PremiumCard.Title>
                  <PremiumCard.Text>
                    Use our professional code editor with syntax highlighting and auto-completion
                  </PremiumCard.Text>
                  <PremiumCard.Image
                    src="/images/demo/code-editor.png"
                    alt="Code Editor"
                  />
                </PremiumCard.Body>
              </PremiumCard>

              <PremiumCard
                variant="dark"
                elevation="md"
                glassmorphism={true}
                className="animate-fade-up delay-300"
              >
                <PremiumCard.Body>
                  <div className="step-number animate-pulse">3</div>
                  <PremiumCard.Title>Track Your Progress</PremiumCard.Title>
                  <PremiumCard.Text>
                    Monitor your performance against opponents in real-time
                  </PremiumCard.Text>
                  <PremiumCard.Image
                    src="/images/demo/progress-tracking.png"
                    alt="Progress Tracking"
                  />
                </PremiumCard.Body>
              </PremiumCard>

              <PremiumCard
                variant="dark"
                elevation="md"
                glassmorphism={true}
                className="animate-fade-up delay-400"
              >
                <PremiumCard.Body>
                  <div className="step-number animate-pulse">4</div>
                  <PremiumCard.Title>Earn Achievements</PremiumCard.Title>
                  <PremiumCard.Text>
                    Unlock badges and climb the global leaderboard as you improve
                  </PremiumCard.Text>
                  <PremiumCard.Image
                    src="/images/demo/achievements.png"
                    alt="Achievements"
                  />
                </PremiumCard.Body>
              </PremiumCard>

              <PremiumCard
                variant="dark"
                elevation="md"
                glassmorphism={true}
                className="animate-fade-up delay-500"
              >
                <PremiumCard.Body>
                  <div className="step-number animate-pulse">5</div>
                  <PremiumCard.Title>Get Hired</PremiumCard.Title>
                  <PremiumCard.Text>
                    Connect with employers looking for developers with your specific skills
                  </PremiumCard.Text>
                  <PremiumCard.Image
                    src="/images/demo/job-board.png"
                    alt="Job Board"
                  />
                </PremiumCard.Body>
              </PremiumCard>
            </div>

            <div className="demo-actions">
              <PremiumButton
                variant="gradient"
                size="lg"
                onClick={() => {
                  handleCloseDemo();
                  navigate('/battle/practice');
                }}
                glowEffect={true}
                className="animate-fade-up delay-600"
              >
                Try Practice Mode Now
              </PremiumButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;






