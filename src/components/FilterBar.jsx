import React from 'react';
import './FilterBar.css';

function FilterBar({ filters, setFilters }) {
  const handleFilterChange = (filterType, value) => {
    setFilters({
      ...filters,
      [filterType]: value
    });
  };

  return (
    <div className="filter-bar">
      <div className="filter-dropdown">
        <label>Role</label>
        <select 
          value={filters.role} 
          onChange={(e) => handleFilterChange('role', e.target.value)}
        >
          <option value="">All Roles</option>
          <option value="frontend">Frontend</option>
          <option value="backend">Backend</option>
          <option value="fullstack">Full Stack</option>
          <option value="data">Data Science</option>
        </select>
      </div>
      
      <div className="filter-dropdown">
        <label>Experience</label>
        <select 
          value={filters.experience} 
          onChange={(e) => handleFilterChange('experience', e.target.value)}
        >
          <option value="">All Levels</option>
          <option value="entry">Entry Level</option>
          <option value="mid">Mid Level</option>
          <option value="senior">Senior Level</option>
        </select>
      </div>
      
      <div className="filter-dropdown">
        <label>Location</label>
        <select 
          value={filters.location} 
          onChange={(e) => handleFilterChange('location', e.target.value)}
        >
          <option value="">All Locations</option>
          <option value="remote">Remote</option>
          <option value="us">United States</option>
          <option value="india">India</option>
        </select>
      </div>
      
      <div className="filter-dropdown">
        <label>Company</label>
        <select 
          value={filters.company} 
          onChange={(e) => handleFilterChange('company', e.target.value)}
        >
          <option value="">All Companies</option>
          <option value="startups">Startups</option>
          <option value="enterprise">Enterprise</option>
        </select>
      </div>
    </div>
  );
}

export default FilterBar;