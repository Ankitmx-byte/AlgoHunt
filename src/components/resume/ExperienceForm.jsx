import React, { useState } from 'react';
import './ResumeComponents.css';

function ExperienceForm({ data, onChange }) {
  const [newExperience, setNewExperience] = useState({
    title: '',
    company: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    achievements: [],
    technologies: []
  });
  const [newAchievement, setNewAchievement] = useState('');
  const [newTechnology, setNewTechnology] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddExperience = () => {
    if (editIndex >= 0) {
      // Update existing experience
      const updatedExperiences = [...data];
      updatedExperiences[editIndex] = newExperience;
      onChange(updatedExperiences);
      setEditIndex(-1);
    } else {
      // Add new experience
      onChange([...data, newExperience]);
    }

    // Reset form
    setNewExperience({
      title: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [],
      technologies: []
    });
  };

  const handleEditExperience = (index) => {
    setNewExperience(data[index]);
    setEditIndex(index);
  };

  const handleRemoveExperience = (index) => {
    const updatedExperiences = [...data];
    updatedExperiences.splice(index, 1);
    onChange(updatedExperiences);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewExperience({
      ...newExperience,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleAddAchievement = () => {
    if (newAchievement.trim()) {
      setNewExperience({
        ...newExperience,
        achievements: [...newExperience.achievements, newAchievement.trim()]
      });
      setNewAchievement('');
    }
  };

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = [...newExperience.achievements];
    updatedAchievements.splice(index, 1);
    setNewExperience({
      ...newExperience,
      achievements: updatedAchievements
    });
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim()) {
      setNewExperience({
        ...newExperience,
        technologies: [...newExperience.technologies, newTechnology.trim()]
      });
      setNewTechnology('');
    }
  };

  const handleRemoveTechnology = (index) => {
    const updatedTechnologies = [...newExperience.technologies];
    updatedTechnologies.splice(index, 1);
    setNewExperience({
      ...newExperience,
      technologies: updatedTechnologies
    });
  };

  return (
    <div className="experience-form">
      <h2>Work Experience</h2>
      <p className="form-description">
        List your work experience in reverse chronological order (most recent first).
      </p>

      <div className="experience-list">
        {data.map((experience, index) => (
          <div key={index} className="experience-item">
            <div className="experience-item-header">
              <h3 className="experience-item-title">{experience.title}</h3>
              <div className="experience-item-company">{experience.company}</div>
            </div>
            <button 
              className="delete-btn" 
              onClick={() => handleRemoveExperience(index)}
            >
              ×
            </button>
            <p>{experience.startDate} - {experience.current ? 'Present' : experience.endDate}</p>
            <p>{experience.description}</p>
            <button 
              className="btn btn-secondary" 
              onClick={() => handleEditExperience(index)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <div className="experience-form-fields">
        <h3>{editIndex >= 0 ? 'Edit Experience' : 'Add Experience'}</h3>
        
        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="title">Job Title *</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newExperience.title}
                onChange={handleInputChange}
                placeholder="e.g., Software Engineer"
                required
              />
            </div>
          </div>
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="company">Company *</label>
              <input
                type="text"
                id="company"
                name="company"
                value={newExperience.company}
                onChange={handleInputChange}
                placeholder="e.g., Tech Solutions Inc."
                required
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            value={newExperience.location}
            onChange={handleInputChange}
            placeholder="e.g., New York, NY"
          />
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="month"
                id="startDate"
                name="startDate"
                value={newExperience.startDate}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="endDate">End Date</label>
              <input
                type="month"
                id="endDate"
                name="endDate"
                value={newExperience.endDate}
                onChange={handleInputChange}
                disabled={newExperience.current}
              />
            </div>
          </div>
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="current"
              checked={newExperience.current}
              onChange={handleInputChange}
            />
            I currently work here
          </label>
        </div>

        <div className="form-group">
          <label htmlFor="description">Job Description *</label>
          <textarea
            id="description"
            name="description"
            value={newExperience.description}
            onChange={handleInputChange}
            placeholder="Describe your responsibilities and role..."
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label>Key Achievements</label>
          <div className="tags-container">
            {newExperience.achievements.map((achievement, index) => (
              <div key={index} className="tag">
                {achievement}
                <span 
                  className="remove-tag" 
                  onClick={() => handleRemoveAchievement(index)}
                >
                  ×
                </span>
              </div>
            ))}
          </div>
          <div className="tag-input-container">
            <input
              type="text"
              value={newAchievement}
              onChange={(e) => setNewAchievement(e.target.value)}
              placeholder="e.g., Increased sales by 20%"
              onKeyPress={(e) => e.key === 'Enter' && handleAddAchievement()}
            />
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleAddAchievement}
            >
              Add
            </button>
          </div>
        </div>

        <div className="form-group">
          <label>Technologies Used</label>
          <div className="tags-container">
            {newExperience.technologies.map((tech, index) => (
              <div key={index} className="tag">
                {tech}
                <span 
                  className="remove-tag" 
                  onClick={() => handleRemoveTechnology(index)}
                >
                  ×
                </span>
              </div>
            ))}
          </div>
          <div className="tag-input-container">
            <input
              type="text"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              placeholder="e.g., React"
              onKeyPress={(e) => e.key === 'Enter' && handleAddTechnology()}
            />
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={handleAddTechnology}
            >
              Add
            </button>
          </div>
        </div>

        <div className="actions-row">
          {editIndex >= 0 && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => {
                setEditIndex(-1);
                setNewExperience({
                  title: '',
                  company: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  current: false,
                  description: '',
                  achievements: [],
                  technologies: []
                });
              }}
            >
              Cancel
            </button>
          )}
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleAddExperience}
            disabled={!newExperience.title || !newExperience.company || !newExperience.startDate || !newExperience.description}
          >
            {editIndex >= 0 ? 'Update Experience' : 'Add Experience'}
          </button>
        </div>
      </div>

      <div className="form-tips">
        <h4>Tips for Work Experience:</h4>
        <ul>
          <li>Focus on achievements rather than just responsibilities</li>
          <li>Use action verbs (e.g., "Developed," "Led," "Implemented")</li>
          <li>Include metrics and quantifiable results when possible</li>
          <li>List relevant technologies and tools used</li>
          <li>Keep descriptions concise and focused on impact</li>
        </ul>
      </div>
    </div>
  );
}

export default ExperienceForm;
