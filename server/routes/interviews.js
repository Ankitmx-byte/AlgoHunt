const express = require('express');
const {
  getInterviews,
  getInterview,
  createInterview,
  updateInterview,
  deleteInterview,
  startInterviewSession,
  endInterviewSession,
  analyzeInterviewSession
} = require('../controllers/interviews');

const Interview = require('../models/Interview');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply protection to all routes
router.use(protect);

router
  .route('/')
  .get(advancedResults(Interview), getInterviews)
  .post(createInterview);

router
  .route('/:id')
  .get(getInterview)
  .put(updateInterview)
  .delete(deleteInterview);

router
  .route('/:id/sessions')
  .post(startInterviewSession);

router
  .route('/:id/sessions/:sessionId')
  .put(endInterviewSession);

router
  .route('/:id/sessions/:sessionId/analyze')
  .post(analyzeInterviewSession);

module.exports = router;
