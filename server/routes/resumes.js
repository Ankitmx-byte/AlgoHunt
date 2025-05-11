const express = require('express');
const {
  getResumes,
  getResume,
  createResume,
  updateResume,
  deleteResume,
  analyzeResume,
  generateResumePDF
} = require('../controllers/resumes');

const Resume = require('../models/Resume');
const advancedResults = require('../middleware/advancedResults');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Apply protection to all routes
router.use(protect);

router
  .route('/')
  .get(advancedResults(Resume), getResumes)
  .post(createResume);

router
  .route('/:id')
  .get(getResume)
  .put(updateResume)
  .delete(deleteResume);

router
  .route('/:id/analyze')
  .post(analyzeResume);

router
  .route('/:id/pdf')
  .get(generateResumePDF);

module.exports = router;
