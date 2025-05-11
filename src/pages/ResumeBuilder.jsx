import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeBuilder.css';

// Import components
import ResumeHeader from '../components/resume/ResumeHeader';
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import SummaryForm from '../components/resume/SummaryForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import EducationForm from '../components/resume/EducationForm';
import SkillsForm from '../components/resume/SkillsForm';
import ProjectsForm from '../components/resume/ProjectsForm';
import CertificationsForm from '../components/resume/CertificationsForm';
import TemplateSelector from '../components/resume/TemplateSelector';
import ATSAnalyzer from '../components/resume/ATSAnalyzer';
import ResumePreview from '../components/resume/ResumePreview';

function ResumeBuilder() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('personal');
  const [resumeData, setResumeData] = useState({
    title: 'My Professional Resume',
    personalInfo: {
      fullName: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      linkedin: '',
      github: ''
    },
    summary: '',
    skills: [],
    experience: [],
    education: [],
    projects: [],
    certifications: [],
    template: 'Professional'
  });
  const [atsScore, setAtsScore] = useState(0);
  const [atsAnalysis, setAtsAnalysis] = useState(null);
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    if (!isLoggedIn) {
      navigate('/login');
    }
  }, [navigate]);

  // Handle form data changes
  const handleDataChange = (section, data) => {
    setResumeData(prev => ({
      ...prev,
      [section]: data
    }));
    setSaved(false);
  };

  // Save resume
  const saveResume = async () => {
    setLoading(true);
    try {
      // In a real implementation, this would call your API
      // For now, we'll just simulate saving
      setTimeout(() => {
        localStorage.setItem('savedResume', JSON.stringify(resumeData));
        setSaved(true);
        setLoading(false);
      }, 1000);
    } catch (error) {
      console.error('Error saving resume:', error);
      setLoading(false);
    }
  };

  // Analyze resume with ATS
  const analyzeResume = async () => {
    if (!jobDescription) {
      alert('Please enter a job description for ATS analysis');
      return;
    }

    setLoading(true);
    try {
      // In a real implementation, this would call your API
      // For now, we'll simulate ATS analysis
      setTimeout(() => {
        // Mock ATS analysis
        const mockAnalysis = {
          keywords: [
            { keyword: 'JavaScript', found: true },
            { keyword: 'React', found: resumeData.skills.includes('React') },
            { keyword: 'Node.js', found: resumeData.skills.includes('Node.js') },
            { keyword: 'MongoDB', found: resumeData.skills.includes('MongoDB') },
            { keyword: 'AWS', found: resumeData.skills.includes('AWS') }
          ],
          suggestions: [
            'Add more quantifiable achievements to your experience section',
            'Include MongoDB in your skills section',
            'Mention AWS experience if you have any'
          ],
          missingKeywords: ['MongoDB', 'AWS', 'CI/CD', 'Docker'].filter(
            kw => !resumeData.skills.includes(kw)
          ),
          formatIssues: [
            'Consider using bullet points for better readability',
            'Ensure consistent date formatting throughout the resume'
          ]
        };

        // Calculate ATS score based on keyword matches and other factors
        const keywordMatchPercentage = 
          (mockAnalysis.keywords.filter(k => k.found).length / mockAnalysis.keywords.length) * 100;
        
        // Simple scoring algorithm (in a real app, this would be more sophisticated)
        const score = Math.round(keywordMatchPercentage);

        setAtsScore(score);
        setAtsAnalysis(mockAnalysis);
        setLoading(false);
      }, 1500);
    } catch (error) {
      console.error('Error analyzing resume:', error);
      setLoading(false);
    }
  };

  // Generate PDF
  const generatePDF = () => {
    alert('PDF generation would happen here in a real implementation');
  };

  // Toggle preview mode
  const togglePreviewMode = () => {
    setPreviewMode(!previewMode);
  };

  // Render active tab content
  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <PersonalInfoForm 
            data={resumeData.personalInfo} 
            onChange={(data) => handleDataChange('personalInfo', data)} 
          />
        );
      case 'summary':
        return (
          <SummaryForm 
            data={resumeData.summary} 
            onChange={(data) => handleDataChange('summary', data)} 
          />
        );
      case 'experience':
        return (
          <ExperienceForm 
            data={resumeData.experience} 
            onChange={(data) => handleDataChange('experience', data)} 
          />
        );
      case 'education':
        return (
          <EducationForm 
            data={resumeData.education} 
            onChange={(data) => handleDataChange('education', data)} 
          />
        );
      case 'skills':
        return (
          <SkillsForm 
            data={resumeData.skills} 
            onChange={(data) => handleDataChange('skills', data)} 
          />
        );
      case 'projects':
        return (
          <ProjectsForm 
            data={resumeData.projects} 
            onChange={(data) => handleDataChange('projects', data)} 
          />
        );
      case 'certifications':
        return (
          <CertificationsForm 
            data={resumeData.certifications} 
            onChange={(data) => handleDataChange('certifications', data)} 
          />
        );
      case 'template':
        return (
          <TemplateSelector 
            selected={resumeData.template} 
            onChange={(template) => handleDataChange('template', template)} 
          />
        );
      case 'ats':
        return (
          <ATSAnalyzer 
            jobDescription={jobDescription}
            setJobDescription={setJobDescription}
            atsScore={atsScore}
            atsAnalysis={atsAnalysis}
            onAnalyze={analyzeResume}
            loading={loading}
          />
        );
      default:
        return <PersonalInfoForm data={resumeData.personalInfo} onChange={(data) => handleDataChange('personalInfo', data)} />;
    }
  };

  return (
    <div className="resume-builder-container">
      <ResumeHeader 
        title={resumeData.title}
        onTitleChange={(title) => handleDataChange('title', title)}
        onSave={saveResume}
        onGeneratePDF={generatePDF}
        onTogglePreview={togglePreviewMode}
        saved={saved}
        loading={loading}
      />

      <div className="resume-builder-content">
        {previewMode ? (
          <ResumePreview resumeData={resumeData} />
        ) : (
          <>
            <div className="resume-tabs">
              <button 
                className={activeTab === 'personal' ? 'active' : ''} 
                onClick={() => setActiveTab('personal')}
              >
                Personal Info
              </button>
              <button 
                className={activeTab === 'summary' ? 'active' : ''} 
                onClick={() => setActiveTab('summary')}
              >
                Summary
              </button>
              <button 
                className={activeTab === 'experience' ? 'active' : ''} 
                onClick={() => setActiveTab('experience')}
              >
                Experience
              </button>
              <button 
                className={activeTab === 'education' ? 'active' : ''} 
                onClick={() => setActiveTab('education')}
              >
                Education
              </button>
              <button 
                className={activeTab === 'skills' ? 'active' : ''} 
                onClick={() => setActiveTab('skills')}
              >
                Skills
              </button>
              <button 
                className={activeTab === 'projects' ? 'active' : ''} 
                onClick={() => setActiveTab('projects')}
              >
                Projects
              </button>
              <button 
                className={activeTab === 'certifications' ? 'active' : ''} 
                onClick={() => setActiveTab('certifications')}
              >
                Certifications
              </button>
              <button 
                className={activeTab === 'template' ? 'active' : ''} 
                onClick={() => setActiveTab('template')}
              >
                Template
              </button>
              <button 
                className={activeTab === 'ats' ? 'active' : ''} 
                onClick={() => setActiveTab('ats')}
              >
                ATS Analysis
              </button>
            </div>

            <div className="resume-form-container">
              {renderTabContent()}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ResumeBuilder;
