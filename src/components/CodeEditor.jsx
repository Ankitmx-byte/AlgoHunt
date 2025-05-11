import React, { useState, useEffect } from 'react';
import './CodeEditor.css';

/**
 * CodeEditor Component
 *
 * This component provides a code editor with syntax highlighting and other features.
 * Due to issues with Monaco Editor, we're using a simple textarea for now.
 */
const CodeEditor = ({
  code,
  language = 'javascript',
  onChange,
  readOnly = false,
  theme = 'vs-dark'
}) => {
  const [value, setValue] = useState(code);

  // Update internal value when code prop changes
  useEffect(() => {
    setValue(code);
  }, [code]);

  // Handle textarea changes
  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  // Add syntax highlighting class based on language
  const getLanguageClass = () => {
    return `language-${language.toLowerCase()}`;
  };

  // Render a simple textarea with some styling
  return (
    <div className={`code-editor-container ${theme}`}>
      <textarea
        className={`code-editor-textarea ${getLanguageClass()}`}
        value={value}
        onChange={handleChange}
        readOnly={readOnly}
        spellCheck="false"
        placeholder="Write your code here..."
      />
    </div>
  );
};

export default CodeEditor;
