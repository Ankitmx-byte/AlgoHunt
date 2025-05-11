const express = require('express');
const {
  getBattles,
  getBattle,
  createBattle,
  updateBattle,
  deleteBattle,
  registerForBattle,
  submitSolution
} = require('../controllers/battles');

const Battle = require('../models/Battle');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Register and submit routes
router.route('/:id/register').post(protect, registerForBattle);
router.route('/:id/submit').post(protect, submitSolution);

// Main battle routes
router
  .route('/')
  .get(advancedResults(Battle), getBattles)
  .post(protect, authorize('admin'), createBattle);

router
  .route('/:id')
  .get(getBattle)
  .put(protect, authorize('admin'), updateBattle)
  .delete(protect, authorize('admin'), deleteBattle);

module.exports = router;
