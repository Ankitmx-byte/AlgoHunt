import React, { useState, useEffect } from 'react';
import './CodeAnimationEffect.css';

const CodeAnimationEffect = () => {
  const [typedCode, setTypedCode] = useState('');
  const [currentLine, setCurrentLine] = useState(0);
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);
  const [highlightLine, setHighlightLine] = useState(null);
  
  // Sample code to animate
  const codeLines = [
    'function findOptimalSolution(array) {',
    '  // Initialize variables',
    '  let result = [];',
    '  let current = 0;',
    '  let best = -Infinity;',
    '',
    '  // Iterate through the array',
    '  for (let i = 0; i < array.length; i++) {',
    '    // Update current sum',
    '    current = Math.max(array[i], current + array[i]);',
    '    ',
    '    // Update best result if needed',
    '    best = Math.max(best, current);',
    '    ',
    '    // Add to result if it improves solution',
    '    if (current > 0) {',
    '      result.push(array[i]);',
    '    }',
    '  }',
    '',
    '  // Return the optimal solution',
    '  return { result, maxSum: best };',
    '}'
  ];
  
  // Typing effect
  useEffect(() => {
    if (!isTyping) return;
    
    const typingInterval = setInterval(() => {
      if (currentLine < codeLines.length) {
        setTypedCode(prev => prev + codeLines[currentLine] + '\n');
        setCurrentLine(prev => prev + 1);
      } else {
        setIsTyping(false);
        // Start highlighting lines after typing is complete
        setTimeout(() => {
          runCodeExecution();
        }, 1000);
      }
    }, 150); // Adjust typing speed here
    
    return () => clearInterval(typingInterval);
  }, [currentLine, isTyping]);
  
  // Cursor blinking effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    
    return () => clearInterval(cursorInterval);
  }, []);
  
  // Simulate code execution with line highlighting
  const runCodeExecution = () => {
    const executionSequence = [7, 8, 9, 12, 15, 16, 7, 8, 9, 12, 15, 16, 20];
    let step = 0;
    
    const executionInterval = setInterval(() => {
      if (step < executionSequence.length) {
        setHighlightLine(executionSequence[step]);
        step++;
      } else {
        setHighlightLine(null);
        clearInterval(executionInterval);
        
        // Restart the animation after a pause
        setTimeout(() => {
          setTypedCode('');
          setCurrentLine(0);
          setIsTyping(true);
        }, 3000);
      }
    }, 600);
  };
  
  // Format the code with syntax highlighting
  const formatCode = () => {
    if (!typedCode) return null;
    
    return typedCode.split('\n').map((line, index) => {
      // Apply different classes based on content
      const isComment = line.trim().startsWith('//');
      const hasKeyword = /(function|let|const|for|if|return)/g.test(line);
      const hasString = /"([^"\\]|\\.)*"/g.test(line);
      const hasNumber = /\d+/g.test(line);
      
      // Determine if this line should be highlighted
      const isHighlighted = index === highlightLine;
      
      // Apply line-specific classes
      const lineClass = `code-line ${isHighlighted ? 'highlight' : ''} ${isComment ? 'comment' : ''}`;
      
      // Format the line with syntax highlighting
      let formattedLine = line;
      
      if (hasKeyword) {
        formattedLine = formattedLine.replace(
          /(function|let|const|for|if|return|Math)/g, 
          '<span class="keyword">$1</span>'
        );
      }
      
      if (hasString) {
        formattedLine = formattedLine.replace(
          /"([^"\\]|\\.)*"/g,
          '<span class="string">$&</span>'
        );
      }
      
      if (hasNumber) {
        formattedLine = formattedLine.replace(
          /\b(\d+)\b/g,
          '<span class="number">$1</span>'
        );
      }
      
      // Highlight operators
      formattedLine = formattedLine.replace(
        /([=+\-*/<>!&|{}[\]();:,.])/g,
        '<span class="operator">$1</span>'
      );
      
      return (
        <div key={index} className={lineClass}>
          <span className="line-number">{index + 1}</span>
          <span dangerouslySetInnerHTML={{ __html: formattedLine || '&nbsp;' }} />
        </div>
      );
    });
  };
  
  return (
    <div className="code-animation-container">
      <div className="code-header">
        <div className="code-title">algorithm.js</div>
        <div className="code-controls">
          <span className="control close"></span>
          <span className="control minimize"></span>
          <span className="control maximize"></span>
        </div>
      </div>
      <div className="code-editor">
        <div className="code-content">
          {formatCode()}
          {isTyping && showCursor && <span className="code-cursor">|</span>}
        </div>
      </div>
    </div>
  );
};

export default CodeAnimationEffect;
