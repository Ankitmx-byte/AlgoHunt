/**
 * Code Compiler Service for Coding Battles
 * 
 * This service provides functionality to compile and execute code in various languages.
 * It supports JavaScript, Python, Java, and C++ with appropriate sandboxing.
 */

class CodeCompilerService {
  constructor() {
    this.supportedLanguages = ['javascript', 'python', 'java', 'cpp'];
    this.compileTimeouts = {
      javascript: 5000, // 5 seconds
      python: 5000,
      java: 10000,
      cpp: 8000
    };
    this.executionTimeouts = {
      javascript: 3000, // 3 seconds per test case
      python: 3000,
      java: 5000,
      cpp: 3000
    };
    this.memoryLimits = {
      javascript: 128, // MB
      python: 128,
      java: 256,
      cpp: 128
    };
    this.isCompiling = false;
    this.isExecuting = false;
    this.lastCompileResult = null;
    this.lastExecutionResults = [];
  }

  /**
   * Check if a language is supported
   * @param {string} language - The programming language
   * @returns {boolean} - Whether the language is supported
   */
  isLanguageSupported(language) {
    return this.supportedLanguages.includes(language.toLowerCase());
  }

  /**
   * Compile code in the specified language
   * @param {string} code - The source code to compile
   * @param {string} language - The programming language
   * @returns {Promise<Object>} - Compilation result
   */
  async compileCode(code, language) {
    if (!this.isLanguageSupported(language)) {
      return {
        success: false,
        error: `Language '${language}' is not supported. Supported languages are: ${this.supportedLanguages.join(', ')}`
      };
    }

    if (this.isCompiling) {
      return {
        success: false,
        error: 'Another compilation is already in progress'
      };
    }

    this.isCompiling = true;
    
    try {
      // In a real implementation, this would send the code to a backend service
      // For this demo, we'll simulate compilation for different languages
      
      const result = await this.simulateCompilation(code, language);
      this.lastCompileResult = result;
      return result;
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An unknown error occurred during compilation'
      };
    } finally {
      this.isCompiling = false;
    }
  }

  /**
   * Execute code with the given test cases
   * @param {string} code - The source code to execute
   * @param {string} language - The programming language
   * @param {Array<Object>} testCases - The test cases to run
   * @returns {Promise<Object>} - Execution results
   */
  async executeCode(code, language, testCases) {
    if (!this.isLanguageSupported(language)) {
      return {
        success: false,
        error: `Language '${language}' is not supported. Supported languages are: ${this.supportedLanguages.join(', ')}`
      };
    }

    if (this.isExecuting) {
      return {
        success: false,
        error: 'Another execution is already in progress'
      };
    }

    this.isExecuting = true;
    
    try {
      // First compile the code if needed
      if (language === 'java' || language === 'cpp') {
        const compileResult = await this.compileCode(code, language);
        if (!compileResult.success) {
          return compileResult;
        }
      }
      
      // Execute the code with each test case
      const results = [];
      let allPassed = true;
      
      for (const testCase of testCases) {
        const result = await this.simulateExecution(code, language, testCase);
        results.push(result);
        
        if (!result.passed) {
          allPassed = false;
        }
      }
      
      this.lastExecutionResults = results;
      
      return {
        success: true,
        results,
        allPassed
      };
    } catch (error) {
      return {
        success: false,
        error: error.message || 'An unknown error occurred during execution'
      };
    } finally {
      this.isExecuting = false;
    }
  }

  /**
   * Simulate code compilation
   * @param {string} code - The source code to compile
   * @param {string} language - The programming language
   * @returns {Promise<Object>} - Compilation result
   */
  async simulateCompilation(code, language) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check for common compilation errors based on language
        switch (language.toLowerCase()) {
          case 'javascript':
            try {
              // Try to parse the JavaScript code
              new Function(code);
              resolve({ success: true });
            } catch (error) {
              resolve({
                success: false,
                error: `JavaScript syntax error: ${error.message}`
              });
            }
            break;
            
          case 'python':
            // Simple Python syntax checks
            if (code.includes('print ') && !code.includes('print(')) {
              resolve({
                success: false,
                error: "Python syntax error: 'print' statement requires parentheses in Python 3"
              });
            } else {
              resolve({ success: true });
            }
            break;
            
          case 'java':
            // Check for common Java errors
            if (!code.includes('public class') && !code.includes('class ')) {
              resolve({
                success: false,
                error: "Java compilation error: No class definition found"
              });
            } else if (!code.includes('public static void main')) {
              resolve({
                success: false,
                error: "Java compilation error: Missing 'public static void main' method"
              });
            } else {
              resolve({ success: true });
            }
            break;
            
          case 'cpp':
            // Check for common C++ errors
            if (!code.includes('int main')) {
              resolve({
                success: false,
                error: "C++ compilation error: Missing 'main' function"
              });
            } else if (code.includes('cout') && !code.includes('iostream')) {
              resolve({
                success: false,
                error: "C++ compilation error: Using 'cout' without including <iostream>"
              });
            } else {
              resolve({ success: true });
            }
            break;
            
          default:
            resolve({ success: true });
        }
      }, 500); // Simulate compilation delay
    });
  }

  /**
   * Simulate code execution with a test case
   * @param {string} code - The source code to execute
   * @param {string} language - The programming language
   * @param {Object} testCase - The test case to run
   * @returns {Promise<Object>} - Execution result
   */
  async simulateExecution(code, language, testCase) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // For JavaScript, we can actually execute the code in a sandboxed environment
        if (language.toLowerCase() === 'javascript') {
          try {
            // Create a sandboxed function from the code
            const userFunction = this.createSandboxedFunction(code);
            
            // Parse the input
            const input = this.parseInput(testCase.input);
            
            // Execute the function with the input
            const output = userFunction(...input);
            
            // Compare with expected output
            const expectedOutput = this.parseOutput(testCase.expectedOutput);
            const passed = this.compareOutputs(output, expectedOutput);
            
            resolve({
              id: testCase.id,
              input: testCase.input,
              expectedOutput: testCase.expectedOutput,
              actualOutput: JSON.stringify(output),
              passed,
              error: null
            });
          } catch (error) {
            resolve({
              id: testCase.id,
              input: testCase.input,
              expectedOutput: testCase.expectedOutput,
              actualOutput: null,
              passed: false,
              error: `Runtime error: ${error.message}`
            });
          }
        } else {
          // For other languages, simulate execution
          // In a real implementation, this would send the code to a backend service
          
          // Simulate a 70% chance of passing each test
          const passed = Math.random() > 0.3;
          
          resolve({
            id: testCase.id,
            input: testCase.input,
            expectedOutput: testCase.expectedOutput,
            actualOutput: passed ? testCase.expectedOutput : "Incorrect output",
            passed,
            error: passed ? null : "Output does not match expected result"
          });
        }
      }, 1000); // Simulate execution delay
    });
  }

  /**
   * Create a sandboxed function from JavaScript code
   * @param {string} code - The JavaScript code
   * @returns {Function} - The sandboxed function
   */
  createSandboxedFunction(code) {
    // Extract the function body from the code
    // This is a simplified approach and would need more robust parsing in a real implementation
    let functionBody = code;
    
    // If the code contains a function declaration, extract just the body
    if (code.includes('function')) {
      const functionMatch = code.match(/function\s+\w*\s*\(([^)]*)\)\s*{([\s\S]*)}/);
      if (functionMatch) {
        functionBody = functionMatch[2];
      }
    }
    
    // Create a new function with the extracted body
    return new Function('return function solution() { ' + functionBody + ' }')();
  }

  /**
   * Parse input string into JavaScript values
   * @param {string} input - The input string
   * @returns {Array} - The parsed input values
   */
  parseInput(input) {
    try {
      // Handle array inputs
      if (input.trim().startsWith('[')) {
        return [JSON.parse(input)];
      }
      
      // Handle multiple comma-separated values
      return input.split(',').map(item => {
        try {
          return JSON.parse(item.trim());
        } catch (e) {
          return item.trim();
        }
      });
    } catch (error) {
      return [input];
    }
  }

  /**
   * Parse expected output string into JavaScript value
   * @param {string} output - The expected output string
   * @returns {*} - The parsed output value
   */
  parseOutput(output) {
    try {
      return JSON.parse(output);
    } catch (error) {
      return output;
    }
  }

  /**
   * Compare actual output with expected output
   * @param {*} actual - The actual output
   * @param {*} expected - The expected output
   * @returns {boolean} - Whether the outputs match
   */
  compareOutputs(actual, expected) {
    // Handle arrays
    if (Array.isArray(actual) && Array.isArray(expected)) {
      if (actual.length !== expected.length) return false;
      return actual.every((val, index) => this.compareOutputs(val, expected[index]));
    }
    
    // Handle objects
    if (typeof actual === 'object' && actual !== null && 
        typeof expected === 'object' && expected !== null) {
      const actualKeys = Object.keys(actual);
      const expectedKeys = Object.keys(expected);
      
      if (actualKeys.length !== expectedKeys.length) return false;
      
      return actualKeys.every(key => 
        expectedKeys.includes(key) && this.compareOutputs(actual[key], expected[key])
      );
    }
    
    // Handle primitive values
    return actual === expected;
  }
}

// Create a singleton instance
const codeCompilerService = new CodeCompilerService();

export default codeCompilerService;
