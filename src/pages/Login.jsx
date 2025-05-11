import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import CodeAnimation from '../components/CodeAnimation';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple validation
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Simulate login - in a real app, this would call an API
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userEmail', email);

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
          <h2>Welcome back!</h2>
          <h3>Login to your account</h3>
          <p className="login-subtitle">It's nice to see you again. Ready to code?</p>

          {error && <div className="auth-error">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>

            <div className="form-group">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me">Remember me</label>
              </div>
              <Link to="/forgot-password" className="forgot-password">
                Forgot password?
              </Link>
            </div>

            <button type="submit" className="login-btn">
              Log In
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
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;