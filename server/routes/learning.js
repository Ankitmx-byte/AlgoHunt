const express = require('express');
const {
  getLearningPaths,
  getLearningPath,
  createLearningPath,
  updateLearningPath,
  deleteLearningPath,
  getUserProgress,
  updateUserProgress,
  getModuleContent
} = require('../controllers/learning');

const { LearningPath } = require('../models/LearningPath');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// User progress routes
router.route('/progress').get(protect, getUserProgress);
router.route('/progress/:pathId').put(protect, updateUserProgress);

// Module content route
router.route('/:id/modules/:moduleIndex').get(getModuleContent);

// Main learning path routes
router
  .route('/')
  .get(advancedResults(LearningPath), getLearningPaths)
  .post(protect, authorize('admin'), createLearningPath);

router
  .route('/:id')
  .get(getLearningPath)
  .put(protect, authorize('admin'), updateLearningPath)
  .delete(protect, authorize('admin'), deleteLearningPath);

module.exports = router;
