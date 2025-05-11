const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [300, 'Description cannot be more than 300 characters']
  },
  category: {
    type: String,
    enum: ['Daily', 'Challenges', 'Battles', 'Learning', 'Community'],
    required: [true, 'Please add a category']
  },
  reward: {
    xp: {
      type: Number,
      required: [true, 'Please add XP reward'],
      default: 50
    },
    description: {
      type: String,
      required: [true, 'Please add reward description']
    },
    achievementProgress: {
      achievement: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement'
      },
      value: {
        type: Number,
        default: 1
      }
    }
  },
  deadline: {
    type: Date,
    required: [true, 'Please add a deadline']
  },
  isRecurring: {
    type: Boolean,
    default: false
  },
  recurrencePattern: {
    type: String,
    enum: ['daily', 'weekly', 'monthly'],
    default: 'daily'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// User Task progress schema (separate collection)
const UserTaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  task: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  progress: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedDate: {
    type: Date
  },
  rewardClaimed: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a compound index to ensure a user can only have one entry per task
UserTaskSchema.index({ user: 1, task: 1 }, { unique: true });

const Task = mongoose.model('Task', TaskSchema);
const UserTask = mongoose.model('UserTask', UserTaskSchema);

module.exports = { Task, UserTask };
