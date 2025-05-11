import React, { useEffect, useRef } from 'react';
import './CodeAnimation.css';

const CodeAnimation = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // Set canvas dimensions to match parent container
    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.offsetWidth;
      canvas.height = container.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Matrix-like code rain effect
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);

    // Code snippets to display (more realistic coding)
    const codeSnippets = [
      'function quickSort(arr) {',
      '  if (arr.length <= 1) return arr;',
      '  const pivot = arr[0];',
      '  const left = [], right = [];',
      '  for (let i = 1; i < arr.length; i++) {',
      '    if (arr[i] < pivot) left.push(arr[i]);',
      '    else right.push(arr[i]);',
      '  }',
      '  return [...quickSort(left), pivot, ...quickSort(right)];',
      '}',
      'class Node {',
      '  constructor(val) {',
      '    this.val = val;',
      '    this.left = null;',
      '    this.right = null;',
      '  }',
      '}',
      'const binarySearch = (arr, target) => {',
      '  let left = 0, right = arr.length - 1;',
      '  while (left <= right) {',
      '    const mid = Math.floor((left + right) / 2);',
      '    if (arr[mid] === target) return mid;',
      '    if (arr[mid] < target) left = mid + 1;',
      '    else right = mid - 1;',
      '  }',
      '  return -1;',
      '}',
      'const mergeSort = (arr) => {',
      '  if (arr.length <= 1) return arr;',
      '  const mid = Math.floor(arr.length / 2);',
      '  const left = mergeSort(arr.slice(0, mid));',
      '  const right = mergeSort(arr.slice(mid));',
      '  return merge(left, right);',
      '}'
    ];

    // Characters for random code-like effect
    const chars = '{}[]()<>+-*/=;:,.?|&^%$#@!~`"\'\\ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    // Array to track the y position of each column
    const drops = [];
    const snippetIndices = [];
    const useSnippet = [];

    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * -100;
      snippetIndices[i] = Math.floor(Math.random() * codeSnippets.length);
      useSnippet[i] = Math.random() > 0.7; // 30% chance to use a code snippet
    }

    // Function to draw the animation
    const draw = () => {
      // Semi-transparent black background to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Loop through each column
      for (let i = 0; i < drops.length; i++) {
        // Determine text color based on position (gradient effect)
        const hue = (i / columns) * 120 + 120; // From green (120) to blue (240)
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.font = `${fontSize}px monospace`;

        let text;
        if (useSnippet[i]) {
          // Use a character from the code snippet
          const snippetIndex = snippetIndices[i];
          const snippet = codeSnippets[snippetIndex];
          const charPosition = Math.floor(drops[i]) % snippet.length;
          text = snippet[charPosition >= 0 && charPosition < snippet.length ? charPosition : 0];
        } else {
          // Generate a random character
          text = chars[Math.floor(Math.random() * chars.length)];
        }

        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Move the drop down
        drops[i] += 0.5;

        // Reset drop to top with random delay when it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
          // Occasionally change whether this column uses a snippet
          if (Math.random() > 0.9) {
            useSnippet[i] = Math.random() > 0.7;
            snippetIndices[i] = Math.floor(Math.random() * codeSnippets.length);
          }
        }
      }
    };

    // Run the animation
    const interval = setInterval(draw, 50);

    // Clean up
    return () => {
      clearInterval(interval);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <canvas ref={canvasRef} className="code-animation-canvas"></canvas>;
};

export default CodeAnimation;
