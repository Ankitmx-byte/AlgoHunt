import React from 'react';
import './ResumeComponents.css';

function SummaryForm({ data, onChange }) {
  const handleChange = (e) => {
    onChange(e.target.value);
  };

  return (
    <div className="summary-form">
      <h2>Professional Summary</h2>
      <p className="form-description">
        A strong summary highlights your key skills and experience. Keep it concise and tailored to the job you're applying for.
      </p>

      <div className="form-group">
        <label htmlFor="summary">Professional Summary</label>
        <textarea
          id="summary"
          value={data}
          onChange={handleChange}
          placeholder="Briefly describe your professional background, key skills, and career goals..."
          rows={6}
        />
      </div>

      <div className="form-tips">
        <h4>Tips for a Strong Summary:</h4>
        <ul>
          <li>Keep it concise (3-5 sentences)</li>
          <li>Highlight your most relevant skills and experience</li>
          <li>Include quantifiable achievements when possible</li>
          <li>Tailor it to the specific job you're applying for</li>
          <li>Avoid generic statements and clichés</li>
        </ul>
      </div>
    </div>
  );
}

export default SummaryForm;
