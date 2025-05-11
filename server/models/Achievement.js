const mongoose = require('mongoose');

const AchievementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title cannot be more than 50 characters']
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxlength: [200, 'Description cannot be more than 200 characters']
  },
  icon: {
    type: String,
    required: [true, 'Please add an icon']
  },
  category: {
    type: String,
    enum: ['Battles', 'Tournaments', 'Learning', 'Community', 'General'],
    required: [true, 'Please add a category']
  },
  criteria: {
    type: {
      type: String,
      enum: ['count', 'streak', 'specific'],
      required: [true, 'Please add criteria type']
    },
    target: {
      type: Number,
      required: [true, 'Please add target value']
    },
    metric: {
      type: String,
      enum: ['battles_won', 'tournaments_participated', 'problems_solved', 'learning_paths_completed', 'days_streak', 'code_reviews'],
      required: [true, 'Please add metric']
    }
  },
  difficulty: {
    type: String,
    enum: ['Bronze', 'Silver', 'Gold', 'Platinum'],
    default: 'Bronze'
  },
  xpReward: {
    type: Number,
    default: 100
  },
  isHidden: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// User Achievement progress schema (separate collection)
const UserAchievementSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  achievement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Achievement',
    required: true
  },
  progress: {
    type: Number,
    default: 0
  },
  currentValue: {
    type: Number,
    default: 0
  },
  unlocked: {
    type: Boolean,
    default: false
  },
  unlockedDate: {
    type: Date
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a compound index to ensure a user can only have one entry per achievement
UserAchievementSchema.index({ user: 1, achievement: 1 }, { unique: true });

const Achievement = mongoose.model('Achievement', AchievementSchema);
const UserAchievement = mongoose.model('UserAchievement', UserAchievementSchema);

module.exports = { Achievement, UserAchievement };
