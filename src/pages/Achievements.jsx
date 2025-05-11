import React, { useState, useEffect } from 'react';
import './Achievements.css';
import '../styles/animations.css';
import ScrollReveal from '../components/ScrollReveal';

function Achievements() {
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({});
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState('achievements');

  useEffect(() => {
    // Fetch user achievements, stats, and tasks
    fetchAchievements();
    fetchUserStats();
    fetchTasks();
  }, []);

  const fetchAchievements = async () => {
    // In a real implementation, this would call your API
    // For now, we'll use mock data
    setTimeout(() => {
      const mockAchievements = [
        {
          id: 1,
          title: "Algorithm Master",
          description: "Solved 50 algorithm challenges",
          icon: "🏆",
          unlocked: true,
          unlockedDate: "May 15, 2023",
          progress: 100
        },
        {
          id: 2,
          title: "Battle Champion",
          description: "Won 10 coding battles",
          icon: "🥇",
          unlocked: true,
          unlockedDate: "June 2, 2023",
          progress: 100
        },
        {
          id: 3,
          title: "Learning Enthusiast",
          description: "Completed 5 learning paths",
          icon: "📚",
          unlocked: false,
          progress: 60
        },
        {
          id: 4,
          title: "Code Reviewer",
          description: "Reviewed 20 code submissions",
          icon: "👀",
          unlocked: false,
          progress: 45
        },
        {
          id: 5,
          title: "Bug Hunter",
          description: "Found and fixed 15 bugs",
          icon: "🐛",
          unlocked: false,
          progress: 33
        },
        {
          id: 6,
          title: "Streak Master",
          description: "Maintained a 30-day coding streak",
          icon: "🔥",
          unlocked: false,
          progress: 70
        }
      ];
      setAchievements(mockAchievements);
    }, 500);
  };

  const fetchUserStats = async () => {
    // Fetch user's overall stats
    // For now, we'll use mock data
    setTimeout(() => {
      const mockStats = {
        battlesWon: 12,
        problemsSolved: 78,
        globalRank: 342,
        skillRating: 1842,
        certificates: [
          {
            id: 1,
            title: "Advanced Algorithms",
            issueDate: "April 10, 2023"
          },
          {
            id: 2,
            title: "Frontend Development",
            issueDate: "May 22, 2023"
          }
        ]
      };
      setStats(mockStats);
    }, 500);
  };

  const fetchTasks = async () => {
    // Fetch user's tasks
    // For now, we'll use mock data
    setTimeout(() => {
      const mockTasks = [
        {
          id: 1,
          title: "Complete 5 Easy Challenges",
          description: "Solve 5 easy difficulty coding challenges",
          reward: "50 XP",
          deadline: "June 30, 2023",
          progress: 80,
          completed: false,
          category: "Challenges"
        },
        {
          id: 2,
          title: "Win 3 Battles This Week",
          description: "Win 3 coding battles against other users",
          reward: "100 XP + Battle Champion Badge Progress",
          deadline: "June 25, 2023",
          progress: 66,
          completed: false,
          category: "Battles"
        },
        {
          id: 3,
          title: "Complete Data Structures Module",
          description: "Finish the Data Structures learning path module",
          reward: "150 XP + Learning Enthusiast Badge Progress",
          deadline: "July 5, 2023",
          progress: 45,
          completed: false,
          category: "Learning"
        },
        {
          id: 4,
          title: "Daily Coding Challenge",
          description: "Solve today's daily coding challenge",
          reward: "25 XP + Streak Bonus",
          deadline: "Today",
          progress: 0,
          completed: false,
          category: "Daily"
        },
        {
          id: 5,
          title: "Review 3 Community Solutions",
          description: "Review and provide feedback on 3 community solutions",
          reward: "75 XP + Code Reviewer Badge Progress",
          deadline: "June 28, 2023",
          progress: 33,
          completed: false,
          category: "Community"
        }
      ];
      setTasks(mockTasks);
    }, 500);
  };

  return (
    <div className="achievements-container">
      <ScrollReveal animation="fade-in-down">
        <div className="achievements-header">
          <h1 className="animated-gradient">Your Achievements</h1>
          <p>Track your progress and showcase your coding prowess</p>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0.2}>
        <div className="user-stats">
          <div className="stat-card hover-lift card-shine">
            <h3>Battles Won</h3>
            <div className="stat-value">{stats.battlesWon || 0}</div>
          </div>
          <div className="stat-card hover-lift card-shine">
            <h3>Problems Solved</h3>
            <div className="stat-value">{stats.problemsSolved || 0}</div>
          </div>
          <div className="stat-card hover-lift card-shine">
            <h3>Global Rank</h3>
            <div className="stat-value">{stats.globalRank || 'N/A'}</div>
          </div>
          <div className="stat-card hover-lift card-shine">
            <h3>Skill Rating</h3>
            <div className="stat-value">{stats.skillRating || 0}</div>
          </div>
        </div>
      </ScrollReveal>

      <ScrollReveal animation="fade-in-up" delay={0.3}>
        <div className="achievements-tabs">
          <button
            className={activeTab === 'achievements' ? 'active' : ''}
            onClick={() => setActiveTab('achievements')}
          >
            Achievements
          </button>
          <button
            className={activeTab === 'tasks' ? 'active' : ''}
            onClick={() => setActiveTab('tasks')}
          >
            Tasks
          </button>
          <button
            className={activeTab === 'certificates' ? 'active' : ''}
            onClick={() => setActiveTab('certificates')}
          >
            Certificates
          </button>
        </div>
      </ScrollReveal>

      {activeTab === 'achievements' && (
        <ScrollReveal animation="fade-in-up" delay={0.4}>
          <div className="badges-section">
            <h2>Your Badges</h2>
            <div className="badges-grid stagger-fade-up">
              {achievements.map((achievement, index) => (
                <div
                  key={achievement.id}
                  className={`badge-card hover-lift ${achievement.unlocked ? 'unlocked' : 'locked'}`}
                  data-index={index}
                  style={{"--stagger-delay": "0.1s"}}
                >
                  <div className="badge-icon">
                    {achievement.unlocked ? achievement.icon : '🔒'}
                  </div>
                  <h3>{achievement.title}</h3>
                  <p>{achievement.description}</p>
                  {achievement.unlocked &&
                    <div className="unlock-date">Unlocked: {achievement.unlockedDate}</div>
                  }
                  {!achievement.unlocked &&
                    <div className="progress-info">
                      <div className="progress-bar">
                        <div
                          className="progress"
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                      </div>
                      <span>{achievement.progress}% Complete</span>
                    </div>
                  }
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {activeTab === 'tasks' && (
        <ScrollReveal animation="fade-in-up" delay={0.4}>
          <div className="tasks-section">
            <div className="tasks-header">
              <h2>Your Tasks</h2>
              <div className="tasks-filter">
                <select defaultValue="all">
                  <option value="all">All Tasks</option>
                  <option value="daily">Daily</option>
                  <option value="challenges">Challenges</option>
                  <option value="battles">Battles</option>
                  <option value="learning">Learning</option>
                  <option value="community">Community</option>
                </select>
              </div>
            </div>

            <div className="tasks-list stagger-fade-up">
              {tasks.map((task, index) => (
                <div
                  key={task.id}
                  className="task-card hover-lift card-shine"
                  data-index={index}
                  style={{"--stagger-delay": "0.1s"}}
                >
                  <div className="task-header">
                    <div className="task-category">{task.category}</div>
                    <div className="task-deadline">Due: {task.deadline}</div>
                  </div>
                  <h3 className="task-title">{task.title}</h3>
                  <p className="task-description">{task.description}</p>
                  <div className="task-reward">
                    <span className="reward-label">Reward:</span> {task.reward}
                  </div>
                  <div className="task-progress-container">
                    <div className="task-progress-bar">
                      <div
                        className="task-progress-fill"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                    <span className="task-progress-text">{task.progress}% Complete</span>
                  </div>
                  <div className="task-actions">
                    {task.progress === 0 ? (
                      <button className="start-task-btn btn-primary">
                        Start Task
                        <span className="btn-glow"></span>
                      </button>
                    ) : task.progress === 100 ? (
                      <button className="claim-reward-btn btn-primary pulse">
                        Claim Reward
                        <span className="btn-glow"></span>
                      </button>
                    ) : (
                      <button className="continue-task-btn btn-primary">
                        Continue
                        <span className="btn-glow"></span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}

      {activeTab === 'certificates' && (
        <ScrollReveal animation="fade-in-up" delay={0.4}>
          <div className="certificates-section">
            <h2>Your Certificates</h2>
            <div className="certificates-grid stagger-fade-up">
              {stats.certificates && stats.certificates.map((cert, index) => (
                <div
                  key={cert.id}
                  className="certificate-card hover-lift card-shine"
                  data-index={index}
                  style={{"--stagger-delay": "0.1s"}}
                >
                  <h3>{cert.title}</h3>
                  <p>Issued: {cert.issueDate}</p>
                  <button className="view-cert-btn btn-primary">
                    View Certificate
                    <span className="btn-glow"></span>
                  </button>
                  <button className="share-cert-btn">Share</button>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      )}
    </div>
  );
}

export default Achievements;