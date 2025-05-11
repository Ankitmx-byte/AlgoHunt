import React, { useState } from 'react';
import './ResumeComponents.css';

function EducationForm({ data, onChange }) {
  const [newEducation, setNewEducation] = useState({
    institution: '',
    degree: '',
    fieldOfStudy: '',
    location: '',
    startDate: '',
    endDate: '',
    current: false,
    description: '',
    gpa: ''
  });
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddEducation = () => {
    if (editIndex >= 0) {
      // Update existing education
      const updatedEducation = [...data];
      updatedEducation[editIndex] = newEducation;
      onChange(updatedEducation);
      setEditIndex(-1);
    } else {
      // Add new education
      onChange([...data, newEducation]);
    }

    // Reset form
    setNewEducation({
      institution: '',
      degree: '',
      fieldOfStudy: '',
      location: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      gpa: ''
    });
  };

  const handleEditEducation = (index) => {
    setNewEducation(data[index]);
    setEditIndex(index);
  };

  const handleRemoveEducation = (index) => {
    const updatedEducation = [...data];
    updatedEducation.splice(index, 1);
    onChange(updatedEducation);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEducation({
      ...newEducation,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="education-form">
      <h2>Education</h2>
      <p className="form-description">
        List your educational background in reverse chronological order (most recent first).
      </p>

      <div className="education-list">
        {data.map((education, index) => (
          <div key={index} className="education-item">
            <div className="education-item-header">
              <h3 className="education-item-degree">{education.degree}</h3>
              <div className="education-item-institution">{education.institution}</div>
            </div>
            <button 
              className="delete-btn" 
              onClick={() => handleRemoveEducation(index)}
            >
              ×
            </button>
            <p>{education.startDate} - {education.current ? 'Present' : education.endDate}</p>
            <p>{education.fieldOfStudy}</p>
            <button 
              className="btn btn-secondary" 
              onClick={() => handleEditEducation(index)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <div className="education-form-fields">
        <h3>{editIndex >= 0 ? 'Edit Education' : 'Add Education'}</h3>
        
        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="institution">Institution *</label>
              <input
                type="text"
                id="institution"
                name="institution"
                value={newEducation.institution}
                onChange={handleInputChange}
                placeholder="e.g., University of California, Berkeley"
                required
              />
            </div>
          </div>
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                name="location"
                value={newEducation.location}
                onChange={handleInputChange}
                placeholder="e.g., Berkeley, CA"
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="degree">Degree *</label>
              <input
                type="text"
                id="degree"
                name="degree"
                value={newEducation.degree}
                onChange={handleInputChange}
                placeholder="e.g., Bachelor of Science"
                required
              />
            </div>
          </div>
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="fieldOfStudy">Field of Study *</label>
              <input
                type="text"
                id="fieldOfStudy"
                name="fieldOfStudy"
                value={newEducation.fieldOfStudy}
                onChange={handleInputChange}
                placeholder="e.g., Computer Science"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="startDate">Start Date *</label>
              <input
                type="month"
                id="startDate"
                name="startDate"
                value={newEducation.startDate}
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
                value={newEducation.endDate}
                onChange={handleInputChange}
                disabled={newEducation.current}
              />
            </div>
          </div>
        </div>

        <div className="form-group checkbox">
          <label>
            <input
              type="checkbox"
              name="current"
              checked={newEducation.current}
              onChange={handleInputChange}
            />
            I am currently studying here
          </label>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="gpa">GPA</label>
              <input
                type="text"
                id="gpa"
                name="gpa"
                value={newEducation.gpa}
                onChange={handleInputChange}
                placeholder="e.g., 3.8/4.0"
              />
            </div>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={newEducation.description}
            onChange={handleInputChange}
            placeholder="Describe relevant coursework, honors, activities, etc."
            rows={4}
          />
        </div>

        <div className="actions-row">
          {editIndex >= 0 && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => {
                setEditIndex(-1);
                setNewEducation({
                  institution: '',
                  degree: '',
                  fieldOfStudy: '',
                  location: '',
                  startDate: '',
                  endDate: '',
                  current: false,
                  description: '',
                  gpa: ''
                });
              }}
            >
              Cancel
            </button>
          )}
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleAddEducation}
            disabled={!newEducation.institution || !newEducation.degree || !newEducation.fieldOfStudy || !newEducation.startDate}
          >
            {editIndex >= 0 ? 'Update Education' : 'Add Education'}
          </button>
        </div>
      </div>

      <div className="form-tips">
        <h4>Tips for Education Section:</h4>
        <ul>
          <li>List your highest level of education first</li>
          <li>Include GPA if it's 3.0 or higher (on a 4.0 scale)</li>
          <li>Mention relevant coursework, honors, or academic achievements</li>
          <li>For recent graduates, education often comes before work experience</li>
          <li>You can omit high school education if you have a college degree</li>
        </ul>
      </div>
    </div>
  );
}

export default EducationForm;
