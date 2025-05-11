import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import CodingBattles from './pages/CodingBattles';
import CodingBattle from './pages/CodingBattle';
import LearningPaths from './pages/LearningPaths';
import LearningPathDetail from './pages/LearningPathDetail';
import Achievements from './pages/Achievements';
import JobBoard from './components/JobBoard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Profile from './pages/Profile';
import Settings from './pages/Settings';
import ResumeBuilder from './pages/ResumeBuilder';
import InterviewPrep from './pages/InterviewPrep';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PageTransition from './components/PageTransition';

import './App.css';
import './styles/animations.css';

// ScrollToTop component to scroll to top on page change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Main App component
function App() {

  return (
    <Router>
      <ScrollToTop />
      <div className="app">
        <Navbar />
        <main className="main-content">
          <PageTransition>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/battles" element={<CodingBattles />} />
              <Route path="/battle/:battleId" element={<CodingBattle />} />
              <Route path="/coding-battle/:battleId" element={<CodingBattle />} />
              <Route path="/battle/practice" element={<CodingBattle isDemoMode={true} />} />
              <Route path="/learning" element={<LearningPaths />} />
              <Route path="/learning/:pathId" element={<LearningPathDetail />} />
              <Route path="/achievements" element={<Achievements />} />
              <Route path="/jobs" element={<JobBoard />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/resume-builder" element={<ResumeBuilder />} />
              <Route path="/interview-prep" element={<InterviewPrep />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </PageTransition>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;




