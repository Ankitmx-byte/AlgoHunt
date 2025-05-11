const { Achievement, UserAchievement } = require('../models/Achievement');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all achievements
// @route   GET /api/achievements
// @access  Public
exports.getAchievements = async (req, res, next) => {
  try {
    // Filter out hidden achievements for non-admin users
    if (req.user && req.user.role !== 'admin') {
      req.query.isHidden = false;
    }

    res.status(200).json(res.advancedResults);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single achievement
// @route   GET /api/achievements/:id
// @access  Public
exports.getAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return next(
        new ErrorResponse(`Achievement not found with id of ${req.params.id}`, 404)
      );
    }

    // Check if achievement is hidden and user is not admin
    if (achievement.isHidden && (!req.user || req.user.role !== 'admin')) {
      return next(
        new ErrorResponse(`Achievement not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: achievement
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new achievement
// @route   POST /api/achievements
// @access  Private/Admin
exports.createAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.create(req.body);

    res.status(201).json({
      success: true,
      data: achievement
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update achievement
// @route   PUT /api/achievements/:id
// @access  Private/Admin
exports.updateAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!achievement) {
      return next(
        new ErrorResponse(`Achievement not found with id of ${req.params.id}`, 404)
      );
    }

    res.status(200).json({
      success: true,
      data: achievement
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete achievement
// @route   DELETE /api/achievements/:id
// @access  Private/Admin
exports.deleteAchievement = async (req, res, next) => {
  try {
    const achievement = await Achievement.findById(req.params.id);

    if (!achievement) {
      return next(
        new ErrorResponse(`Achievement not found with id of ${req.params.id}`, 404)
      );
    }

    await achievement.deleteOne();

    // Also delete all user achievement progress for this achievement
    await UserAchievement.deleteMany({ achievement: req.params.id });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get user achievements
// @route   GET /api/achievements/user/:userId
// @access  Private
exports.getUserAchievements = async (req, res, next) => {
  try {
    // Check if user exists
    const user = await User.findById(req.params.userId);
    if (!user) {
      return next(
        new ErrorResponse(`User not found with id of ${req.params.userId}`, 404)
      );
    }

    // Check if user is requesting their own achievements or is admin
    if (req.params.userId !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(`Not authorized to access this route`, 401)
      );
    }

    const userAchievements = await UserAchievement.find({ user: req.params.userId })
      .populate('achievement');

    res.status(200).json({
      success: true,
      count: userAchievements.length,
      data: userAchievements
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update user achievement progress
// @route   PUT /api/achievements/progress/:achievementId
// @access  Private
exports.updateAchievementProgress = async (req, res, next) => {
  try {
    const { progress, currentValue } = req.body;
    
    // Find the achievement
    const achievement = await Achievement.findById(req.params.achievementId);
    if (!achievement) {
      return next(
        new ErrorResponse(`Achievement not found with id of ${req.params.achievementId}`, 404)
      );
    }

    // Find or create user achievement progress
    let userAchievement = await UserAchievement.findOne({
      user: req.user.id,
      achievement: req.params.achievementId
    });

    if (!userAchievement) {
      userAchievement = await UserAchievement.create({
        user: req.user.id,
        achievement: req.params.achievementId,
        progress: progress || 0,
        currentValue: currentValue || 0,
        unlocked: false
      });
    } else {
      userAchievement.progress = progress || userAchievement.progress;
      userAchievement.currentValue = currentValue || userAchievement.currentValue;
      
      // Check if achievement should be unlocked
      if (userAchievement.progress >= 100 && !userAchievement.unlocked) {
        userAchievement.unlocked = true;
        userAchievement.unlockedDate = Date.now();
        
        // Add achievement to user's achievements
        const user = await User.findById(req.user.id);
        if (!user.achievements.includes(achievement._id)) {
          user.achievements.push(achievement._id);
          await user.save();
        }
      }
      
      await userAchievement.save();
    }

    res.status(200).json({
      success: true,
      data: userAchievement
    });
  } catch (err) {
    next(err);
  }
};
