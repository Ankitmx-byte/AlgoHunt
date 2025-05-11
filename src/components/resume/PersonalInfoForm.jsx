import React from 'react';
import './ResumeComponents.css';

function PersonalInfoForm({ data, onChange }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({
      ...data,
      [name]: value
    });
  };

  return (
    <div className="personal-info-form">
      <h2>Personal Information</h2>
      <p className="form-description">
        This information will appear at the top of your resume. Only your name and email are required.
      </p>

      <div className="form-group">
        <label htmlFor="fullName">Full Name *</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={data.fullName}
          onChange={handleChange}
          placeholder="e.g., John Doe"
          required
        />
      </div>

      <div className="form-row">
        <div className="form-col">
          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={data.email}
              onChange={handleChange}
              placeholder="e.g., john.doe@example.com"
              required
            />
          </div>
        </div>
        <div className="form-col">
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={data.phone}
              onChange={handleChange}
              placeholder="e.g., (123) 456-7890"
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
          value={data.location}
          onChange={handleChange}
          placeholder="e.g., New York, NY"
        />
      </div>

      <h3 className="section-subtitle">Online Presence</h3>
      <div className="form-row">
        <div className="form-col">
          <div className="form-group">
            <label htmlFor="website">Personal Website</label>
            <input
              type="url"
              id="website"
              name="website"
              value={data.website}
              onChange={handleChange}
              placeholder="e.g., https://johndoe.com"
            />
          </div>
        </div>
        <div className="form-col">
          <div className="form-group">
            <label htmlFor="linkedin">LinkedIn</label>
            <input
              type="url"
              id="linkedin"
              name="linkedin"
              value={data.linkedin}
              onChange={handleChange}
              placeholder="e.g., https://linkedin.com/in/johndoe"
            />
          </div>
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="github">GitHub</label>
        <input
          type="url"
          id="github"
          name="github"
          value={data.github}
          onChange={handleChange}
          placeholder="e.g., https://github.com/johndoe"
        />
      </div>

      <div className="form-tips">
        <h4>Tips for Personal Information:</h4>
        <ul>
          <li>Use a professional email address, preferably with your name.</li>
          <li>Include your city and state, but you can omit your full address for privacy.</li>
          <li>Add relevant social media profiles that showcase your professional work.</li>
          <li>Make sure all links are working and lead to up-to-date profiles.</li>
        </ul>
      </div>
    </div>
  );
}

export default PersonalInfoForm;
