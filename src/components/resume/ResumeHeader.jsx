import React, { useState } from 'react';
import './ResumeComponents.css';

function ResumeHeader({ 
  title, 
  onTitleChange, 
  onSave, 
  onGeneratePDF, 
  onTogglePreview, 
  saved, 
  loading 
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);

  const handleTitleClick = () => {
    setIsEditing(true);
    setEditedTitle(title);
  };

  const handleTitleChange = (e) => {
    setEditedTitle(e.target.value);
  };

  const handleTitleBlur = () => {
    setIsEditing(false);
    onTitleChange(editedTitle);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setIsEditing(false);
      onTitleChange(editedTitle);
    }
  };

  return (
    <div className="resume-header">
      <div className="resume-title-container">
        {isEditing ? (
          <input
            type="text"
            value={editedTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleBlur}
            onKeyDown={handleKeyDown}
            className="resume-title-input"
            autoFocus
          />
        ) : (
          <h1 className="resume-title" onClick={handleTitleClick}>
            {title}
            <span className="edit-icon">✎</span>
          </h1>
        )}
      </div>
      
      <div className="resume-actions">
        <button 
          className={`btn ${saved ? 'btn-success' : 'btn-primary'}`}
          onClick={onSave}
          disabled={loading}
        >
          {loading ? 'Saving...' : saved ? 'Saved ✓' : 'Save Resume'}
        </button>
        
        <button 
          className="btn btn-secondary"
          onClick={onTogglePreview}
        >
          Toggle Preview
        </button>
        
        <button 
          className="btn btn-secondary"
          onClick={onGeneratePDF}
          disabled={loading}
        >
          Download PDF
        </button>
      </div>
    </div>
  );
}

export default ResumeHeader;
