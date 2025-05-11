const { LearningPath, UserLearningProgress } = require('../models/LearningPath');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all learning paths
// @route   GET /api/learning
// @access  Public
exports.getLearningPaths = async (req, res, next) => {
  try {
    res.status(200).json(res.advancedResults);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single learning path
// @route   GET /api/learning/:id
// @access  Public
exports.getLearningPath = async (req, res, next) => {
  try {
    const learningPath = await LearningPath.findById(req.params.id);

    if (!learningPath) {
      return next(
        new ErrorResponse(`Learning path not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: learningPath
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new learning path
// @route   POST /api/learning
// @access  Private/Admin
exports.createLearningPath = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const learningPath = await LearningPath.create(req.body);

    res.status(201).json({
      success: true,
      data: learningPath
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update learning path
// @route   PUT /api/learning/:id
// @access  Private/Admin
exports.updateLearningPath = async (req, res, next) => {
  try {
    let learningPath = await LearningPath.findById(req.params.id);

    if (!learningPath) {
      return next(
        new ErrorResponse(`Learning path not found with id of ${req.params.id}`, 404)
      );
    }

    learningPath = await LearningPath.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: learningPath
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete learning path
// @route   DELETE /api/learning/:id
// @access  Private/Admin
exports.deleteLearningPath = async (req, res, next) => {
  try {
    const learningPath = await LearningPath.findById(req.params.id);

    if (!learningPath) {
      return next(
        new ErrorResponse(`Learning path not found with id of ${req.params.id}`, 404)
      );
    }

    await learningPath.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user learning progress
// @route   GET /api/learning/progress
// @access  Private
exports.getUserProgress = async (req, res, next) => {
  try {
    const userProgress = await UserLearningProgress.find({ user: req.user.id })
      .populate({
        path: 'learningPath',
        select: 'title description difficulty estimatedTime category'
      });

    res.status(200).json({
      success: true,
      count: userProgress.length,
      data: userProgress
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user learning progress
// @route   PUT /api/learning/progress/:pathId
// @access  Private
exports.updateUserProgress = async (req, res, next) => {
  try {
    const { pathProgress, completedModules, moduleProgress, lastAccessedModule } = req.body;

    // Find learning path
    const learningPath = await LearningPath.findById(req.params.pathId);

    if (!learningPath) {
      return next(
        new ErrorResponse(`Learning path not found with id of ${req.params.pathId}`, 404)
      );
    }

    // Find or create user progress
    let userProgress = await UserLearningProgress.findOne({
      user: req.user.id,
      learningPath: req.params.pathId
    });

    if (!userProgress) {
      userProgress = await UserLearningProgress.create({
        user: req.user.id,
        learningPath: req.params.pathId,
        pathProgress: 0,
        completedModules: [],
        moduleProgress: {},
        lastAccessedModule: 0
      });
    }

    // Update fields if provided
    if (pathProgress !== undefined) {
      userProgress.pathProgress = pathProgress;
    }

    if (completedModules) {
      userProgress.completedModules = completedModules;
    }

    if (moduleProgress) {
      // Convert moduleProgress object to Map
      const moduleProgressMap = new Map(Object.entries(moduleProgress));
      userProgress.moduleProgress = moduleProgressMap;
    }

    if (lastAccessedModule !== undefined) {
      userProgress.lastAccessedModule = lastAccessedModule;
    }

    // If path is completed, update user stats
    if (pathProgress === 100 && !userProgress.completedAt) {
      userProgress.completedAt = Date.now();

      // Update user stats
      const user = await User.findById(req.user.id);
      user.stats.learningPathsCompleted += 1;
      await user.save();
    }

    await userProgress.save();

    res.status(200).json({
      success: true,
      data: userProgress
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get module content
// @route   GET /api/learning/:id/modules/:moduleIndex
// @access  Public
exports.getModuleContent = async (req, res, next) => {
  try {
    const learningPath = await LearningPath.findById(req.params.id);

    if (!learningPath) {
      return next(
        new ErrorResponse(`Learning path not found with id of ${req.params.id}`, 404)
      );
    }

    const moduleIndex = parseInt(req.params.moduleIndex);

    if (moduleIndex < 0 || moduleIndex >= learningPath.modules.length) {
      return next(
        new ErrorResponse(`Module with index ${moduleIndex} not found`, 404)
      );
    }

    const module = learningPath.modules[moduleIndex];

    res.status(200).json({
      success: true,
      data: module
    });
  } catch (err) {
    next(err);
  }
};
