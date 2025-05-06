import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import JobBoard from './components/JobBoard';
import CodingBattles from './pages/CodingBattles';
import LearningPaths from './pages/LearningPaths';
import Achievements from './pages/Achievements';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/jobs" element={<JobBoard />} />
          <Route path="/battles" element={<CodingBattles />} />
          <Route path="/learning" element={<LearningPaths />} />
          <Route path="/achievements" element={<Achievements />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;