const Battle = require('../models/Battle');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all battles
// @route   GET /api/battles
// @access  Public
exports.getBattles = async (req, res, next) => {
  try {
    // Update battle statuses based on current time
    const battles = await Battle.find();
    for (const battle of battles) {
      await battle.updateStatus();
    }

    res.status(200).json(res.advancedResults);
  } catch (err) {
    next(err);
  }
};

// @desc    Get single battle
// @route   GET /api/battles/:id
// @access  Public
exports.getBattle = async (req, res, next) => {
  try {
    const battle = await Battle.findById(req.params.id);

    if (!battle) {
      return next(
        new ErrorResponse(`Battle not found with id of ${req.params.id}`, 404)
      );
    }

    // Update battle status based on current time
    await battle.updateStatus();

    res.status(200).json({
      success: true,
      data: battle
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Create new battle
// @route   POST /api/battles
// @access  Private/Admin
exports.createBattle = async (req, res, next) => {
  try {
    // Add user to req.body
    req.body.createdBy = req.user.id;

    const battle = await Battle.create(req.body);

    res.status(201).json({
      success: true,
      data: battle
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Update battle
// @route   PUT /api/battles/:id
// @access  Private/Admin
exports.updateBattle = async (req, res, next) => {
  try {
    let battle = await Battle.findById(req.params.id);

    if (!battle) {
      return next(
        new ErrorResponse(`Battle not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is battle creator or admin
    if (battle.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to update this battle`,
          401
        )
      );
    }

    battle = await Battle.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: battle
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Delete battle
// @route   DELETE /api/battles/:id
// @access  Private/Admin
exports.deleteBattle = async (req, res, next) => {
  try {
    const battle = await Battle.findById(req.params.id);

    if (!battle) {
      return next(
        new ErrorResponse(`Battle not found with id of ${req.params.id}`, 404)
      );
    }

    // Make sure user is battle creator or admin
    if (battle.createdBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(
        new ErrorResponse(
          `User ${req.user.id} is not authorized to delete this battle`,
          401
        )
      );
    }

    await battle.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Register for battle
// @route   POST /api/battles/:id/register
// @access  Private
exports.registerForBattle = async (req, res, next) => {
  try {
    const battle = await Battle.findById(req.params.id);

    if (!battle) {
      return next(
        new ErrorResponse(`Battle not found with id of ${req.params.id}`, 404)
      );
    }

    // Check if battle is upcoming
    if (battle.status !== 'upcoming') {
      return next(
        new ErrorResponse(`Cannot register for a battle that is not upcoming`, 400)
      );
    }

    // Check if user is already registered
    const user = await User.findById(req.user.id);
    if (user.registeredBattles.includes(battle._id)) {
      return next(
        new ErrorResponse(`User already registered for this battle`, 400)
      );
    }

    // Add user to battle participants
    battle.participants.push({ user: req.user.id });
    await battle.save();

    // Add battle to user's registered battles
    user.registeredBattles.push(battle._id);
    await user.save();

    res.status(200).json({
      success: true,
      data: battle
    });
  } catch (err) {
    next(err);
  }
};

// @desc    Submit solution for battle
// @route   POST /api/battles/:id/submit
// @access  Private
exports.submitSolution = async (req, res, next) => {
  try {
    const battle = await Battle.findById(req.params.id);

    if (!battle) {
      return next(
        new ErrorResponse(`Battle not found with id of ${req.params.id}`, 404)
      );
    }

    // Check if battle is live
    if (battle.status !== 'live') {
      return next(
        new ErrorResponse(`Cannot submit solution for a battle that is not live`, 400)
      );
    }

    // Check if user is registered for the battle
    const participantIndex = battle.participants.findIndex(
      p => p.user.toString() === req.user.id
    );

    if (participantIndex === -1) {
      return next(
        new ErrorResponse(`User is not registered for this battle`, 400)
      );
    }

    // Update participant's submission
    const { code, language, result } = req.body;
    
    battle.participants[participantIndex].code = code;
    battle.participants[participantIndex].language = language;
    battle.participants[participantIndex].submissionTime = Date.now();
    battle.participants[participantIndex].result = result;
    battle.participants[participantIndex].progress = 
      (result.testResults.filter(test => test.passed).length / battle.testCases.length) * 100;

    await battle.save();

    // Update user stats if all tests passed
    if (result.passed) {
      const user = await User.findById(req.user.id);
      user.stats.problemsSolved += 1;
      await user.save();
    }

    res.status(200).json({
      success: true,
      data: battle.participants[participantIndex]
    });
  } catch (err) {
    next(err);
  }
};
