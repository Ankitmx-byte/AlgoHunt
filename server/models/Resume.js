const mongoose = require('mongoose');

const ResumeSchema = new mongoose.Schema({
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
  personalInfo: {
    fullName: {
      type: String,
      required: [true, 'Please add your full name']
    },
    email: {
      type: String,
      required: [true, 'Please add your email']
    },
    phone: {
      type: String
    },
    location: {
      type: String
    },
    website: {
      type: String
    },
    linkedin: {
      type: String
    },
    github: {
      type: String
    }
  },
  summary: {
    type: String,
    maxlength: [500, 'Summary cannot be more than 500 characters']
  },
  skills: [{
    type: String
  }],
  experience: [{
    title: {
      type: String,
      required: [true, 'Please add a job title']
    },
    company: {
      type: String,
      required: [true, 'Please add a company name']
    },
    location: {
      type: String
    },
    startDate: {
      type: Date,
      required: [true, 'Please add a start date']
    },
    endDate: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String,
      required: [true, 'Please add a job description']
    },
    achievements: [{
      type: String
    }],
    technologies: [{
      type: String
    }]
  }],
  education: [{
    institution: {
      type: String,
      required: [true, 'Please add an institution name']
    },
    degree: {
      type: String,
      required: [true, 'Please add a degree']
    },
    fieldOfStudy: {
      type: String
    },
    location: {
      type: String
    },
    startDate: {
      type: Date,
      required: [true, 'Please add a start date']
    },
    endDate: {
      type: Date
    },
    current: {
      type: Boolean,
      default: false
    },
    description: {
      type: String
    },
    gpa: {
      type: String
    }
  }],
  projects: [{
    title: {
      type: String,
      required: [true, 'Please add a project title']
    },
    description: {
      type: String,
      required: [true, 'Please add a project description']
    },
    technologies: [{
      type: String
    }],
    link: {
      type: String
    },
    github: {
      type: String
    },
    startDate: {
      type: Date
    },
    endDate: {
      type: Date
    }
  }],
  certifications: [{
    name: {
      type: String,
      required: [true, 'Please add a certification name']
    },
    issuer: {
      type: String,
      required: [true, 'Please add an issuer']
    },
    date: {
      type: Date
    },
    expiryDate: {
      type: Date
    },
    credentialID: {
      type: String
    },
    link: {
      type: String
    }
  }],
  languages: [{
    language: {
      type: String,
      required: [true, 'Please add a language']
    },
    proficiency: {
      type: String,
      enum: ['Basic', 'Conversational', 'Proficient', 'Fluent', 'Native']
    }
  }],
  atsScore: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  atsAnalysis: {
    keywords: [{
      keyword: String,
      found: Boolean
    }],
    suggestions: [{
      type: String
    }],
    missingKeywords: [{
      type: String
    }],
    formatIssues: [{
      type: String
    }]
  },
  template: {
    type: String,
    enum: ['Professional', 'Modern', 'Creative', 'Simple', 'Technical'],
    default: 'Professional'
  },
  isPublic: {
    type: Boolean,
    default: false
  },
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
ResumeSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Resume', ResumeSchema);
