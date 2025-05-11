/**
 * Anti-Cheating Service for Coding Battles
 * 
 * This service provides functionality to detect and prevent cheating in coding battles.
 * It monitors various user activities and behaviors that might indicate cheating attempts.
 */

class AntiCheatingService {
  constructor() {
    this.isMonitoring = false;
    this.logs = [];
    this.suspiciousActivities = [];
    this.battleId = null;
    this.userId = null;
    this.startTime = null;
    this.monitoringIntervalId = null;
    this.clipboardMonitorEnabled = false;
    this.tabSwitchMonitorEnabled = false;
    this.codeAnalysisEnabled = false;
    this.typingPatternMonitorEnabled = false;
    this.screenshotIntervalId = null;
    this.screenshotInterval = 30000; // 30 seconds
    this.typingMetrics = {
      keystrokes: [],
      pauses: [],
      bursts: [],
      averageSpeed: 0
    };
    this.codeSnapshots = [];
    this.lastActiveTime = Date.now();
    this.inactivityThreshold = 60000; // 1 minute
    this.tabSwitchCount = 0;
    this.clipboardPasteCount = 0;
    this.suspiciousThreshold = {
      tabSwitches: 10,
      clipboardPastes: 5,
      inactivityPeriods: 3,
      codeChanges: 0.8 // 80% similarity threshold
    };
  }

  /**
   * Start monitoring for cheating behaviors
   * @param {string} battleId - The ID of the battle
   * @param {string} userId - The ID of the user
   * @param {Object} options - Configuration options for monitoring
   */
  startMonitoring(battleId, userId, options = {}) {
    if (this.isMonitoring) {
      this.stopMonitoring();
    }

    this.battleId = battleId;
    this.userId = userId;
    this.startTime = Date.now();
    this.isMonitoring = true;
    this.logs = [];
    this.suspiciousActivities = [];
    this.tabSwitchCount = 0;
    this.clipboardPasteCount = 0;
    this.codeSnapshots = [];
    this.typingMetrics = {
      keystrokes: [],
      pauses: [],
      bursts: [],
      averageSpeed: 0
    };

    // Configure monitoring options
    this.clipboardMonitorEnabled = options.clipboardMonitor !== false;
    this.tabSwitchMonitorEnabled = options.tabSwitchMonitor !== false;
    this.codeAnalysisEnabled = options.codeAnalysis !== false;
    this.typingPatternMonitorEnabled = options.typingPatternMonitor !== false;

    this.log('Anti-cheating monitoring started');

    // Set up event listeners
    if (this.clipboardMonitorEnabled) {
      this.setupClipboardMonitoring();
    }

    if (this.tabSwitchMonitorEnabled) {
      this.setupTabSwitchMonitoring();
    }

    if (this.typingPatternMonitorEnabled) {
      this.setupTypingPatternMonitoring();
    }

    // Set up periodic monitoring
    this.monitoringIntervalId = setInterval(() => {
      this.checkInactivity();
    }, 10000); // Check every 10 seconds

    // Take periodic screenshots if enabled
    if (options.screenshots) {
      this.setupScreenshotCapture();
    }

    return true;
  }

  /**
   * Stop all monitoring activities
   */
  stopMonitoring() {
    if (!this.isMonitoring) return;

    // Clear intervals
    if (this.monitoringIntervalId) {
      clearInterval(this.monitoringIntervalId);
      this.monitoringIntervalId = null;
    }

    if (this.screenshotIntervalId) {
      clearInterval(this.screenshotIntervalId);
      this.screenshotIntervalId = null;
    }

    // Remove event listeners
    this.removeClipboardMonitoring();
    this.removeTabSwitchMonitoring();
    this.removeTypingPatternMonitoring();

    this.log('Anti-cheating monitoring stopped');
    this.isMonitoring = false;

    return {
      battleId: this.battleId,
      userId: this.userId,
      duration: Date.now() - this.startTime,
      logs: this.logs,
      suspiciousActivities: this.suspiciousActivities,
      metrics: {
        tabSwitches: this.tabSwitchCount,
        clipboardPastes: this.clipboardPasteCount,
        typingMetrics: this.typingMetrics,
        codeSnapshots: this.codeSnapshots.length
      }
    };
  }

