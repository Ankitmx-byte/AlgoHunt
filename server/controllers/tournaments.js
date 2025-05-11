const Tournament = require('../models/Tournament');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all tournaments
// @route   GET /api/tournaments
// @access  Public
exports.getTournaments = async (req, res, next) => {
  try {
    // Update tournament statuses based on current time
    const tournaments = await Tournament.find();
    for (const tournament of tournaments) {
      await tournament.updateStatus();
    }

    res.status(200).json(res.advancedResults);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single tournament
// @route   GET /api/tournaments/:id
// @access  Public
exports.getTournament = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return next(
        new ErrorResponse(`Tournament not found with id of ${req.params.id}`, 404)
      );
    }

    // Update tournament status based on current time
    await tournament.updateStatus();

    res.status(200).json({
      success: true,
      data: tournament
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new tournament
// @route   POST /api/tournaments
// @access  Private/Admin
exports.createTournament = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const tournament = await Tournament.create(req.body);

    res.status(201).json({
      success: true,
      data: tournament
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update tournament
// @route   PUT /api/tournaments/:id
// @access  Private/Admin
exports.updateTournament = async (req, res, next) => {
  try {
    let tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return next(
        new ErrorResponse(`Tournament not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is tournament creator or admin
    if (tournament.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this tournament`,
          401
        )
      );
    }

    tournament = await Tournament.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: tournament
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete tournament
// @route   DELETE /api/tournaments/:id
// @access  Private/Admin
exports.deleteTournament = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return next(
        new ErrorResponse(`Tournament not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is tournament creator or admin
    if (tournament.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this tournament`,
          401
        )
      );
    }

    await tournament.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Register for tournament
// @route   POST /api/tournaments/:id/register
// @access  Private
exports.registerForTournament = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id);

    if (!tournament) {
      return next(
        new ErrorResponse(`Tournament not found with id of ${req.params.id}`, 404)
      );
    }

    // Check if tournament registration is open
    if (tournament.status !== 'open') {
      return next(
        new ErrorResponse(`Registration for this tournament is closed`, 400)
      );
    }

    // Check if user is already registered
    const user = await User.findById(req.user.id);
    if (user.registeredTournaments.includes(tournament._id)) {
      return next(
        new ErrorResponse(`User already registered for this tournament`, 400)
      );
    }

    // Add user to tournament participants
    tournament.participants.push({ 
      user: req.user.id,
      score: 0,
      roundProgress: []
    });
    await tournament.save();

    // Add tournament to user's registered tournaments
    user.registeredTournaments.push(tournament._id);
    user.stats.tournamentsParticipated += 1;
    await user.save();

    res.status(200).json({
      success: true,
      data: tournament
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Get tournament leaderboard
// @route   GET /api/tournaments/:id/leaderboard
// @access  Public
exports.getTournamentLeaderboard = async (req, res, next) => {
  try {
    const tournament = await Tournament.findById(req.params.id)
      .populate({
        path: 'participants.user',
        select: 'name username avatar stats'
      });

    if (!tournament) {
      return next(
        new ErrorResponse(`Tournament not found with id of ${req.params.id}`, 404)
      );
    }

    // Sort participants by score (descending)
    tournament.participants.sort((a, b) => b.score - a.score);

    // Assign ranks
    tournament.participants.forEach((participant, index) => {
      participant.rank = index + 1;
    });

    await tournament.save();

    res.status(200).json({
      success: true,
      data: tournament.participants
    });
  } catch (err) {
    next(err);
  }
};
