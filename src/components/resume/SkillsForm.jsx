import React, { useState } from 'react';
import './ResumeComponents.css';

function SkillsForm({ data, onChange }) {
  const [newSkill, setNewSkill] = useState('');
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddSkill();
    }
  };

  // Common skill suggestions by category
  const skillSuggestions = {
    technical: [
      'JavaScript', 'Python', 'Java', 'C++', 'C#', 'Ruby', 'PHP', 'Swift', 'Kotlin',
      'React', 'Angular', 'Vue.js', 'Node.js', 'Express', 'Django', 'Flask', 'Spring Boot',
      'HTML', 'CSS', 'SASS', 'Bootstrap', 'Tailwind CSS', 'Material UI',
      'SQL', 'MongoDB', 'PostgreSQL', 'MySQL', 'Firebase', 'Redis',
      'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'CI/CD',
      'Git', 'GitHub', 'GitLab', 'Bitbucket', 'Jira', 'Confluence'
    ],
    soft: [
      'Communication', 'Teamwork', 'Problem Solving', 'Critical Thinking', 'Adaptability',
      'Time Management', 'Leadership', 'Creativity', 'Attention to Detail', 'Collaboration',
      'Project Management', 'Conflict Resolution', 'Decision Making', 'Emotional Intelligence'
    ],
    languages: [
      'English', 'Spanish', 'French', 'German', 'Chinese', 'Japanese', 'Russian', 'Arabic',
      'Portuguese', 'Italian', 'Hindi', 'Korean'
    ]
  };

  const addSuggestedSkill = (skill) => {
    if (!data.includes(skill)) {
      onChange([...data, skill]);
    }
  };

  return (
    <div className="skills-form">
      <h2>Skills</h2>
      <p className="form-description">
        List your technical skills, soft skills, and other relevant abilities. These are often scanned by ATS systems for keyword matches.
      </p>

      <div className="form-group">
        <label htmlFor="skills">Your Skills</label>
        <div className="skills-container">
          {data.map((skill, index) => (
            <div key={index} className="skill-tag">
              {skill}
              <span 
                className="remove-skill" 
                onClick={() => handleRemoveSkill(skill)}
              >
                ×
              </span>
            </div>
          ))}
        </div>
        <div className="skill-input-container">
          <input
            type="text"
            id="skills"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Add a skill..."
          />
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleAddSkill}
          >
            Add
          </button>
        </div>
      </div>

      <div className="skill-suggestions">
        <h3>Suggested Skills</h3>
        <div className="suggestion-category">
          <h4>Technical Skills</h4>
          <div className="suggestion-tags">
            {skillSuggestions.technical.map((skill, index) => (
              <div 
                key={index} 
                className={`suggestion-tag ${data.includes(skill) ? 'selected' : ''}`}
                onClick={() => addSuggestedSkill(skill)}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="suggestion-category">
          <h4>Soft Skills</h4>
          <div className="suggestion-tags">
            {skillSuggestions.soft.map((skill, index) => (
              <div 
                key={index} 
                className={`suggestion-tag ${data.includes(skill) ? 'selected' : ''}`}
                onClick={() => addSuggestedSkill(skill)}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="suggestion-category">
          <h4>Languages</h4>
          <div className="suggestion-tags">
            {skillSuggestions.languages.map((skill, index) => (
              <div 
                key={index} 
                className={`suggestion-tag ${data.includes(skill) ? 'selected' : ''}`}
                onClick={() => addSuggestedSkill(skill)}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="form-tips">
        <h4>Tips for Skills Section:</h4>
        <ul>
          <li>Include a mix of technical and soft skills</li>
          <li>List skills that are relevant to the job you're applying for</li>
          <li>Be specific with technical skills (e.g., "React" instead of just "JavaScript frameworks")</li>
          <li>Include proficiency levels for languages (e.g., "Spanish (Fluent)")</li>
          <li>Prioritize skills mentioned in the job description</li>
        </ul>
      </div>
    </div>
  );
}

export default SkillsForm;
