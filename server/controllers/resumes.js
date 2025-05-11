const Resume = require('../models/Resume');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all resumes
// @route   GET /api/resumes
// @access  Private/Admin
exports.getResumes = async (req, res, next) => {
  try {
    // Regular users can only see their own resumes
    if (req.user.role !== 'admin') {
      req.query.user = req.user.id;
    }

    res.status(200).json(res.advancedResults);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
exports.getResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return next(
        new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the resume or is admin
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User not authorized to access this resume`, 401)
      );
    }

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new resume
// @route   POST /api/resumes
// @access  Private
exports.createResume = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.user = req.user.id;

    const resume = await Resume.create(req.body);

    res.status(201).json({
      success: true,
      data: resume
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update resume
// @route   PUT /api/resumes/:id
// @access  Private
exports.updateResume = async (req, res, next) => {
  try {
    let resume = await Resume.findById(req.params.id);

    if (!resume) {
      return next(
        new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the resume
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User not authorized to update this resume`, 401)
      );
    }

    resume = await Resume.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: resume
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
exports.deleteResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return next(
        new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the resume
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User not authorized to delete this resume`, 401)
      );
    }

    await resume.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Analyze resume with ATS
// @route   POST /api/resumes/:id/analyze
// @access  Private
exports.analyzeResume = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return next(
        new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the resume
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User not authorized to analyze this resume`, 401)
      );
    }

    // Get job description from request body
    const { jobDescription } = req.body;

    if (!jobDescription) {
      return next(
        new ErrorResponse('Please provide a job description for analysis', 400)
      );
    }

    // In a real implementation, this would call an AI service to analyze the resume
    // For now, we'll simulate the analysis with mock data
    const mockAnalysis = {
      keywords: [
        { keyword: 'JavaScript', found: true },
        { keyword: 'React', found: true },
        { keyword: 'Node.js', found: true },
        { keyword: 'MongoDB', found: false },
        { keyword: 'AWS', found: false }
      ],
      suggestions: [
        'Add more quantifiable achievements to your experience section',
        'Include MongoDB in your skills section',
        'Mention AWS experience if you have any'
      ],
      missingKeywords: ['MongoDB', 'AWS', 'CI/CD', 'Docker'],
      formatIssues: [
        'Consider using bullet points for better readability',
        'Ensure consistent date formatting throughout the resume'
      ]
    };

    // Calculate ATS score based on keyword matches and other factors
    const keywordMatchPercentage = 
      (mockAnalysis.keywords.filter(k => k.found).length / mockAnalysis.keywords.length) * 100;
    
    // Simple scoring algorithm (in a real app, this would be more sophisticated)
    const atsScore = Math.round(keywordMatchPercentage);

    // Update resume with analysis results
    resume.atsScore = atsScore;
    resume.atsAnalysis = mockAnalysis;
    await resume.save();

    res.status(200).json({
      success: true,
      data: {
        atsScore,
        analysis: mockAnalysis
      }
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Generate resume PDF
// @route   GET /api/resumes/:id/pdf
// @access  Private
exports.generateResumePDF = async (req, res, next) => {
  try {
    const resume = await Resume.findById(req.params.id);

    if (!resume) {
      return next(
        new ErrorResponse(`Resume not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user owns the resume
    if (resume.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`User not authorized to access this resume`, 401)
      );
    }

    // In a real implementation, this would generate a PDF
    // For now, we'll just return a success message
    res.status(200).json({
      success: true,
      message: 'PDF generation would happen here in a real implementation',
      data: {
        resumeId: resume._id,
        template: resume.template
      }
    });
  } catch (err) {
    next(err);
  }
};
