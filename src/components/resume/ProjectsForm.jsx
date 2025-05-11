import React, { useState } from 'react';
import './ResumeComponents.css';

function ProjectsForm({ data, onChange }) {
  const [newProject, setNewProject] = useState({
    title: '',
    description: '',
    technologies: [],
    link: '',
    github: '',
    startDate: '',
    endDate: ''
  });
  const [newTechnology, setNewTechnology] = useState('');
  const [editIndex, setEditIndex] = useState(-1);

  const handleAddProject = () => {
    if (editIndex >= 0) {
      // Update existing project
      const updatedProjects = [...data];
      updatedProjects[editIndex] = newProject;
      onChange(updatedProjects);
      setEditIndex(-1);
    } else {
      // Add new project
      onChange([...data, newProject]);
    }

    // Reset form
    setNewProject({
      title: '',
      description: '',
      technologies: [],
      link: '',
      github: '',
      startDate: '',
      endDate: ''
    });
  };

  const handleEditProject = (index) => {
    setNewProject(data[index]);
    setEditIndex(index);
  };

  const handleRemoveProject = (index) => {
    const updatedProjects = [...data];
    updatedProjects.splice(index, 1);
    onChange(updatedProjects);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProject({
      ...newProject,
      [name]: value
    });
  };

  const handleAddTechnology = () => {
    if (newTechnology.trim() && !newProject.technologies.includes(newTechnology.trim())) {
      setNewProject({
        ...newProject,
        technologies: [...newProject.technologies, newTechnology.trim()]
      });
      setNewTechnology('');
    }
  };

  const handleRemoveTechnology = (tech) => {
    setNewProject({
      ...newProject,
      technologies: newProject.technologies.filter(t => t !== tech)
    });
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTechnology();
    }
  };

  return (
    <div className="projects-form">
      <h2>Projects</h2>
      <p className="form-description">
        Showcase your personal or professional projects that demonstrate your skills and expertise.
      </p>

      <div className="projects-list">
        {data.map((project, index) => (
          <div key={index} className="project-item">
            <div className="project-item-header">
              <h3 className="project-item-title">{project.title}</h3>
            </div>
            <button 
              className="delete-btn" 
              onClick={() => handleRemoveProject(index)}
            >
              ×
            </button>
            <p className="project-item-description">{project.description}</p>
            <div className="project-item-technologies">
              {project.technologies.map((tech, techIndex) => (
                <span key={techIndex} className="tech-tag">{tech}</span>
              ))}
            </div>
            <button 
              className="btn btn-secondary" 
              onClick={() => handleEditProject(index)}
            >
              Edit
            </button>
          </div>
        ))}
      </div>

      <div className="project-form-fields">
        <h3>{editIndex >= 0 ? 'Edit Project' : 'Add Project'}</h3>
        
        <div className="form-group">
          <label htmlFor="title">Project Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={newProject.title}
            onChange={handleInputChange}
            placeholder="e.g., E-commerce Website"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Project Description *</label>
          <textarea
            id="description"
            name="description"
            value={newProject.description}
            onChange={handleInputChange}
            placeholder="Describe the project, your role, and its impact..."
            rows={4}
            required
          />
        </div>

        <div className="form-group">
          <label>Technologies Used</label>
          <div className="technologies-container">
            {newProject.technologies.map((tech, index) => (
              <div key={index} className="tech-tag">
                {tech}
                <span 
                  className="remove-tech" 
                  onClick={() => handleRemoveTechnology(tech)}
                >
                  ×
                </span>
              </div>
            ))}
          </div>
          <div className="tech-input-container">
            <input
              type="text"
              value={newTechnology}
              onChange={(e) => setNewTechnology(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Add a technology..."
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

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="link">Project Link</label>
              <input
                type="url"
                id="link"
                name="link"
                value={newProject.link}
                onChange={handleInputChange}
                placeholder="e.g., https://myproject.com"
              />
            </div>
          </div>
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="github">GitHub Repository</label>
              <input
                type="url"
                id="github"
                name="github"
                value={newProject.github}
                onChange={handleInputChange}
                placeholder="e.g., https://github.com/username/project"
              />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-col">
            <div className="form-group">
              <label htmlFor="startDate">Start Date</label>
              <input
                type="month"
                id="startDate"
                name="startDate"
                value={newProject.startDate}
                onChange={handleInputChange}
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
                value={newProject.endDate}
                onChange={handleInputChange}
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
                setNewProject({
                  title: '',
                  description: '',
                  technologies: [],
                  link: '',
                  github: '',
                  startDate: '',
                  endDate: ''
                });
              }}
            >
              Cancel
            </button>
          )}
          <button 
            type="button" 
            className="btn btn-primary"
            onClick={handleAddProject}
            disabled={!newProject.title || !newProject.description}
          >
            {editIndex >= 0 ? 'Update Project' : 'Add Project'}
          </button>
        </div>
      </div>

      <div className="form-tips">
        <h4>Tips for Projects Section:</h4>
        <ul>
          <li>Include projects that showcase relevant skills for the job</li>
          <li>Describe your role and contributions if it was a team project</li>
          <li>Highlight the technologies and tools you used</li>
          <li>Include links to live demos or GitHub repositories when possible</li>
          <li>Quantify the impact or results of your projects when applicable</li>
        </ul>
      </div>
    </div>
  );
}

export default ProjectsForm;
