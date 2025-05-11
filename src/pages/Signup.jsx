import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import CodeAnimation from '../components/CodeAnimation';

function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    // Simulate registration - in a real app, this would call an API
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userName', formData.name);
    localStorage.setItem('userEmail', formData.email);

    // Redirect to home page
    navigate('/');
    window.location.reload(); // Force reload to update navbar state
  };

  return (
    <div className="login-container">
      <div className="login-left-panel">
        <div className="logo-container">
          <div className="logo">A</div>
        </div>
        <div className="welcome-text">
          <h2>Welcome to</h2>
          <h1>AlgoHunt Community</h1>
          <p>Home to 2+ Million developers worldwide.</p>
          <button className="know-more-btn">Know more</button>
        </div>
        <div className="animation-container">
          <CodeAnimation />
        </div>
      </div>

      <div className="login-right-panel">
        <div className="login-form-container">
          <h2>Join AlgoHunt</h2>
          <h3>Create your account</h3>
          <p className="login-subtitle">Start your competitive coding journey today.</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm Password"
                required
              />
            </div>

            <button type="submit" className="login-btn">
              Create Account
            </button>
          </form>

          <div className="divider">
            <span>or</span>
          </div>

          <div className="social-login">
            <button className="google-btn">
              <img src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="Google" />
              Continue with Google
            </button>

            <div className="other-social-logins">
              <button className="linkedin-btn">
                <i className="fab fa-linkedin"></i>
                LinkedIn
              </button>
              <button className="github-btn">
                <i className="fab fa-github"></i>
                GitHub
              </button>
              <button className="facebook-btn">
                <i className="fab fa-facebook"></i>
                Facebook
              </button>
            </div>
          </div>

          <div className="signup-link">
            <p>
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;