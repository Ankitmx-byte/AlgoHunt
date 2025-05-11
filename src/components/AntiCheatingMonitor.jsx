import React, { useState, useEffect } from 'react';
import './AntiCheatingMonitor.css';
import antiCheatingService from '../services/AntiCheatingService';

/**
 * AntiCheatingMonitor Component
 * 
 * This component provides UI for the anti-cheating system in coding battles.
 * It displays the current monitoring status and any detected suspicious activities.
 */
const AntiCheatingMonitor = ({ battleId, userId, isActive, onViolation }) => {
  const [monitoringStatus, setMonitoringStatus] = useState(antiCheatingService.getStatus());
  const [showDetails, setShowDetails] = useState(false);
  const [violationDetected, setViolationDetected] = useState(false);
  
  // Start or stop monitoring based on isActive prop
  useEffect(() => {
    if (isActive && !antiCheatingService.isMonitoring) {
      // Start monitoring with default options
      antiCheatingService.startMonitoring(battleId, userId, {
        clipboardMonitor: true,
        tabSwitchMonitor: true,
        codeAnalysis: true,
        typingPatternMonitor: true,
        screenshots: false // Disable screenshots for privacy
      });
    } else if (!isActive && antiCheatingService.isMonitoring) {
      // Stop monitoring
      const results = antiCheatingService.stopMonitoring();
      console.log('Anti-cheating monitoring results:', results);
    }
    
    // Update status periodically
    const intervalId = setInterval(() => {
      const status = antiCheatingService.getStatus();
      setMonitoringStatus(status);
      
      // Check for violations
      if (status.suspiciousActivities > 0 && !violationDetected) {
        setViolationDetected(true);
        if (onViolation) {
          onViolation(antiCheatingService.suspiciousActivities);
        }
      }
    }, 5000);
    
    return () => {
      clearInterval(intervalId);
      if (antiCheatingService.isMonitoring) {
        antiCheatingService.stopMonitoring();
      }
    };
  }, [isActive, battleId, userId, onViolation, violationDetected]);
  
  // Toggle details view
  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };
  
  return (
    <div className={`anti-cheating-monitor ${violationDetected ? 'violation-detected' : ''}`}>
      <div className="monitor-header" onClick={toggleDetails}>
        <div className="monitor-status">
          <div className={`status-indicator ${monitoringStatus.isMonitoring ? 'active' : 'inactive'}`}></div>
          <span className="status-text">
            {monitoringStatus.isMonitoring ? 'Anti-Cheating Active' : 'Anti-Cheating Inactive'}
          </span>
        </div>
        <div className="monitor-toggle">
          {showDetails ? '▲' : '▼'}
        </div>
      </div>
      
      {showDetails && (
        <div className="monitor-details">
          <div className="monitor-section">
            <h4>Monitoring Status</h4>
            <div className="status-item">
              <span className="status-label">Battle ID:</span>
              <span className="status-value">{monitoringStatus.battleId || 'N/A'}</span>
            </div>
            <div className="status-item">
              <span className="status-label">Duration:</span>
              <span className="status-value">
                {monitoringStatus.duration ? `${Math.floor(monitoringStatus.duration / 60000)} min ${Math.floor((monitoringStatus.duration % 60000) / 1000)} sec` : 'N/A'}
              </span>
            </div>
          </div>
          
          <div className="monitor-section">
            <h4>Activity Metrics</h4>
            <div className="status-item">
              <span className="status-label">Tab Switches:</span>
              <span className={`status-value ${monitoringStatus.metrics.tabSwitches > 5 ? 'warning' : ''}`}>
                {monitoringStatus.metrics.tabSwitches}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Clipboard Pastes:</span>
              <span className={`status-value ${monitoringStatus.metrics.clipboardPastes > 3 ? 'warning' : ''}`}>
                {monitoringStatus.metrics.clipboardPastes}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Typing Speed:</span>
              <span className="status-value">
                {monitoringStatus.metrics.typingPatterns.averageSpeed > 0 
                  ? `${Math.round(monitoringStatus.metrics.typingPatterns.averageSpeed)} CPM` 
                  : 'N/A'}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Code Snapshots:</span>
              <span className="status-value">{monitoringStatus.metrics.codeSnapshots}</span>
            </div>
          </div>
          
          {violationDetected && (
            <div className="monitor-section violations">
              <h4>Suspicious Activities Detected</h4>
              <p className="violation-warning">
                Suspicious activities have been detected. Please ensure you are following the competition rules.
              </p>
              <p className="violation-note">
                Continued violations may result in disqualification.
              </p>
            </div>
          )}
          
          <div className="monitor-footer">
            <p className="monitor-note">
              This system helps ensure fair competition. Your coding session is being monitored for suspicious activities.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AntiCheatingMonitor;
