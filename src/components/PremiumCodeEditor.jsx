import React, { useState, useEffect, useRef } from 'react';
import './PremiumCodeEditor.css';

const PremiumCodeEditor = ({
  code = '',
  language = 'javascript',
  theme = 'dark',
  animate = true,
  typingSpeed = 30,
  highlightLines = [],
  showLineNumbers = true,
  editable = false,
  onChange = () => {},
  className = '',
  ...props
}) => {
  const [displayedCode, setDisplayedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [isTyping, setIsTyping] = useState(animate);
  const [activeHighlight, setActiveHighlight] = useState(null);
  const editorRef = useRef(null);
  const codeLines = code.split('\n');
  
  // Editor classes
  const editorClasses = [
    'premium-code-editor',
    `premium-code-editor-${theme}`,
    `premium-code-editor-${language}`,
    editable ? 'premium-code-editor-editable' : '',
    className
  ].filter(Boolean).join(' ');
  
  // Typing animation effect
  useEffect(() => {
    if (!isTyping) {
      setDisplayedCode(code);
      return;
    }
    
    const typingInterval = setInterval(() => {
      if (currentLine < codeLines.length) {
        const currentLineText = codeLines[currentLine];
        
        if (currentChar < currentLineText.length) {
          // Type next character
          setDisplayedCode(prev => 
            prev + (currentChar === 0 && currentLine > 0 ? '\n' : '') + currentLineText[currentChar]
          );
          setCurrentChar(prev => prev + 1);
        } else {
          // Move to next line
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }
      } else {
        // Typing complete
        clearInterval(typingInterval);
        setIsTyping(false);
        
        // Start line highlighting if specified
        if (highlightLines.length > 0) {
          startLineHighlighting();
        }
      }
    }, typingSpeed);
    
    return () => clearInterval(typingInterval);
  }, [isTyping, currentLine, currentChar, codeLines, code, typingSpeed, highlightLines]);
  
  // Line highlighting effect
  const startLineHighlighting = () => {
    let highlightIndex = 0;
    
    const highlightInterval = setInterval(() => {
      if (highlightIndex < highlightLines.length) {
        setActiveHighlight(highlightLines[highlightIndex]);
        highlightIndex++;
      } else {
        clearInterval(highlightInterval);
        setActiveHighlight(null);
      }
    }, 1000);
    
    return () => clearInterval(highlightInterval);
  };
  
  // Syntax highlighting function
  const highlightSyntax = (code) => {
    if (!code) return [];
    
    const lines = code.split('\n');
    
    return lines.map((line, lineIndex) => {
      // Apply different classes based on content
      const isComment = line.trim().startsWith('//') || line.trim().startsWith('/*');
      const hasKeyword = /(function|let|const|var|for|if|else|return|class|import|export|from|async|await)/g.test(line);
      const hasString = /(['"])(?:(?=(\\?))\2.)*?\1/g.test(line);
      const hasNumber = /\b\d+\b/g.test(line);
      
      // Format the line with syntax highlighting
      let formattedLine = line;
      
      // Replace keywords
      if (hasKeyword) {
        formattedLine = formattedLine.replace(
          /(function|let|const|var|for|if|else|return|class|import|export|from|async|await|new|this|try|catch|throw)/g,
          '<span class="code-keyword">$1</span>'
        );
      }
      
      // Replace strings
      if (hasString) {
        formattedLine = formattedLine.replace(
          /(['"])(?:(?=(\\?))\2.)*?\1/g,
          '<span class="code-string">$&</span>'
        );
      }
      
      // Replace numbers
      if (hasNumber) {
        formattedLine = formattedLine.replace(
          /\b(\d+)\b/g,
          '<span class="code-number">$1</span>'
        );
      }
      
      // Replace comments
      if (isComment) {
        formattedLine = `<span class="code-comment">${line}</span>`;
      } else {
        // Replace operators and punctuation
        formattedLine = formattedLine.replace(
          /([=+\-*/<>!&|{}[\]();:,.])/g,
          '<span class="code-operator">$1</span>'
        );
      }
      
      // Determine if this line should be highlighted
      const isHighlighted = activeHighlight === lineIndex + 1;
      
      return (
        <div 
          key={lineIndex} 
          className={`code-line ${isHighlighted ? 'code-line-highlighted' : ''}`}
        >
          {showLineNumbers && (
            <span className="code-line-number">{lineIndex + 1}</span>
          )}
          <span 
            className="code-line-content"
            dangerouslySetInnerHTML={{ __html: formattedLine || '&nbsp;' }}
          />
        </div>
      );
    });
  };
  
  // Handle editable code changes
  const handleCodeChange = (e) => {
    if (editable) {
      const newCode = e.target.innerText;
      onChange(newCode);
    }
  };
  
  return (
    <div className={editorClasses} {...props}>
      <div className="premium-code-editor-header">
        <div className="premium-code-editor-controls">
          <span className="premium-code-editor-control premium-code-editor-control-close"></span>
          <span className="premium-code-editor-control premium-code-editor-control-minimize"></span>
          <span className="premium-code-editor-control premium-code-editor-control-maximize"></span>
        </div>
        <div className="premium-code-editor-title">
          {language === 'javascript' && 'script.js'}
          {language === 'html' && 'index.html'}
          {language === 'css' && 'styles.css'}
          {language === 'python' && 'main.py'}
          {language === 'java' && 'Main.java'}
        </div>
      </div>
      
      <div 
        ref={editorRef}
        className="premium-code-editor-content"
        contentEditable={editable}
        suppressContentEditableWarning={true}
        onInput={handleCodeChange}
      >
        {highlightSyntax(displayedCode)}
        {isTyping && <span className="code-cursor">|</span>}
      </div>
    </div>
  );
};

export default PremiumCodeEditor;
