import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Profile.css';

function Profile() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [recentActivities, setRecentActivities] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [stats, setStats] = useState({});

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Fetch user profile data
    fetchUserProfile();
    fetchRecentActivities();
    fetchAchievements();
    fetchStats();
  }, [navigate]);

  const fetchUserProfile = () => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const userEmail = localStorage.getItem('userEmail') || '';
      const userName = localStorage.getItem('userName') || userEmail.split('@')[0] || 'User';
      
      setUserProfile({
        id: '12345',
        name: userName,
        email: userEmail,
        username: userName.toLowerCase().replace(/\s+/g, '_'),
        bio: 'Passionate developer focused on algorithms and data structures. Always looking to improve my skills and learn new technologies.',
        location: 'San Francisco, CA',
        joinedDate: 'January 2023',
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
        socialLinks: {
          github: 'https://github.com/',
          linkedin: 'https://linkedin.com/in/',
          twitter: 'https://twitter.com/'
        },
        skills: ['JavaScript', 'Python', 'React', 'Node.js', 'Data Structures', 'Algorithms'],
        preferredLanguages: ['JavaScript', 'Python', 'Java']
      });
      setIsLoading(false);
    }, 1000);
  };

  const fetchRecentActivities = () => {
    // Mock data for recent activities
    setTimeout(() => {
      setRecentActivities([
        {
          id: 'act1',
          type: 'battle',
          title: 'Won a coding battle',
          description: 'Defeated JohnDoe123 in a Medium difficulty Algorithm challenge',
          date: '2 days ago',
          icon: 'trophy'
        },
        {
          id: 'act2',
          type: 'learning',
          title: 'Completed a module',
          description: 'Finished "Advanced Sorting Algorithms" in Data Structures path',
          date: '5 days ago',
          icon: 'graduation-cap'
        },
        {
          id: 'act3',
          type: 'achievement',
          title: 'Earned an achievement',
          description: 'Unlocked "Algorithm Master" badge',
          date: '1 week ago',
          icon: 'medal'
        },
        {
          id: 'act4',
          type: 'battle',
          title: 'Participated in tournament',
          description: 'Reached quarterfinals in Weekly Algorithm Tournament',
          date: '2 weeks ago',
          icon: 'gamepad'
        }
      ]);
    }, 1200);
  };

  const fetchAchievements = () => {
    // Mock data for achievements
    setTimeout(() => {
      setAchievements([
        {
          id: 'ach1',
          title: 'Algorithm Master',
          description: 'Solved 50 algorithm challenges',
          icon: 'award',
          date: 'Earned 3 weeks ago',
          progress: 100
        },
        {
          id: 'ach2',
          title: 'Battle Champion',
          description: 'Won 10 coding battles',
          icon: 'trophy',
          date: 'Earned 1 month ago',
          progress: 100
        },
        {
          id: 'ach3',
          title: 'Learning Enthusiast',
          description: 'Completed 5 learning paths',
          icon: 'book',
          date: 'In progress',
          progress: 60
        },
        {
          id: 'ach4',
          title: 'Code Reviewer',
          description: 'Reviewed 20 code submissions',
          icon: 'code',
          date: 'In progress',
          progress: 45
        }
      ]);
    }, 1300);
  };

  const fetchStats = () => {
    // Mock data for user stats
    setTimeout(() => {
      setStats({
        battlesWon: 15,
        battlesLost: 7,
        winRate: '68%',
        tournamentsParticipated: 3,
        challengesSolved: 78,
        learningPathsCompleted: 2,
        currentStreak: 5,
        longestStreak: 14,
        totalPoints: 3750,
        ranking: 342,
        skillLevel: 'Intermediate'
      });
    }, 1400);
  };

  if (isLoading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
        <p>Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-cover"></div>
        <div className="profile-info">
          <div className="profile-avatar">
            <img src={userProfile.avatar} alt={userProfile.name} />
          </div>
          <div className="profile-details">
            <h1>{userProfile.name}</h1>
            <h2>@{userProfile.username}</h2>
            <p className="profile-bio">{userProfile.bio}</p>
            <div className="profile-meta">
              <span><i className="fas fa-map-marker-alt"></i> {userProfile.location}</span>
              <span><i className="fas fa-calendar-alt"></i> Joined {userProfile.joinedDate}</span>
            </div>
            <div className="profile-social">
              {userProfile.socialLinks.github && (
                <a href={userProfile.socialLinks.github} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-github"></i>
                </a>
              )}
              {userProfile.socialLinks.linkedin && (
                <a href={userProfile.socialLinks.linkedin} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-linkedin"></i>
                </a>
              )}
              {userProfile.socialLinks.twitter && (
                <a href={userProfile.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-twitter"></i>
                </a>
              )}
            </div>
          </div>
          <div className="profile-actions">
            <Link to="/settings" className="edit-profile-btn">
              <i className="fas fa-cog"></i> Edit Profile
            </Link>
          </div>
        </div>
      </div>

      <div className="profile-nav">
        <button 
          className={activeTab === 'overview' ? 'active' : ''} 
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'activity' ? 'active' : ''} 
          onClick={() => setActiveTab('activity')}
        >
          Activity
        </button>
        <button 
          className={activeTab === 'achievements' ? 'active' : ''} 
          onClick={() => setActiveTab('achievements')}
        >
          Achievements
        </button>
        <button 
          className={activeTab === 'stats' ? 'active' : ''} 
          onClick={() => setActiveTab('stats')}
        >
          Stats
        </button>
      </div>

      <div className="profile-content">
        {activeTab === 'overview' && (
          <div className="profile-overview">
            <div className="profile-section">
              <h3>Skills</h3>
              <div className="skills-list">
                {userProfile.skills.map((skill, index) => (
                  <span key={index} className="skill-tag">{skill}</span>
                ))}
              </div>
            </div>
            
            <div className="profile-section">
              <h3>Preferred Languages</h3>
              <div className="languages-list">
                {userProfile.preferredLanguages.map((language, index) => (
                  <div key={index} className="language-item">
                    <span className="language-name">{language}</span>
                    <div className="language-bar">
                      <div 
                        className="language-progress" 
                        style={{ width: `${Math.random() * 50 + 50}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="profile-section">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                {recentActivities.slice(0, 2).map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className={`activity-icon ${activity.type}`}>
                      <i className={`fas fa-${activity.icon}`}></i>
                    </div>
                    <div className="activity-details">
                      <h4>{activity.title}</h4>
                      <p>{activity.description}</p>
                      <span className="activity-date">{activity.date}</span>
                    </div>
                  </div>
                ))}
                <button 
                  className="view-all-btn"
                  onClick={() => setActiveTab('activity')}
                >
                  View All Activity
                </button>
              </div>
            </div>
            
            <div className="profile-section">
              <h3>Achievements Showcase</h3>
              <div className="achievements-showcase">
                {achievements.slice(0, 3).map(achievement => (
                  <div key={achievement.id} className="achievement-card">
                    <div className="achievement-icon">
                      <i className={`fas fa-${achievement.icon}`}></i>
                    </div>
                    <div className="achievement-details">
                      <h4>{achievement.title}</h4>
                      <p>{achievement.description}</p>
                      {achievement.progress < 100 ? (
                        <div className="achievement-progress">
                          <div 
                            className="progress-bar" 
                            style={{ width: `${achievement.progress}%` }}
                          ></div>
                          <span>{achievement.progress}%</span>
                        </div>
                      ) : (
                        <span className="achievement-date">{achievement.date}</span>
                      )}
                    </div>
                  </div>
                ))}
                <button 
                  className="view-all-btn"
                  onClick={() => setActiveTab('achievements')}
                >
                  View All Achievements
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'activity' && (
          <div className="profile-activity">
            <h3>Activity Feed</h3>
            <div className="activity-feed">
              {recentActivities.map(activity => (
                <div key={activity.id} className="activity-item">
                  <div className={`activity-icon ${activity.type}`}>
                    <i className={`fas fa-${activity.icon}`}></i>
                  </div>
                  <div className="activity-details">
                    <h4>{activity.title}</h4>
                    <p>{activity.description}</p>
                    <span className="activity-date">{activity.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'achievements' && (
          <div className="profile-achievements">
            <h3>Achievements</h3>
            <div className="achievements-grid">
              {achievements.map(achievement => (
                <div key={achievement.id} className="achievement-card">
                  <div className="achievement-icon">
                    <i className={`fas fa-${achievement.icon}`}></i>
                  </div>
                  <div className="achievement-details">
                    <h4>{achievement.title}</h4>
                    <p>{achievement.description}</p>
                    {achievement.progress < 100 ? (
                      <div className="achievement-progress">
                        <div 
                          className="progress-bar" 
                          style={{ width: `${achievement.progress}%` }}
                        ></div>
                        <span>{achievement.progress}%</span>
                      </div>
                    ) : (
                      <span className="achievement-date">{achievement.date}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'stats' && (
          <div className="profile-stats">
            <h3>Performance Statistics</h3>
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-trophy"></i>
                </div>
                <div className="stat-details">
                  <h4>Battles Won</h4>
                  <p className="stat-value">{stats.battlesWon}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-percentage"></i>
                </div>
                <div className="stat-details">
                  <h4>Win Rate</h4>
                  <p className="stat-value">{stats.winRate}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-code"></i>
                </div>
                <div className="stat-details">
                  <h4>Challenges Solved</h4>
                  <p className="stat-value">{stats.challengesSolved}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-book"></i>
                </div>
                <div className="stat-details">
                  <h4>Learning Paths</h4>
                  <p className="stat-value">{stats.learningPathsCompleted}</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-fire"></i>
                </div>
                <div className="stat-details">
                  <h4>Current Streak</h4>
                  <p className="stat-value">{stats.currentStreak} days</p>
                </div>
              </div>
              
              <div className="stat-card">
                <div className="stat-icon">
                  <i className="fas fa-ranking-star"></i>
                </div>
                <div className="stat-details">
                  <h4>Ranking</h4>
                  <p className="stat-value">#{stats.ranking}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Profile;
