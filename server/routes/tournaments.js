const express = require('express');
const {
  getTournaments,
  getTournament,
  createTournament,
  updateTournament,
  deleteTournament,
  registerForTournament
} = require('../controllers/tournaments');

const Tournament = require('../models/Tournament');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Register route
router.route('/:id/register').post(protect, registerForTournament);

// Main tournament routes
router
  .route('/')
  .get(advancedResults(Tournament), getTournaments)
  .post(protect, authorize('admin'), createTournament);

router
  .route('/:id')
  .get(getTournament)
  .put(protect, authorize('admin'), updateTournament)
  .delete(protect, authorize('admin'), deleteTournament);

module.exports = router;
