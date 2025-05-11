const Interview = require('../models/Interview');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all interviews
// @route   GET /api/interviews
// @access  Private
exports.getInterviews = async (req, res, next) => {
  try {
    // Regular users can only see their own interviews
    if (req.user.role !== 'admin') {
      req.query.user = req.user.id;
    }

    res.status(200).json(res.advancedResults);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single interview
// @route   GET /api/interviews/:id
// @access  Private
exports.getInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(
        new ErrorResponse(`Interview not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the interview or is admin
    if (interview.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User not authorized to access this interview`, 401)
      );
    }

    res.status(200).json({
      success: true,
      data: interview
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new interview
// @route   POST /api/interviews
// @access  Private
exports.createInterview = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const interview = await Interview.create(req.body);

    res.status(201).json({
      success: true,
      data: interview
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update interview
// @route   PUT /api/interviews/:id
// @access  Private
exports.updateInterview = async (req, res, next) => {
  try {
    let interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(
        new ErrorResponse(`Interview not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User not authorized to update this interview`, 401)
      );
    }

    interview = await Interview.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: interview
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete interview
// @route   DELETE /api/interviews/:id
// @access  Private
exports.deleteInterview = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(
        new ErrorResponse(`Interview not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User not authorized to delete this interview`, 401)
      );
    }

    await interview.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Start interview session
// @route   POST /api/interviews/:id/sessions
// @access  Private
exports.startInterviewSession = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(
        new ErrorResponse(`Interview not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User not authorized to access this interview`, 401)
      );
    }

    // Create a new session
    const session = {
      startTime: Date.now(),
      answers: []
    };

    interview.sessions.push(session);
    await interview.save();

    res.status(201).json({
      success: true,
      data: {
        interviewId: interview._id,
        sessionId: interview.sessions[interview.sessions.length - 1]._id,
        questions: interview.questions
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    End interview session
// @route   PUT /api/interviews/:id/sessions/:sessionId
// @access  Private
exports.endInterviewSession = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(
        new ErrorResponse(`Interview not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User not authorized to access this interview`, 401)
      );
    }

    // Find the session
    const sessionIndex = interview.sessions.findIndex(
      session => session._id.toString() === req.params.sessionId
    );

    if (sessionIndex === -1) {
      return next(
        new ErrorResponse(`Session not found with id of ${req.params.sessionId}`, 404)
      );
    }

    // Update session end time and duration
    const session = interview.sessions[sessionIndex];
    session.endTime = Date.now();
    session.duration = Math.round((session.endTime - session.startTime) / 1000); // in seconds

    // Add recording info if provided
    if (req.body.recording) {
      session.recording = req.body.recording;
    }

    // Add answers if provided
    if (req.body.answers && Array.isArray(req.body.answers)) {
      session.answers = req.body.answers;
    }

    await interview.save();

    res.status(200).json({
      success: true,
      data: session
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Analyze interview session
// @route   POST /api/interviews/:id/sessions/:sessionId/analyze
// @access  Private
exports.analyzeInterviewSession = async (req, res, next) => {
  try {
    const interview = await Interview.findById(req.params.id);

    if (!interview) {
      return next(
        new ErrorResponse(`Interview not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the interview
    if (interview.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User not authorized to access this interview`, 401)
      );
    }

    // Find the session
    const sessionIndex = interview.sessions.findIndex(
      session => session._id.toString() === req.params.sessionId
    );

    if (sessionIndex === -1) {
      return next(
        new ErrorResponse(`Session not found with id of ${req.params.sessionId}`, 404)
      );
    }

    // In a real implementation, this would call an AI service to analyze the interview
    // For now, we'll simulate the analysis with mock data
    const mockFeedback = {
      overallScore: Math.floor(Math.random() * 30) + 70, // 70-100
      technicalAccuracy: Math.floor(Math.random() * 30) + 70,
      communicationScore: Math.floor(Math.random() * 30) + 70,
      confidenceScore: Math.floor(Math.random() * 30) + 70,
      bodyLanguageScore: Math.floor(Math.random() * 30) + 70,
      strengths: [
        'Clear explanation of technical concepts',
        'Good problem-solving approach',
        'Maintained good eye contact throughout'
      ],
      areasForImprovement: [
        'Could provide more specific examples',
        'Reduce use of filler words like "um" and "like"',
        'Consider more concise answers to behavioral questions'
      ],
      detailedFeedback: [
        {
          timestamp: 45,
          feedback: 'Excellent explanation of the algorithm',
          category: 'Technical',
          severity: 'Positive'
        },
        {
          timestamp: 120,
          feedback: 'Consider maintaining better posture here',
          category: 'Body Language',
          severity: 'Suggestion'
        },
        {
          timestamp: 180,
          feedback: 'Too many filler words in this response',
          category: 'Communication',
          severity: 'Minor Issue'
        }
      ]
    };

    // Mock video analysis
    const mockVideoAnalysis = {
      facialExpressions: [
        { timestamp: 30, expression: 'Neutral', confidence: 0.9 },
        { timestamp: 60, expression: 'Happy', confidence: 0.8 },
        { timestamp: 90, expression: 'Nervous', confidence: 0.7 }
      ],
      eyeContact: [
        { timestamp: 15, maintained: true, duration: 20 },
        { timestamp: 45, maintained: false, duration: 5 },
        { timestamp: 60, maintained: true, duration: 30 }
      ],
      posture: [
        { timestamp: 0, quality: 'Good', duration: 60 },
        { timestamp: 60, quality: 'Slouching', duration: 15 },
        { timestamp: 75, quality: 'Good', duration: 120 }
      ],
      handGestures: [
        { timestamp: 20, type: 'Natural' },
        { timestamp: 50, type: 'Excessive' },
        { timestamp: 100, type: 'Natural' }
      ]
    };

    // Mock audio analysis
    const mockAudioAnalysis = {
      speechRate: [
        { timestamp: 0, wordsPerMinute: 160, recommendation: 'Good pace' },
        { timestamp: 60, wordsPerMinute: 190, recommendation: 'Consider slowing down slightly' },
        { timestamp: 120, wordsPerMinute: 150, recommendation: 'Good pace' }
      ],
      volume: [
        { timestamp: 30, level: 'Appropriate' },
        { timestamp: 90, level: 'Too Low' },
        { timestamp: 150, level: 'Appropriate' }
      ],
      fillerWords: [
        { timestamp: 45, word: 'um', count: 3 },
        { timestamp: 75, word: 'like', count: 2 },
        { timestamp: 120, word: 'you know', count: 2 }
      ],
      clarity: [
        { timestamp: 0, quality: 'Clear', duration: 90 },
        { timestamp: 90, quality: 'Mumbling', duration: 15 },
        { timestamp: 105, quality: 'Clear', duration: 90 }
      ]
    };

    // Update session with analysis
    interview.sessions[sessionIndex].feedback = mockFeedback;
    interview.sessions[sessionIndex].videoAnalysis = mockVideoAnalysis;
    interview.sessions[sessionIndex].audioAnalysis = mockAudioAnalysis;

    await interview.save();

    res.status(200).json({
      success: true,
      data: {
        feedback: mockFeedback,
        videoAnalysis: mockVideoAnalysis,
        audioAnalysis: mockAudioAnalysis
      }
    });
  } catch (err) {
    next(err);
  }
};
