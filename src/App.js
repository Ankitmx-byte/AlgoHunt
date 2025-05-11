import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

// Import components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Import pages
import HomePage from './pages/HomePage';
import Login from './pages/Login.jsx';
import Signup from './pages/Signup.jsx';
import Dashboard from './pages/Dashboard';
import CodingBattles from './pages/CodingBattles';
import CodingBattleArena from './pages/CodingBattleArena';
import BattleResults from './pages/BattleResults';
import BattlePractice from './pages/BattlePractice';
import Tournaments from './pages/Tournaments';
import LearningPaths from './pages/LearningPaths.jsx';
import LearningCenter from './pages/LearningCenter';
import LearningPathDetail from './pages/LearningPathDetail';
import Achievements from './pages/Achievements';
import JobBoard from './pages/JobBoard';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';
import InterviewPrep from './pages/InterviewPrep';
import ResumeBuilder from './pages/ResumeBuilder';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/battles" element={<CodingBattles />} />
            <Route path="/tournaments" element={<Tournaments />} />
            <Route path="/learning" element={<LearningCenter />} />
            <Route path="/learning-paths" element={<LearningCenter />} />
            <Route path="/learning/:pathId" element={<LearningPathDetail />} />
            <Route path="/achievements" element={<Achievements />} />
            <Route path="/jobs" element={<JobBoard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/resume-builder" element={<ResumeBuilder />} />
            <Route path="/interview-prep" element={<InterviewPrep />} />
            <Route path="/settings" element={<NotFound />} />
            <Route path="/battle/practice" element={<BattlePractice />} />
            <Route path="/battle/:battleId" element={<CodingBattleArena />} />
            <Route path="/battle/:battleId/results" element={<BattleResults />} />
            <Route path="/coding-battle/:battleId" element={<CodingBattleArena />} />
            <Route path="/tournaments/:tournamentId" element={<Tournaments />} />
            <Route path="/blog" element={<NotFound />} />
            <Route path="/tutorials" element={<NotFound />} />
            <Route path="/documentation" element={<NotFound />} />
            <Route path="/faq" element={<NotFound />} />
            <Route path="/support" element={<NotFound />} />
            <Route path="/contact" element={<NotFound />} />
            <Route path="/terms" element={<NotFound />} />
            <Route path="/privacy" element={<NotFound />} />
            <Route path="/cookies" element={<NotFound />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