  /**
   * Take a snapshot of the current code
   * @param {string} code - The current code in the editor
   */
  takeCodeSnapshot(code) {
    if (!this.isMonitoring || !this.codeAnalysisEnabled) return;

    this.codeSnapshots.push({
      timestamp: Date.now(),
      code
    });

    // Analyze for suspicious code changes if we have multiple snapshots
    if (this.codeSnapshots.length > 1) {
      this.analyzeCodeChanges();
    }
  }

  /**
   * Record a keystroke for typing pattern analysis
   * @param {KeyboardEvent} event - The keyboard event
   */
  recordKeystroke(event) {
    if (!this.isMonitoring || !this.typingPatternMonitorEnabled) return;

    const now = Date.now();
    this.lastActiveTime = now;

    this.typingMetrics.keystrokes.push({
      key: event.key,
      timestamp: now,
      modifiers: {
        ctrl: event.ctrlKey,
        alt: event.altKey,
        shift: event.shiftKey,
        meta: event.metaKey
      }
    });

    // Calculate typing speed and patterns periodically
    if (this.typingMetrics.keystrokes.length % 50 === 0) {
      this.analyzeTypingPatterns();
    }
  }

  /**
   * Setup clipboard monitoring
   */
  setupClipboardMonitoring() {
    document.addEventListener('paste', this.handlePaste.bind(this));
    document.addEventListener('copy', this.handleCopy.bind(this));
    document.addEventListener('cut', this.handleCut.bind(this));
  }

  /**
   * Remove clipboard monitoring
   */
  removeClipboardMonitoring() {
    document.removeEventListener('paste', this.handlePaste.bind(this));
    document.removeEventListener('copy', this.handleCopy.bind(this));
    document.removeEventListener('cut', this.handleCut.bind(this));
  }

