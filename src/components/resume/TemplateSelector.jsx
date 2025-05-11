import React from 'react';
import './ResumeComponents.css';

function TemplateSelector({ selected, onChange }) {
  const templates = [
    {
      id: 'Professional',
      name: 'Professional',
      description: 'Clean and traditional layout suitable for most industries',
      previewImage: 'professional-template.png'
    },
    {
      id: 'Modern',
      name: 'Modern',
      description: 'Contemporary design with a creative touch',
      previewImage: 'modern-template.png'
    },
    {
      id: 'Creative',
      name: 'Creative',
      description: 'Bold design for creative industries',
      previewImage: 'creative-template.png'
    },
    {
      id: 'Simple',
      name: 'Simple',
      description: 'Minimalist design focusing on content',
      previewImage: 'simple-template.png'
    },
    {
      id: 'Technical',
      name: 'Technical',
      description: 'Optimized for technical roles and skills',
      previewImage: 'technical-template.png'
    }
  ];

  return (
    <div className="template-selector">
      <h2>Resume Template</h2>
      <p className="form-description">
        Choose a template that best represents your professional style. All templates are ATS-friendly.
      </p>

      <div className="template-options">
        {templates.map(template => (
          <div 
            key={template.id}
            className={`template-option ${selected === template.id ? 'selected' : ''}`}
            onClick={() => onChange(template.id)}
          >
            <div className="template-preview">
              {/* In a real implementation, this would be an actual image */}
              <div className="template-preview-placeholder">
                {template.name} Preview
              </div>
            </div>
            <div className="template-info">
              <h3 className="template-name">{template.name}</h3>
              <p className="template-description">{template.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="form-tips">
        <h4>Tips for Choosing a Template:</h4>
        <ul>
          <li>Consider the industry and company culture when selecting a template</li>
          <li>More traditional industries (finance, law) typically prefer conservative designs</li>
          <li>Creative industries allow for more design elements</li>
          <li>All templates are ATS-friendly, but simpler designs typically perform better</li>
          <li>Ensure your content is well-organized regardless of template choice</li>
        </ul>
      </div>
    </div>
  );
}

export default TemplateSelector;
