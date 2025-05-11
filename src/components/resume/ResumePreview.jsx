import React from 'react';
import './ResumeComponents.css';

function ResumePreview({ resumeData }) {
  // Function to format date (YYYY-MM to Month YYYY)
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
  };

  return (
    <div className="resume-preview">
      <div className={`resume-preview-container ${resumeData.template.toLowerCase()}`}>
        {/* Header Section */}
        <div className="preview-header">
          <h1 className="preview-name">{resumeData.personalInfo.fullName || 'Your Name'}</h1>
          
          <div className="preview-contact-info">
            {resumeData.personalInfo.email && (
              <div className="preview-contact-item">
                <span className="preview-contact-icon">✉️</span>
                <span>{resumeData.personalInfo.email}</span>
              </div>
            )}
            
            {resumeData.personalInfo.phone && (
              <div className="preview-contact-item">
                <span className="preview-contact-icon">📱</span>
                <span>{resumeData.personalInfo.phone}</span>
              </div>
            )}
            
            {resumeData.personalInfo.location && (
              <div className="preview-contact-item">
                <span className="preview-contact-icon">📍</span>
                <span>{resumeData.personalInfo.location}</span>
              </div>
            )}
          </div>
          
          <div className="preview-links">
            {resumeData.personalInfo.linkedin && (
              <div className="preview-link-item">
                <span className="preview-link-icon">🔗</span>
                <span>LinkedIn: {resumeData.personalInfo.linkedin}</span>
              </div>
            )}
            
            {resumeData.personalInfo.github && (
              <div className="preview-link-item">
                <span className="preview-link-icon">🔗</span>
                <span>GitHub: {resumeData.personalInfo.github}</span>
              </div>
            )}
            
            {resumeData.personalInfo.website && (
              <div className="preview-link-item">
                <span className="preview-link-icon">🔗</span>
                <span>Website: {resumeData.personalInfo.website}</span>
              </div>
            )}
          </div>
        </div>
        
        {/* Summary Section */}
        {resumeData.summary && (
          <div className="preview-section">
            <h2 className="preview-section-title">Professional Summary</h2>
            <div className="preview-summary">
              <p>{resumeData.summary}</p>
            </div>
          </div>
        )}
        
        {/* Skills Section */}
        {resumeData.skills && resumeData.skills.length > 0 && (
          <div className="preview-section">
            <h2 className="preview-section-title">Skills</h2>
            <div className="preview-skills">
              {resumeData.skills.map((skill, index) => (
                <span key={index} className="preview-skill">{skill}</span>
              ))}
            </div>
          </div>
        )}
        
        {/* Experience Section */}
        {resumeData.experience && resumeData.experience.length > 0 && (
          <div className="preview-section">
            <h2 className="preview-section-title">Work Experience</h2>
            {resumeData.experience.map((exp, index) => (
              <div key={index} className="preview-experience-item">
                <div className="preview-item-header">
                  <div className="preview-item-title-group">
                    <h3 className="preview-item-title">{exp.title}</h3>
                    <h4 className="preview-item-subtitle">{exp.company}</h4>
                  </div>
                  <div className="preview-item-date">
                    {formatDate(exp.startDate)} - {exp.current ? 'Present' : formatDate(exp.endDate)}
                  </div>
                </div>
                
                {exp.location && (
                  <div className="preview-item-location">{exp.location}</div>
                )}
                
                <div className="preview-item-description">
                  <p>{exp.description}</p>
                </div>
                
                {exp.achievements && exp.achievements.length > 0 && (
                  <div className="preview-achievements">
                    <h5>Key Achievements:</h5>
                    <ul>
                      {exp.achievements.map((achievement, i) => (
                        <li key={i}>{achievement}</li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {exp.technologies && exp.technologies.length > 0 && (
                  <div className="preview-technologies">
                    <h5>Technologies:</h5>
                    <div className="preview-tech-list">
                      {exp.technologies.map((tech, i) => (
                        <span key={i} className="preview-tech">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Education Section */}
        {resumeData.education && resumeData.education.length > 0 && (
          <div className="preview-section">
            <h2 className="preview-section-title">Education</h2>
            {resumeData.education.map((edu, index) => (
              <div key={index} className="preview-education-item">
                <div className="preview-item-header">
                  <div className="preview-item-title-group">
                    <h3 className="preview-item-title">{edu.degree} in {edu.fieldOfStudy}</h3>
                    <h4 className="preview-item-subtitle">{edu.institution}</h4>
                  </div>
                  <div className="preview-item-date">
                    {formatDate(edu.startDate)} - {edu.current ? 'Present' : formatDate(edu.endDate)}
                  </div>
                </div>
                
                {edu.location && (
                  <div className="preview-item-location">{edu.location}</div>
                )}
                
                {edu.gpa && (
                  <div className="preview-item-gpa">GPA: {edu.gpa}</div>
                )}
                
                {edu.description && (
                  <div className="preview-item-description">
                    <p>{edu.description}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Projects Section */}
        {resumeData.projects && resumeData.projects.length > 0 && (
          <div className="preview-section">
            <h2 className="preview-section-title">Projects</h2>
            {resumeData.projects.map((project, index) => (
              <div key={index} className="preview-project-item">
                <div className="preview-item-header">
                  <div className="preview-item-title-group">
                    <h3 className="preview-item-title">{project.title}</h3>
                    {(project.link || project.github) && (
                      <div className="preview-project-links">
                        {project.link && <span>Live Demo</span>}
                        {project.link && project.github && <span> | </span>}
                        {project.github && <span>GitHub</span>}
                      </div>
                    )}
                  </div>
                  {(project.startDate || project.endDate) && (
                    <div className="preview-item-date">
                      {formatDate(project.startDate)} - {formatDate(project.endDate)}
                    </div>
                  )}
                </div>
                
                <div className="preview-item-description">
                  <p>{project.description}</p>
                </div>
                
                {project.technologies && project.technologies.length > 0 && (
                  <div className="preview-technologies">
                    <div className="preview-tech-list">
                      {project.technologies.map((tech, i) => (
                        <span key={i} className="preview-tech">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        {/* Certifications Section */}
        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <div className="preview-section">
            <h2 className="preview-section-title">Certifications</h2>
            <div className="preview-certifications">
              {resumeData.certifications.map((cert, index) => (
                <div key={index} className="preview-certification-item">
                  <div className="preview-item-title-group">
                    <h3 className="preview-item-title">{cert.name}</h3>
                    <h4 className="preview-item-subtitle">{cert.issuer}</h4>
                  </div>
                  <div className="preview-cert-details">
                    <span>Issued: {formatDate(cert.date)}</span>
                    {cert.expiryDate && <span> | Expires: {formatDate(cert.expiryDate)}</span>}
                    {cert.credentialID && <span> | Credential ID: {cert.credentialID}</span>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="preview-watermark">
        Preview Mode - Download PDF for final version
      </div>
    </div>
  );
}

export default ResumePreview;
