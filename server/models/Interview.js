const mongoose = require('mongoose');

const InterviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  jobTitle: {
    type: String,
    required: [true, 'Please add a job title']
  },
  company: {
    type: String
  },
  interviewType: {
    type: String,
    enum: ['Behavioral', 'Technical', 'System Design', 'Coding', 'Mixed'],
    required: [true, 'Please specify the interview type']
  },
  difficulty: {
    type: String,
    enum: ['Entry Level', 'Junior', 'Mid-Level', 'Senior', 'Lead'],
    required: [true, 'Please specify the difficulty level']
  },
  duration: {
    type: Number, // in minutes
    default: 30
  },
  questions: [{
    question: {
      type: String,
      required: [true, 'Please add a question']
    },
    category: {
      type: String,
      enum: ['Behavioral', 'Technical', 'System Design', 'Coding', 'Problem Solving'],
      required: [true, 'Please specify the question category']
    },
    difficulty: {
      type: String,
      enum: ['Easy', 'Medium', 'Hard'],
      default: 'Medium'
    },
    expectedAnswer: {
      type: String
    },
    tips: {
      type: String
    }
  }],
  sessions: [{
    startTime: {
      type: Date,
      default: Date.now
    },
    endTime: {
      type: Date
    },
    duration: {
      type: Number // in seconds
    },
    recording: {
      url: String,
      format: String,
      duration: Number // in seconds
    },
    answers: [{
      questionId: {
        type: mongoose.Schema.Types.ObjectId
      },
      answer: {
        type: String
      },
      startTime: {
        type: Date
      },
      endTime: {
        type: Date
      },
      duration: {
        type: Number // in seconds
      }
    }],
    feedback: {
      overallScore: {
        type: Number,
        min: 0,
        max: 100
      },
      technicalAccuracy: {
        type: Number,
        min: 0,
        max: 100
      },
      communicationScore: {
        type: Number,
        min: 0,
        max: 100
      },
      confidenceScore: {
        type: Number,
        min: 0,
        max: 100
      },
      bodyLanguageScore: {
        type: Number,
        min: 0,
        max: 100
      },
      strengths: [{
        type: String
      }],
      areasForImprovement: [{
        type: String
      }],
      detailedFeedback: [{
        timestamp: Number, // in seconds from start
        feedback: String,
        category: {
          type: String,
          enum: ['Technical', 'Communication', 'Body Language', 'Confidence', 'Other']
        },
        severity: {
          type: String,
          enum: ['Positive', 'Suggestion', 'Minor Issue', 'Major Issue']
        }
      }]
    },
    videoAnalysis: {
      facialExpressions: [{
        timestamp: Number, // in seconds from start
        expression: {
          type: String,
          enum: ['Neutral', 'Happy', 'Sad', 'Angry', 'Surprised', 'Confused', 'Nervous']
        },
        confidence: Number // 0-1
      }],
      eyeContact: [{
        timestamp: Number, // in seconds from start
        maintained: Boolean,
        duration: Number // in seconds
      }],
      posture: [{
        timestamp: Number, // in seconds from start
        quality: {
          type: String,
          enum: ['Good', 'Slouching', 'Rigid', 'Fidgeting']
        },
        duration: Number // in seconds
      }],
      handGestures: [{
        timestamp: Number, // in seconds from start
        type: {
          type: String,
          enum: ['Natural', 'Excessive', 'Minimal', 'Distracting']
        }
      }]
    },
    audioAnalysis: {
      speechRate: [{
        timestamp: Number, // in seconds from start
        wordsPerMinute: Number,
        recommendation: String
      }],
      volume: [{
        timestamp: Number, // in seconds from start
        level: {
          type: String,
          enum: ['Too Low', 'Appropriate', 'Too Loud']
        }
      }],
      fillerWords: [{
        timestamp: Number, // in seconds from start
        word: String,
        count: Number
      }],
      clarity: [{
        timestamp: Number, // in seconds from start
        quality: {
          type: String,
          enum: ['Clear', 'Mumbling', 'Unclear']
        },
        duration: Number // in seconds
      }]
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Update the updatedAt field on save
InterviewSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Interview', InterviewSchema);