  /**
   * Setup tab switch monitoring
   */
  setupTabSwitchMonitoring() {
    window.addEventListener('blur', this.handleTabSwitch.bind(this));
    window.addEventListener('focus', this.handleTabFocus.bind(this));
    document.addEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  /**
   * Remove tab switch monitoring
   */
  removeTabSwitchMonitoring() {
    window.removeEventListener('blur', this.handleTabSwitch.bind(this));
    window.removeEventListener('focus', this.handleTabFocus.bind(this));
    document.removeEventListener('visibilitychange', this.handleVisibilityChange.bind(this));
  }

  /**
   * Setup typing pattern monitoring
   */
  setupTypingPatternMonitoring() {
    document.addEventListener('keydown', this.recordKeystroke.bind(this));
  }

  /**
   * Remove typing pattern monitoring
   */
  removeTypingPatternMonitoring() {
    document.removeEventListener('keydown', this.recordKeystroke.bind(this));
  }

  /**
   * Setup periodic screenshot capture
   */
  setupScreenshotCapture() {
    // In a real implementation, this would capture the screen
    // For this demo, we'll just log that a screenshot would be taken
    this.screenshotIntervalId = setInterval(() => {
      this.log('Screenshot captured');
    }, this.screenshotInterval);
  }

  /**
   * Handle paste events
   * @param {ClipboardEvent} event - The clipboard event
   */
  handlePaste(event) {
    this.clipboardPasteCount++;
    this.lastActiveTime = Date.now();
    
    this.log(`Clipboard paste detected (${this.clipboardPasteCount} total)`);
    
    if (this.clipboardPasteCount >= this.suspiciousThreshold.clipboardPastes) {
      this.flagSuspiciousActivity('Excessive clipboard usage', {
        count: this.clipboardPasteCount,
        threshold: this.suspiciousThreshold.clipboardPastes
      });
    }
  }

  /**
   * Handle copy events
   * @param {ClipboardEvent} event - The clipboard event
   */
  handleCopy(event) {
    this.lastActiveTime = Date.now();
    this.log('Clipboard copy detected');
  }

  /**
   * Handle cut events
   * @param {ClipboardEvent} event - The clipboard event
   */
  handleCut(event) {
    this.lastActiveTime = Date.now();
    this.log('Clipboard cut detected');
  }

  /**
   * Handle tab switch events
   */
  handleTabSwitch() {
    this.tabSwitchCount++;
    const now = Date.now();
    
    this.log(`Tab switch detected (${this.tabSwitchCount} total)`);
    
    if (this.tabSwitchCount >= this.suspiciousThreshold.tabSwitches) {
      this.flagSuspiciousActivity('Excessive tab switching', {
        count: this.tabSwitchCount,
        threshold: this.suspiciousThreshold.tabSwitches
      });
    }
  }

  /**
   * Handle tab focus events
   */
  handleTabFocus() {
    this.lastActiveTime = Date.now();
    this.log('Tab focus detected');
  }

  /**
   * Handle visibility change events
   */
  handleVisibilityChange() {
    if (document.hidden) {
      this.handleTabSwitch();
    } else {
      this.handleTabFocus();
    }
  }

  /**
   * Check for user inactivity
   */
  checkInactivity() {
    const now = Date.now();
    const inactiveTime = now - this.lastActiveTime;
    
    if (inactiveTime > this.inactivityThreshold) {
      this.log(`Inactivity detected: ${Math.round(inactiveTime / 1000)} seconds`);
      this.flagSuspiciousActivity('Extended inactivity', {
        duration: inactiveTime,
        threshold: this.inactivityThreshold
      });
      
      // Reset the last active time to avoid repeated alerts
      this.lastActiveTime = now;
    }
  }

  /**
   * Analyze code changes for suspicious patterns
   */
  analyzeCodeChanges() {
    const latestSnapshot = this.codeSnapshots[this.codeSnapshots.length - 1];
    const previousSnapshot = this.codeSnapshots[this.codeSnapshots.length - 2];
    
    // Simple analysis: check if a large chunk of code was added at once
    const previousLength = previousSnapshot.code.length;
    const currentLength = latestSnapshot.code.length;
    const timeDiff = latestSnapshot.timestamp - previousSnapshot.timestamp;
    
    // If code length increased by more than 50% in less than 5 seconds
    if (currentLength > previousLength * 1.5 && timeDiff < 5000) {
      this.flagSuspiciousActivity('Suspicious code change', {
        previousLength,
        currentLength,
        timeDiff,
        percentageIncrease: ((currentLength - previousLength) / previousLength) * 100
      });
    }
  }

  /**
   * Analyze typing patterns for suspicious behavior
   */
  analyzeTypingPatterns() {
    // Calculate typing speed
    if (this.typingMetrics.keystrokes.length < 10) return;
    
    const keystrokes = this.typingMetrics.keystrokes;
    const totalTime = keystrokes[keystrokes.length - 1].timestamp - keystrokes[0].timestamp;
    const charactersTyped = keystrokes.length;
    
    // Characters per minute
    const typingSpeed = (charactersTyped / totalTime) * 60000;
    this.typingMetrics.averageSpeed = typingSpeed;
    
    // Extremely fast typing could be suspicious
    if (typingSpeed > 500) { // More than 500 chars per minute
      this.flagSuspiciousActivity('Unusually fast typing', {
        speed: typingSpeed,
        threshold: 500
      });
    }
  }

  /**
   * Flag a suspicious activity
   * @param {string} type - The type of suspicious activity
   * @param {Object} details - Additional details about the activity
   */
  flagSuspiciousActivity(type, details = {}) {
    const activity = {
      type,
      timestamp: Date.now(),
      details
    };
    
    this.suspiciousActivities.push(activity);
    this.log(`SUSPICIOUS ACTIVITY: ${type}`, details);
    
    // In a real implementation, this could trigger a server notification
    // or other anti-cheating measures
    return activity;
  }

  /**
   * Log an event
   * @param {string} message - The log message
   * @param {Object} data - Additional data to log
   */
  log(message, data = {}) {
    const logEntry = {
      timestamp: Date.now(),
      message,
      data
    };
    
    this.logs.push(logEntry);
    console.log(`[AntiCheating] ${message}`, data);
    
    return logEntry;
  }

  /**
   * Get the current monitoring status
   */
  getStatus() {
    return {
      isMonitoring: this.isMonitoring,
      battleId: this.battleId,
      userId: this.userId,
      startTime: this.startTime,
      duration: this.startTime ? Date.now() - this.startTime : 0,
      suspiciousActivities: this.suspiciousActivities.length,
      metrics: {
        tabSwitches: this.tabSwitchCount,
        clipboardPastes: this.clipboardPasteCount,
        typingPatterns: {
          averageSpeed: this.typingMetrics.averageSpeed,
          keystrokesRecorded: this.typingMetrics.keystrokes.length
        },
        codeSnapshots: this.codeSnapshots.length
      }
    };
  }
}

// Create a singleton instance
const antiCheatingService = new AntiCheatingService();

export default antiCheatingService;
