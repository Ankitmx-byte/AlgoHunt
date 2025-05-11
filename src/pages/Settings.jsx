import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Settings.css';

function Settings() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('profile');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  // Profile settings
  const [profileForm, setProfileForm] = useState({
    name: '',
    username: '',
    email: '',
    bio: '',
    location: '',
    github: '',
    linkedin: '',
    twitter: ''
  });
  
  // Account settings
  const [accountForm, setAccountForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Preferences settings
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    battleInvites: true,
    learningReminders: true,
    weeklyDigest: true,
    darkMode: false,
    codeEditor: 'vscode',
    defaultLanguage: 'javascript',
    showCodeHints: true
  });
  
  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'public',
    showEmail: false,
    showLocation: true,
    showActivity: true,
    allowDataCollection: true
  });

  useEffect(() => {
    // Check if user is logged in
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }

    // Fetch user settings
    fetchUserSettings();
  }, [navigate]);

  const fetchUserSettings = () => {
    // In a real app, this would be an API call
    setTimeout(() => {
      const userEmail = localStorage.getItem('userEmail') || '';
      const userName = localStorage.getItem('userName') || userEmail.split('@')[0] || 'User';
      
      // Set profile form data
      setProfileForm({
        name: userName,
        username: userName.toLowerCase().replace(/\s+/g, '_'),
        email: userEmail,
        bio: 'Passionate developer focused on algorithms and data structures. Always looking to improve my skills and learn new technologies.',
        location: 'San Francisco, CA',
        github: 'https://github.com/',
        linkedin: 'https://linkedin.com/in/',
        twitter: 'https://twitter.com/'
      });
      
      setIsLoading(false);
    }, 1000);
  };

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAccountChange = (e) => {
    const { name, value } = e.target;
    setAccountForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePreferenceChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handlePrivacyChange = (e) => {
    const { name, value, type, checked } = e.target;
    setPrivacy(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call to update profile
    
    // Update local storage with new name
    localStorage.setItem('userName', profileForm.name);
    
    // Show success message
    setSuccessMessage('Profile updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    
    // Validate passwords
    if (accountForm.newPassword !== accountForm.confirmPassword) {
      setErrorMessage('New passwords do not match');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    if (accountForm.newPassword && accountForm.newPassword.length < 6) {
      setErrorMessage('Password must be at least 6 characters');
      setTimeout(() => setErrorMessage(''), 3000);
      return;
    }
    
    // In a real app, this would be an API call to update password
    
    // Show success message
    setSuccessMessage('Password updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    
    // Clear form
    setAccountForm({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  const handlePreferencesSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call to update preferences
    
    // Show success message
    setSuccessMessage('Preferences updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    
    // Apply dark mode if selected
    document.body.classList.toggle('dark-mode', preferences.darkMode);
  };

  const handlePrivacySubmit = (e) => {
    e.preventDefault();
    // In a real app, this would be an API call to update privacy settings
    
    // Show success message
    setSuccessMessage('Privacy settings updated successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
  };

  const handleDeleteAccount = () => {
    const confirmed = window.confirm(
      'Are you sure you want to delete your account? This action cannot be undone.'
    );
    
    if (confirmed) {
      // In a real app, this would be an API call to delete account
      
      // Clear local storage
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userName');
      localStorage.removeItem('userEmail');
      
      // Redirect to home page
      navigate('/');
      window.location.reload(); // Force reload to update navbar state
    }
  };

  if (isLoading) {
    return (
      <div className="settings-loading">
        <div className="spinner"></div>
        <p>Loading settings...</p>
      </div>
    );
  }

  return (
    <div className="settings-container">
      <h1>Account Settings</h1>
      
      {successMessage && (
        <div className="success-message">
          <i className="fas fa-check-circle"></i> {successMessage}
        </div>
      )}
      
      {errorMessage && (
        <div className="error-message">
          <i className="fas fa-exclamation-circle"></i> {errorMessage}
        </div>
      )}
      
      <div className="settings-content">
        <div className="settings-sidebar">
          <button 
            className={activeTab === 'profile' ? 'active' : ''} 
            onClick={() => setActiveTab('profile')}
          >
            <i className="fas fa-user"></i> Profile Information
          </button>
          <button 
            className={activeTab === 'account' ? 'active' : ''} 
            onClick={() => setActiveTab('account')}
          >
            <i className="fas fa-lock"></i> Account Security
          </button>
          <button 
            className={activeTab === 'preferences' ? 'active' : ''} 
            onClick={() => setActiveTab('preferences')}
          >
            <i className="fas fa-sliders-h"></i> Preferences
          </button>
          <button 
            className={activeTab === 'privacy' ? 'active' : ''} 
            onClick={() => setActiveTab('privacy')}
          >
            <i className="fas fa-shield-alt"></i> Privacy
          </button>
          <div className="sidebar-divider"></div>
          <button 
            className="delete-account-btn" 
            onClick={handleDeleteAccount}
          >
            <i className="fas fa-trash-alt"></i> Delete Account
          </button>
        </div>
        
        <div className="settings-forms">
          {activeTab === 'profile' && (
            <div className="settings-form">
              <h2>Profile Information</h2>
              <p className="settings-description">
                Update your personal information and how others see you on the platform.
              </p>
              
              <form onSubmit={handleProfileSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={profileForm.name}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={profileForm.username}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={profileForm.email}
                    onChange={handleProfileChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="bio">Bio</label>
                  <textarea
                    id="bio"
                    name="bio"
                    value={profileForm.bio}
                    onChange={handleProfileChange}
                    rows="4"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="location">Location</label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={profileForm.location}
                    onChange={handleProfileChange}
                  />
                </div>
                
                <h3>Social Links</h3>
                
                <div className="form-group">
                  <label htmlFor="github">GitHub</label>
                  <input
                    type="url"
                    id="github"
                    name="github"
                    value={profileForm.github}
                    onChange={handleProfileChange}
                    placeholder="https://github.com/yourusername"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="linkedin">LinkedIn</label>
                  <input
                    type="url"
                    id="linkedin"
                    name="linkedin"
                    value={profileForm.linkedin}
                    onChange={handleProfileChange}
                    placeholder="https://linkedin.com/in/yourusername"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="twitter">Twitter</label>
                  <input
                    type="url"
                    id="twitter"
                    name="twitter"
                    value={profileForm.twitter}
                    onChange={handleProfileChange}
                    placeholder="https://twitter.com/yourusername"
                  />
                </div>
                
                <button type="submit" className="save-btn">Save Changes</button>
              </form>
            </div>
          )}
          
          {activeTab === 'account' && (
            <div className="settings-form">
              <h2>Account Security</h2>
              <p className="settings-description">
                Update your password and manage account security settings.
              </p>
              
              <form onSubmit={handleAccountSubmit}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={accountForm.currentPassword}
                    onChange={handleAccountChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={accountForm.newPassword}
                    onChange={handleAccountChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    value={accountForm.confirmPassword}
                    onChange={handleAccountChange}
                    required
                  />
                </div>
                
                <button type="submit" className="save-btn">Update Password</button>
              </form>
              
              <div className="security-section">
                <h3>Two-Factor Authentication</h3>
                <p>Add an extra layer of security to your account.</p>
                <button className="secondary-btn">
                  <i className="fas fa-shield-alt"></i> Enable 2FA
                </button>
              </div>
              
              <div className="security-section">
                <h3>Active Sessions</h3>
                <p>Manage devices where you're currently logged in.</p>
                <button className="secondary-btn">
                  <i className="fas fa-desktop"></i> Manage Sessions
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'preferences' && (
            <div className="settings-form">
              <h2>Preferences</h2>
              <p className="settings-description">
                Customize your experience and notification settings.
              </p>
              
              <form onSubmit={handlePreferencesSubmit}>
                <h3>Notifications</h3>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="emailNotifications"
                    name="emailNotifications"
                    checked={preferences.emailNotifications}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="emailNotifications">Email Notifications</label>
                </div>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="battleInvites"
                    name="battleInvites"
                    checked={preferences.battleInvites}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="battleInvites">Battle Invites</label>
                </div>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="learningReminders"
                    name="learningReminders"
                    checked={preferences.learningReminders}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="learningReminders">Learning Path Reminders</label>
                </div>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="weeklyDigest"
                    name="weeklyDigest"
                    checked={preferences.weeklyDigest}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="weeklyDigest">Weekly Progress Digest</label>
                </div>
                
                <h3>Appearance</h3>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="darkMode"
                    name="darkMode"
                    checked={preferences.darkMode}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="darkMode">Dark Mode</label>
                </div>
                
                <h3>Coding Preferences</h3>
                
                <div className="form-group">
                  <label htmlFor="codeEditor">Preferred Code Editor Theme</label>
                  <select
                    id="codeEditor"
                    name="codeEditor"
                    value={preferences.codeEditor}
                    onChange={handlePreferenceChange}
                  >
                    <option value="vscode">VS Code</option>
                    <option value="atom">Atom</option>
                    <option value="sublime">Sublime</option>
                    <option value="monokai">Monokai</option>
                  </select>
                </div>
                
                <div className="form-group">
                  <label htmlFor="defaultLanguage">Default Programming Language</label>
                  <select
                    id="defaultLanguage"
                    name="defaultLanguage"
                    value={preferences.defaultLanguage}
                    onChange={handlePreferenceChange}
                  >
                    <option value="javascript">JavaScript</option>
                    <option value="python">Python</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="csharp">C#</option>
                  </select>
                </div>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="showCodeHints"
                    name="showCodeHints"
                    checked={preferences.showCodeHints}
                    onChange={handlePreferenceChange}
                  />
                  <label htmlFor="showCodeHints">Show Code Hints</label>
                </div>
                
                <button type="submit" className="save-btn">Save Preferences</button>
              </form>
            </div>
          )}
          
          {activeTab === 'privacy' && (
            <div className="settings-form">
              <h2>Privacy Settings</h2>
              <p className="settings-description">
                Control what information is visible to others and how your data is used.
              </p>
              
              <form onSubmit={handlePrivacySubmit}>
                <div className="form-group">
                  <label htmlFor="profileVisibility">Profile Visibility</label>
                  <select
                    id="profileVisibility"
                    name="profileVisibility"
                    value={privacy.profileVisibility}
                    onChange={handlePrivacyChange}
                  >
                    <option value="public">Public - Anyone can view your profile</option>
                    <option value="registered">Registered Users - Only registered users can view</option>
                    <option value="private">Private - Only you can view your profile</option>
                  </select>
                </div>
                
                <h3>Information Visibility</h3>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="showEmail"
                    name="showEmail"
                    checked={privacy.showEmail}
                    onChange={handlePrivacyChange}
                  />
                  <label htmlFor="showEmail">Show Email Address on Profile</label>
                </div>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="showLocation"
                    name="showLocation"
                    checked={privacy.showLocation}
                    onChange={handlePrivacyChange}
                  />
                  <label htmlFor="showLocation">Show Location on Profile</label>
                </div>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="showActivity"
                    name="showActivity"
                    checked={privacy.showActivity}
                    onChange={handlePrivacyChange}
                  />
                  <label htmlFor="showActivity">Show Activity Feed on Profile</label>
                </div>
                
                <h3>Data Usage</h3>
                
                <div className="checkbox-group">
                  <input
                    type="checkbox"
                    id="allowDataCollection"
                    name="allowDataCollection"
                    checked={privacy.allowDataCollection}
                    onChange={handlePrivacyChange}
                  />
                  <label htmlFor="allowDataCollection">
                    Allow data collection to improve your experience
                  </label>
                </div>
                
                <button type="submit" className="save-btn">Save Privacy Settings</button>
              </form>
              
              <div className="privacy-section">
                <h3>Data Export</h3>
                <p>Download a copy of your personal data.</p>
                <button className="secondary-btn">
                  <i className="fas fa-download"></i> Request Data Export
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Settings;
