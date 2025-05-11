const mongoose = require('mongoose');

const BattleSchema = new mongoose.Schema({
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
  difficulty: {
    type: String,
    required: [true, 'Please add a difficulty level'],
    enum: ['Easy', 'Medium', 'Hard']
  },
  category: {
    type: String,
    required: [true, 'Please add a category'],
    enum: ['Algorithms', 'Data Structures', 'Frontend', 'Backend', 'Database', 'System Design']
  },
  duration: {
    type: Number,
    required: [true, 'Please add a duration in minutes']
  },
  startTime: {
    type: Date,
    required: [true, 'Please add a start time']
  },
  endTime: {
    type: Date
  },
  status: {
    type: String,
    enum: ['upcoming', 'live', 'completed'],
    default: 'upcoming'
  },
  problem: {
    title: String,
    description: String,
    constraints: String,
    inputFormat: String,
    outputFormat: String,
    sampleInput: String,
    sampleOutput: String,
    explanation: String,
    starterCode: {
      javascript: String,
      python: String,
      java: String,
      cpp: String
    }
  },
  testCases: [{
    input: String,
    expectedOutput: String,
    isHidden: {
      type: Boolean,
      default: false
    }
  }],
  participants: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    progress: {
      type: Number,
      default: 0
    },
    submissionTime: Date,
    code: String,
    language: String,
    result: {
      passed: Boolean,
      score: Number,
      testResults: [{
        testCase: Number,
        passed: Boolean,
        output: String,
        expectedOutput: String
      }]
    }
  }],
  maxParticipants: {
    type: Number,
    default: 100
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

// Set endTime based on startTime and duration
BattleSchema.pre('save', function(next) {
  if (this.startTime && this.duration && !this.endTime) {
    this.endTime = new Date(this.startTime.getTime() + this.duration * 60000);
  }
  next();
});

// Update status based on current time
BattleSchema.methods.updateStatus = function() {
  const now = new Date();
  if (now < this.startTime) {
    this.status = 'upcoming';
  } else if (now >= this.startTime && now <= this.endTime) {
    this.status = 'live';
  } else {
    this.status = 'completed';
  }
  return this.save();
};

module.exports = mongoose.model('Battle', BattleSchema);
