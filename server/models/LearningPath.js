const mongoose = require('mongoose');

const LearningPathSchema = new mongoose.Schema({
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
    enum: ['Beginner', 'Intermediate', 'Advanced', 'Expert'],
    required: [true, 'Please add a difficulty level']
  },
  estimatedTime: {
    type: String,
    required: [true, 'Please add estimated completion time']
  },
  prerequisites: [{
    type: String
  }],
  learningOutcomes: [{
    type: String
  }],
  modules: [{
    title: {
      type: String,
      required: [true, 'Please add a module title']
    },
    description: {
      type: String,
      required: [true, 'Please add a module description']
    },
    estimatedTime: {
      type: String,
      required: [true, 'Please add estimated module completion time']
    },
    topics: [{
      type: String
    }],
    content: {
      type: String,
      required: [true, 'Please add module content']
    },
    resources: [{
      title: String,
      url: String,
      type: {
        type: String,
        enum: ['article', 'video', 'book', 'exercise']
      }
    }],
    exercises: [{
      title: String,
      description: String,
      difficulty: {
        type: String,
        enum: ['Easy', 'Medium', 'Hard']
      },
      problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Battle'
      }
    }],
    quiz: [{
      question: String,
      options: [String],
      correctAnswer: Number,
      explanation: String
    }]
  }],
  category: {
    type: String,
    enum: ['Algorithms', 'Data Structures', 'Frontend', 'Backend', 'Database', 'System Design'],
    required: [true, 'Please add a category']
  },
  tags: [{
    type: String
  }],
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

// User Learning Progress schema (separate collection)
const UserLearningProgressSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  learningPath: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LearningPath',
    required: true
  },
  pathProgress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  completedModules: [{
    type: Number
  }],
  moduleProgress: {
    type: Map,
    of: Number,
    default: {}
  },
  quizResults: [{
    moduleIndex: Number,
    score: Number,
    completedAt: Date
  }],
  exerciseResults: [{
    moduleIndex: Number,
    exerciseIndex: Number,
    completed: Boolean,
    code: String,
    language: String,
    completedAt: Date
  }],
  lastAccessedModule: {
    type: Number,
    default: 0
  },
  startedAt: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  }
});

// Create a compound index to ensure a user can only have one entry per learning path
UserLearningProgressSchema.index({ user: 1, learningPath: 1 }, { unique: true });

const LearningPath = mongoose.model('LearningPath', LearningPathSchema);
const UserLearningProgress = mongoose.model('UserLearningProgress', UserLearningProgressSchema);

module.exports = { LearningPath, UserLearningProgress };
