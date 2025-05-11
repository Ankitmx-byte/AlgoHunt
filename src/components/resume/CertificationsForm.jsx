import React, { useState } from 'react';
import './ResumeComponents.css';

function CertificationsForm({ data, onChange }) {
  const [newCertification, setNewCertification] = useState({
    name: '',
    issuer: '',
    date: '',
    expiryDate: '',
    credentialID: '',
    link: ''
  });
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddCertification = () => {
    if (editIndex >= 0) {
      // Update existing certification
      const updatedCertifications = [...data];
      updatedCertifications[editIndex] = newCertification;
      onChange(updatedCertifications);
      setEditIndex(-1);
    } else {
      // Add new certification
      onChange([...data, newCertification]);
    }

    // Reset form
    setNewCertification({
      name: '',
      issuer: '',
      date: '',
      expiryDate: '',
      credentialID: '',
      link: ''
    });
  };

  const handleEditCertification = (index) => {
    setNewCertification(data[index]);
    setEditIndex(index);
  };

  const handleRemoveCertification = (index) => {
    const updatedCertifications = [...data];
    updatedCertifications.splice(index, 1);
    onChange(updatedCertifications);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCertification({
      ...newCertification,
      [name]: value
    });
  };

  return (
    <div className="certifications-form">
      <h2>Certifications</h2>
      <p className="form-description">
        List relevant certifications, licenses, or professional credentials that enhance your qualifications.
      </p>

      <div className="certifications-list">
        {data.map((certification, index) => (
          <div key={index} className="certification-item">
            <div className="certification-item-header">
              <h3 className="certification-item-name">{certification.name}</h3>
              <div className="certification-item-issuer">{certification.issuer}</div>
            </div>
            <button 
              className="delete-btn" 
              onClick={() => handleRemoveCertification(index)}
            >
              ×
            </button>
            <p>Issued: {certification.date}</p>
            {certification.expiryDate && <p>Expires: {certification.expiryDate}</p>}
            {certification.credentialID && <p>Credential ID: {certification.credentialID}</p>}
            <button 
              className="btn btn-secondary" 
              onClick={() => handleEditCertification(index)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <div className="certification-form-fields">
        <h3>{editIndex >= 0 ? 'Edit Certification' : 'Add Certification'}</h3>
        
        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="name">Certification Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newCertification.name}
                onChange={handleInputChange}
                placeholder="e.g., AWS Certified Solutions Architect"
                required
              />
            </div>
          </div>
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="issuer">Issuing Organization *</label>
              <input
                type="text"
                id="issuer"
                name="issuer"
                value={newCertification.issuer}
                onChange={handleInputChange}
                placeholder="e.g., Amazon Web Services"
                required
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="date">Issue Date *</label>
              <input
                type="month"
                id="date"
                name="date"
                value={newCertification.date}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="expiryDate">Expiry Date (if applicable)</label>
              <input
                type="month"
                id="expiryDate"
                name="expiryDate"
                value={newCertification.expiryDate}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="credentialID">Credential ID</label>
              <input
                type="text"
                id="credentialID"
                name="credentialID"
                value={newCertification.credentialID}
                onChange={handleInputChange}
                placeholder="e.g., ABC123XYZ"
              />
            </div>
          </div>
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="link">Credential URL</label>
              <input
                type="url"
                id="link"
                name="link"
                value={newCertification.link}
                onChange={handleInputChange}
                placeholder="e.g., https://www.credential.net/abc123xyz"
              />
            </div>
          </div>
        </div>

        <div className="actions-row">
          {editIndex >= 0 && (
            <button 
              type="button" 
              className="btn btn-secondary"
              onClick={() => {
                setEditIndex(-1);
                setNewCertification({
                  name: '',
                  issuer: '',
                  date: '',
                  expiryDate: '',
                  credentialID: '',
                  link: ''
                });
              }}
            >
              Cancel
            </button>
          )}
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleAddCertification}
            disabled={!newCertification.name || !newCertification.issuer || !newCertification.date}
          >
            {editIndex >= 0 ? 'Update Certification' : 'Add Certification'}
          </button>
        </div>
      </div>

      <div className="form-tips">
        <h4>Tips for Certifications Section:</h4>
        <ul>
          <li>Include certifications that are relevant to the job you're applying for</li>
          <li>List the most recent or prestigious certifications first</li>
          <li>Include the credential ID and verification link when available</li>
          <li>Mention if the certification is in progress (with expected completion date)</li>
          <li>Only include active certifications (or clearly mark expired ones)</li>
        </ul>
      </div>
    </div>
  );
}

export default CertificationsForm;
