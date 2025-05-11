const mongoose = require('mongoose');

const TournamentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  startDate: {
    type: Date,
    required: [true, 'Please add a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please add an end date']
  },
  registrationDeadline: {
    type: Date,
    required: [true, 'Please add a registration deadline']
  },
  difficulty: {
    type: String,
    required: [true, 'Please add a difficulty level'],
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert']
  },
  prize: {
    type: String,
    required: [true, 'Please add prize details']
  },
  rounds: [{
    roundNumber: Number,
    title: String,
    description: String,
    startTime: Date,
    endTime: Date,
    problems: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Battle'
    }],
    status: {
      type: String,
      enum: ['upcoming', 'live', 'completed'],
      default: 'upcoming'
    }
  }],
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    score: {
      type: Number,
      default: 0
    },
    rank: Number,
    roundProgress: [{
      roundNumber: Number,
      score: Number,
      completedProblems: Number,
      timeSpent: Number
    }]
  }],
  maxParticipants: {
    type: Number,
    default: 128
  },
  status: {
    type: String,
    enum: ['open', 'upcoming', 'live', 'completed'],
    default: 'open'
  },
  aiMatchmaking: {
    type: Boolean,
    default: true
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Update status based on current time
TournamentSchema.methods.updateStatus = function() {
  const now = new Date();
  if (now < this.registrationDeadline) {
    this.status = 'open';
  } else if (now >= this.registrationDeadline && now < this.startDate) {
    this.status = 'upcoming';
  } else if (now >= this.startDate && now <= this.endDate) {
    this.status = 'live';
  } else {
    this.status = 'completed';
  }
  return this.save();
};

module.exports = mongoose.model('Tournament', TournamentSchema);
