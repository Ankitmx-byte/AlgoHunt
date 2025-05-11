// JavaScript module content data
// Based on open source resources like MDN Web Docs and JavaScript.info

export const getJavaScriptModuleContent = (moduleId) => {
  const moduleContent = {
    // JavaScript Introduction & Setup
    "js-mod-1": {
      id: "js-mod-1",
      title: "JavaScript Introduction & Setup",
      content: [
        {
          type: "video",
          title: "JavaScript Crash Course For Beginners",
          description: "Learn JavaScript fundamentals in this crash course for beginners. This tutorial will teach you the basics of JavaScript including variables, functions, objects, arrays, and more.",
          source: "Traversy Media",
          url: "https://www.youtube.com/embed/hdI2bqOjy3c",
          duration: "1 hour 40 minutes",
          thumbnail: "https://img.youtube.com/vi/hdI2bqOjy3c/maxresdefault.jpg"
        },
        {
          type: "text",
          title: "What is JavaScript?",
          body: `
            <p>JavaScript is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB, and Adobe Acrobat.</p>

            <p>JavaScript is a prototype-based, multi-paradigm, single-threaded, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.</p>

            <h4>JavaScript's Role in Web Development</h4>
            <p>JavaScript is one of the core technologies of the World Wide Web, alongside HTML and CSS. It enables interactive web pages and is an essential part of web applications. The vast majority of websites use it for client-side page behavior, and all major web browsers have a dedicated JavaScript engine to execute it.</p>

            <h4>A Brief History</h4>
            <p>JavaScript was created in 1995 by Brendan Eich while he was an engineer at Netscape. It was originally developed under the name Mocha, then renamed to LiveScript, and finally to JavaScript when Netscape and Sun Microsystems (now Oracle) did a license agreement.</p>

            <p>The language has evolved significantly since its creation, with the latest major revision being ECMAScript 2021 (ES12).</p>
          `
        },
        {
          type: "text",
          title: "Setting Up Your Development Environment",
          body: `
            <p>To start coding in JavaScript, you need very little setup. Here's what you'll need:</p>

            <h4>Text Editor or IDE</h4>
            <p>You'll need a place to write your code. While you can use a simple text editor, a code editor or IDE (Integrated Development Environment) will make your life much easier with features like syntax highlighting, code completion, and debugging tools.</p>

            <p>Popular options include:</p>
            <ul>
              <li><strong>Visual Studio Code</strong> - Free, open-source, and highly customizable with extensions</li>
              <li><strong>Sublime Text</strong> - Lightweight and fast with a clean interface</li>
              <li><strong>WebStorm</strong> - Full-featured IDE specifically for JavaScript development</li>
              <li><strong>Atom</strong> - Free, open-source editor that's highly customizable</li>
            </ul>

            <h4>Web Browser</h4>
            <p>You'll need a modern web browser to run your JavaScript code. Any of these will work well:</p>
            <ul>
              <li>Google Chrome</li>
              <li>Mozilla Firefox</li>
              <li>Microsoft Edge</li>
              <li>Safari</li>
            </ul>

            <p>All modern browsers come with developer tools that include a JavaScript console, which is essential for debugging and testing your code.</p>

            <h4>Optional: Node.js</h4>
            <p>If you want to run JavaScript outside of a browser (for server-side development or as a scripting language), you'll need Node.js. It's a JavaScript runtime built on Chrome's V8 JavaScript engine.</p>

            <p>You can download it from <a href="https://nodejs.org/" target="_blank">nodejs.org</a>.</p>
          `
        },
        {
          type: "text",
          title: "Using the Browser Console",
          body: `
            <p>The browser console is a powerful tool for JavaScript developers. It allows you to:</p>
            <ul>
              <li>Run JavaScript code directly</li>
              <li>See output from your code</li>
              <li>Debug issues in your web applications</li>
              <li>Inspect network requests, HTML elements, and more</li>
            </ul>

            <h4>Opening the Console</h4>
            <p>To open the developer console in your browser:</p>
            <ul>
              <li><strong>Chrome/Edge:</strong> Press F12 or Ctrl+Shift+J (Windows/Linux) or Cmd+Option+J (Mac)</li>
              <li><strong>Firefox:</strong> Press F12 or Ctrl+Shift+K (Windows/Linux) or Cmd+Option+K (Mac)</li>
              <li><strong>Safari:</strong> Press Cmd+Option+C</li>
            </ul>

            <h4>Using the Console</h4>
            <p>Once the console is open, you can type JavaScript commands directly and press Enter to execute them. For example:</p>

            <pre><code>console.log("Hello, World!");</code></pre>

            <p>This will output "Hello, World!" to the console.</p>

            <p>You can also use the console to experiment with JavaScript features, test code snippets, and debug your applications.</p>
          `
        },
        {
          type: "exercise",
          title: "Your First JavaScript Program",
          description: "Let's write your first JavaScript program - the classic 'Hello, World!' example.",
          instructions: [
            "Create a new HTML file with a basic structure",
            "Add a script tag to include JavaScript",
            "Write code to display 'Hello, World!' in an alert box",
            "Open the file in your browser to see the result"
          ],
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <title>My First JavaScript Program</title>
</head>
<body>
  <h1>Hello from HTML!</h1>

  <script>
    // Your JavaScript code here

  </script>
</body>
</html>`
        },
        {
          type: "quiz",
          title: "JavaScript Introduction Quiz",
          description: "Test your understanding of JavaScript basics with this quiz.",
          questions: [
            {
              id: "q1",
              text: "Which of the following is NOT a common use case for JavaScript?",
              options: [
                { id: "a", text: "Adding interactivity to web pages" },
                { id: "b", text: "Creating server-side applications" },
                { id: "c", text: "Compiling other programming languages" },
                { id: "d", text: "Building mobile applications" }
              ],
              correctAnswer: "c"
            },
            {
              id: "q2",
              text: "Which tool would you use to debug JavaScript code in a browser?",
              options: [
                { id: "a", text: "Command Prompt" },
                { id: "b", text: "Browser Console" },
                { id: "c", text: "File Explorer" },
                { id: "d", text: "System Preferences" }
              ],
              correctAnswer: "b"
            },
            {
              id: "q3",
              text: "When was JavaScript first created?",
              options: [
                { id: "a", text: "1985" },
                { id: "b", text: "1995" },
                { id: "c", text: "2005" },
                { id: "d", text: "2015" }
              ],
              correctAnswer: "b"
            }
          ]
        }
      ]
    },

    // JavaScript Syntax & Data Types
    "js-mod-2": {
      id: "js-mod-2",
      title: "JavaScript Syntax & Data Types",
      content: [
        {
          type: "video",
          title: "JavaScript Data Types and Variables",
          description: "Learn about JavaScript data types, variables, and how to use them effectively in your code. This tutorial covers primitive types, reference types, and variable declarations.",
          source: "Programming with Mosh",
          url: "https://www.youtube.com/embed/qw3j0A3DIzQ",
          duration: "1 hour 2 minutes",
          thumbnail: "https://img.youtube.com/vi/qw3j0A3DIzQ/maxresdefault.jpg"
        },
        {
          type: "text",
          title: "JavaScript Syntax Basics",
          body: `
            <p>JavaScript syntax is the set of rules that define how JavaScript programs are constructed. Let's cover the basics:</p>

            <h4>Statements</h4>
            <p>JavaScript code is made up of statements. Each statement typically ends with a semicolon (;), although they are technically optional in many cases.</p>

            <pre><code>let greeting = "Hello, World!";
console.log(greeting);</code></pre>

            <h4>Comments</h4>
            <p>Comments are used to add notes to your code that won't be executed. There are two types:</p>

            <pre><code>// This is a single-line comment

/* This is a
   multi-line comment */</code></pre>

            <h4>Case Sensitivity</h4>
            <p>JavaScript is case-sensitive. This means that variables, function names, and other identifiers must be typed with consistent capitalization.</p>

            <pre><code>let name = "John";
// NAME and Name are different variables from name
let NAME = "JOHN";
let Name = "John Doe";</code></pre>

            <h4>Whitespace</h4>
            <p>JavaScript ignores spaces, tabs, and newlines that appear outside of string values. You can use whitespace to format your code for better readability.</p>

            <h4>Identifiers</h4>
            <p>Identifiers are names you give to variables, functions, etc. They must follow these rules:</p>
            <ul>
              <li>Can contain letters, digits, underscores, and dollar signs</li>
              <li>Must begin with a letter, $ or _</li>
              <li>Cannot use reserved words (like let, const, function, etc.)</li>
              <li>Are case sensitive</li>
            </ul>
          `
        },
        {
          type: "text",
          title: "Variables & Constants",
          body: `
            <p>Variables are used to store data values. In JavaScript, there are three ways to declare variables:</p>

            <h4>var (older method)</h4>
            <pre><code>var age = 25;
var name = "John", lastName = "Doe";</code></pre>

            <h4>let (block-scoped variables)</h4>
            <pre><code>let age = 25;
let name = "John";
// You can change the value later
name = "Jane";</code></pre>

            <h4>const (block-scoped constants)</h4>
            <pre><code>const PI = 3.14159;
const MAX_SIZE = 100;
// Cannot be reassigned
// PI = 3.14; // This would cause an error</code></pre>

            <p><strong>Note:</strong> It's generally recommended to use <code>const</code> by default, and only use <code>let</code> when you know the variable's value will change. Avoid using <code>var</code> in modern JavaScript.</p>

            <h4>Variable Naming Conventions</h4>
            <p>While not required by the language, these conventions are widely followed:</p>
            <ul>
              <li>Use camelCase for variable and function names (e.g., <code>firstName</code>, <code>calculateTotal</code>)</li>
              <li>Use PascalCase for classes and constructor functions (e.g., <code>Person</code>, <code>EventEmitter</code>)</li>
              <li>Use UPPER_SNAKE_CASE for constants (e.g., <code>MAX_USERS</code>, <code>API_KEY</code>)</li>
            </ul>
          `
        },
        {
          type: "text",
          title: "JavaScript Data Types",
          body: `
            <p>JavaScript has several built-in data types that can be categorized as:</p>

            <h4>Primitive Types</h4>
            <ul>
              <li><strong>Number:</strong> Represents both integer and floating-point numbers
                <pre><code>let age = 25;        // integer
let price = 19.99;   // floating-point</code></pre>
              </li>
              <li><strong>String:</strong> Represents textual data
                <pre><code>let name = "John";   // double quotes
let message = 'Hello'; // single quotes
let template = \`Hello, \${name}\`; // template literals</code></pre>
              </li>
              <li><strong>Boolean:</strong> Represents true or false
                <pre><code>let isActive = true;
let isComplete = false;</code></pre>
              </li>
              <li><strong>Undefined:</strong> Represents a variable that has been declared but not assigned a value
                <pre><code>let result;
console.log(result); // undefined</code></pre>
              </li>
              <li><strong>Null:</strong> Represents the intentional absence of any value
                <pre><code>let user = null; // user doesn't exist</code></pre>
              </li>
              <li><strong>Symbol:</strong> Represents a unique identifier
                <pre><code>let id = Symbol('id');</code></pre>
              </li>
              <li><strong>BigInt:</strong> Represents integers of arbitrary precision
                <pre><code>let bigNumber = 9007199254740991n;</code></pre>
              </li>
            </ul>

            <h4>Reference Types</h4>
            <ul>
              <li><strong>Object:</strong> Collections of properties
                <pre><code>let person = {
  name: "John",
  age: 30,
  isEmployed: true
};</code></pre>
              </li>
              <li><strong>Array:</strong> Ordered collections of values (technically objects)
                <pre><code>let colors = ["red", "green", "blue"];
let mixed = [1, "hello", true, null];</code></pre>
              </li>
              <li><strong>Function:</strong> Callable objects
                <pre><code>function greet(name) {
  return \`Hello, \${name}!\`;
}</code></pre>
              </li>
            </ul>

            <h4>Checking Types</h4>
            <p>You can check the type of a value using the <code>typeof</code> operator:</p>
            <pre><code>typeof 42;          // "number"
typeof "hello";     // "string"
typeof true;        // "boolean"
typeof undefined;   // "undefined"
typeof null;        // "object" (this is a historical bug)
typeof {};          // "object"
typeof [];          // "object" (arrays are objects)
typeof function(){}; // "function"</code></pre>
          `
        },
        {
          type: "exercise",
          title: "Working with Variables and Data Types",
          description: "Practice declaring variables and working with different data types in JavaScript.",
          instructions: [
            "Create variables using let and const with different data types",
            "Perform operations with these variables",
            "Use template literals to create a formatted string",
            "Log the results to the console"
          ],
          starterCode: `// 1. Declare variables for a person's details
// Use appropriate variable names and data types


// 2. Create an array of hobbies


// 3. Create an object that combines the person's details and hobbies


// 4. Use a template literal to create a summary of the person


// 5. Log the summary and the type of each variable to the console

`
        },
        {
          type: "quiz",
          title: "JavaScript Syntax & Data Types Quiz",
          description: "Test your understanding of JavaScript syntax and data types.",
          questions: [
            {
              id: "q1",
              text: "Which of the following is NOT a primitive data type in JavaScript?",
              options: [
                { id: "a", text: "String" },
                { id: "b", text: "Boolean" },
                { id: "c", text: "Array" },
                { id: "d", text: "Number" }
              ],
              correctAnswer: "c"
            },
            {
              id: "q2",
              text: "What will be the output of: typeof [1, 2, 3];",
              options: [
                { id: "a", text: "\"array\"" },
                { id: "b", text: "\"object\"" },
                { id: "c", text: "\"list\"" },
                { id: "d", text: "\"undefined\"" }
              ],
              correctAnswer: "b"
            },
            {
              id: "q3",
              text: "Which statement about const is true?",
              options: [
                { id: "a", text: "const variables cannot be modified at all" },
                { id: "b", text: "const prevents reassignment but object properties can still be changed" },
                { id: "c", text: "const is not supported in modern browsers" },
                { id: "d", text: "const is the same as final in Java" }
              ],
              correctAnswer: "b"
            }
          ]
        }
      ]
    }
    // Additional modules would be defined here
  };

  return moduleContent[moduleId] || null;
};

export default getJavaScriptModuleContent;
