const express = require('express');
const {
  getAchievements,
  getAchievement,
  createAchievement,
  updateAchievement,
  deleteAchievement,
  getUserAchievements
} = require('../controllers/achievements');

const { Achievement } = require('../models/Achievement');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Get user achievements route
router.route('/user').get(protect, getUserAchievements);

// Main achievement routes
router
  .route('/')
  .get(advancedResults(Achievement), getAchievements)
  .post(protect, authorize('admin'), createAchievement);

router
  .route('/:id')
  .get(getAchievement)
  .put(protect, authorize('admin'), updateAchievement)
  .delete(protect, authorize('admin'), deleteAchievement);

module.exports = router;
