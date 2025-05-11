// CSS module content data
// Based on open source resources like MDN Web Docs, CSS-Tricks, and freeCodeCamp

export const getCSSModuleContent = (moduleId) => {
  const moduleContent = {
    // CSS Introduction & Basics
    "css-mod-1": {
      id: "css-mod-1",
      title: "CSS Introduction & Selectors",
      content: [
        {
          type: "text",
          title: "What is CSS?",
          body: `
            <p>CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media.</p>
            
            <p>CSS is one of the core languages of the web and is standardized across browsers according to the W3C specification. It is designed to enable the separation of presentation and content, including layout, colors, and fonts.</p>
            
            <h4>CSS's Role in Web Development</h4>
            <p>CSS works alongside HTML and JavaScript to create modern web experiences:</p>
            <ul>
              <li><strong>HTML</strong> provides the structure and content</li>
              <li><strong>CSS</strong> controls the presentation and layout</li>
              <li><strong>JavaScript</strong> adds interactivity and behavior</li>
            </ul>
            
            <h4>Benefits of CSS</h4>
            <ul>
              <li><strong>Separation of concerns</strong> - Keep content (HTML) separate from presentation (CSS)</li>
              <li><strong>Consistency</strong> - Apply the same styles across multiple pages</li>
              <li><strong>Efficiency</strong> - Change the appearance of an entire website by modifying a single file</li>
              <li><strong>Responsive design</strong> - Adapt your layout for different screen sizes and devices</li>
              <li><strong>Accessibility</strong> - Improve readability and usability for all users</li>
            </ul>
          `
        },
        {
          type: "video",
          title: "CSS Crash Course For Absolute Beginners",
          description: "A comprehensive introduction to CSS for beginners, covering all the basics you need to get started with styling web pages.",
          source: "YouTube - Traversy Media",
          url: "https://www.youtube.com/embed/yfoY53QXEnI",
          duration: "1 hour 25 minutes",
          thumbnail: "https://img.youtube.com/vi/yfoY53QXEnI/maxresdefault.jpg"
        },
        {
          type: "text",
          title: "Adding CSS to HTML",
          body: `
            <p>There are three ways to add CSS to an HTML document:</p>
            
            <h4>1. External CSS</h4>
            <p>With external CSS, you link to a separate CSS file from your HTML document. This is the most common and recommended method for production websites.</p>
            
            <pre><code>&lt;!-- In the HTML &lt;head&gt; section --&gt;
&lt;link rel="stylesheet" href="styles.css"&gt;</code></pre>
            
            <p>Then in the styles.css file:</p>
            
            <pre><code>body {
  background-color: lightblue;
}

h1 {
  color: navy;
  margin-left: 20px;
}</code></pre>
            
            <h4>2. Internal CSS</h4>
            <p>Internal CSS is defined within the &lt;style&gt; element in the &lt;head&gt; section of an HTML page:</p>
            
            <pre><code>&lt;head&gt;
  &lt;style&gt;
    body {
      background-color: lightblue;
    }
    
    h1 {
      color: navy;
      margin-left: 20px;
    }
  &lt;/style&gt;
&lt;/head&gt;</code></pre>
            
            <h4>3. Inline CSS</h4>
            <p>Inline CSS is used to apply a unique style to a single HTML element:</p>
            
            <pre><code>&lt;h1 style="color: blue; margin-left: 30px;"&gt;This is a heading&lt;/h1&gt;</code></pre>
            
            <p><strong>Note:</strong> Inline CSS should be avoided when possible, as it mixes content with presentation and makes maintenance difficult.</p>
          `
        },
        {
          type: "text",
          title: "CSS Selectors",
          body: `
            <p>CSS selectors are patterns used to select the HTML elements you want to style. Here are the most common types of selectors:</p>
            
            <h4>Element Selector</h4>
            <p>Selects all elements with the specified element name:</p>
            
            <pre><code>p {
  text-align: center;
  color: red;
}</code></pre>
            
            <h4>ID Selector</h4>
            <p>Selects an element with a specific ID attribute. IDs should be unique within a page:</p>
            
            <pre><code>#header {
  background-color: black;
  color: white;
}</code></pre>
            
            <h4>Class Selector</h4>
            <p>Selects all elements with a specific class attribute:</p>
            
            <pre><code>.highlight {
  background-color: yellow;
}</code></pre>
            
            <h4>Descendant Selector</h4>
            <p>Selects all elements that are descendants of a specified element:</p>
            
            <pre><code>div p {
  background-color: yellow;
}</code></pre>
            
            <h4>Child Selector</h4>
            <p>Selects all elements that are direct children of a specified element:</p>
            
            <pre><code>div > p {
  background-color: yellow;
}</code></pre>
            
            <h4>Attribute Selector</h4>
            <p>Selects elements with a specific attribute:</p>
            
            <pre><code>a[target="_blank"] {
  background-color: yellow;
}</code></pre>
            
            <h4>Pseudo-class Selector</h4>
            <p>Selects elements based on a certain state:</p>
            
            <pre><code>a:hover {
  color: red;
}</code></pre>
            
            <h4>Pseudo-element Selector</h4>
            <p>Selects and styles a part of an element:</p>
            
            <pre><code>p::first-line {
  color: blue;
  font-variant: small-caps;
}</code></pre>
          `
        },
        {
          type: "video",
          title: "CSS Selectors Explained",
          description: "Learn about different types of CSS selectors and how to use them effectively to target specific elements.",
          source: "YouTube - Web Dev Simplified",
          url: "https://www.youtube.com/embed/l1mER1bV0N0",
          duration: "22 minutes",
          thumbnail: "https://img.youtube.com/vi/l1mER1bV0N0/maxresdefault.jpg"
        },
        {
          type: "exercise",
          title: "Working with CSS Selectors",
          description: "Practice using various CSS selectors to style HTML elements.",
          instructions: [
            "Create a new HTML document with various elements",
            "Add an external CSS file",
            "Use different types of selectors to style elements",
            "Experiment with combining selectors",
            "View the result in a browser"
          ],
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CSS Selectors Practice</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header id="main-header">
    <h1>CSS Selectors</h1>
    <nav>
      <ul>
        <li><a href="#section1">Section 1</a></li>
        <li><a href="#section2">Section 2</a></li>
        <li><a href="#section3">Section 3</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section id="section1" class="content-section">
      <h2>Section 1</h2>
      <p>This is the first paragraph in section 1.</p>
      <p class="highlight">This paragraph has a highlight class.</p>
    </section>
    
    <section id="section2" class="content-section">
      <h2>Section 2</h2>
      <p>This is the first paragraph in section 2.</p>
      <p>This is the second paragraph in section 2.</p>
      <div class="box">
        <p>This paragraph is inside a div with class "box".</p>
      </div>
    </section>
    
    <section id="section3" class="content-section">
      <h2>Section 3</h2>
      <p>This is a paragraph in section 3.</p>
      <a href="https://example.com" target="_blank">External Link</a>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2023 CSS Practice</p>
  </footer>
</body>
</html>`
        },
        {
          type: "quiz",
          title: "CSS Introduction & Selectors Quiz",
          description: "Test your understanding of CSS basics and selectors.",
          questions: [
            {
              id: "q1",
              text: "Which CSS selector would you use to select all paragraphs inside a div?",
              options: [
                { id: "a", text: "div + p" },
                { id: "b", text: "div p" },
                { id: "c", text: "div.p" },
                { id: "d", text: "div > p" }
              ],
              correctAnswer: "b"
            },
            {
              id: "q2",
              text: "What is the correct CSS syntax for making all paragraph elements red?",
              options: [
                { id: "a", text: "p {color: red;}" },
                { id: "b", text: "p (color: red)" },
                { id: "c", text: "all.p {color: red;}" },
                { id: "d", text: "#p {color: red;}" }
              ],
              correctAnswer: "a"
            },
            {
              id: "q3",
              text: "Which is the recommended way to add CSS to an HTML document for production websites?",
              options: [
                { id: "a", text: "Inline CSS" },
                { id: "b", text: "Internal CSS" },
                { id: "c", text: "External CSS" },
                { id: "d", text: "JavaScript CSS" }
              ],
              correctAnswer: "c"
            }
          ]
        }
      ]
    },
    
    // CSS Box Model & Layout
    "css-mod-2": {
      id: "css-mod-2",
      title: "CSS Box Model & Layout",
      content: [
        {
          type: "text",
          title: "The CSS Box Model",
          body: `
            <p>In CSS, the term "box model" is used when talking about design and layout. The CSS box model is essentially a box that wraps around every HTML element. It consists of: margins, borders, padding, and the actual content.</p>
            
            <p>From outside to inside, the box model includes:</p>
            <ul>
              <li><strong>Margin</strong> - Clears an area outside the border; the margin is transparent</li>
              <li><strong>Border</strong> - A border that goes around the padding and content</li>
              <li><strong>Padding</strong> - Clears an area around the content; the padding is transparent</li>
              <li><strong>Content</strong> - The content of the box, where text and images appear</li>
            </ul>
            
            <pre><code>div {
  width: 300px;
  padding: 10px;
  border: 5px solid gray;
  margin: 20px;
}</code></pre>
            
            <p>By default, the <code>width</code> and <code>height</code> properties in CSS define the width and height of the content area only. However, you can change this behavior using the <code>box-sizing</code> property:</p>
            
            <pre><code>* {
  box-sizing: border-box;
}</code></pre>
            
            <p>With <code>box-sizing: border-box</code>, the <code>width</code> and <code>height</code> properties include the padding and border, but not the margin.</p>
          `
        },
        {
          type: "video",
          title: "Learn CSS Box Model In 8 Minutes",
          description: "A quick and clear explanation of the CSS Box Model and how it affects layout.",
          source: "YouTube - Web Dev Simplified",
          url: "https://www.youtube.com/embed/rIO5326FgPE",
          duration: "8 minutes",
          thumbnail: "https://img.youtube.com/vi/rIO5326FgPE/maxresdefault.jpg"
        },
        {
          type: "text",
          title: "CSS Layout Techniques",
          body: `
            <p>CSS provides several techniques for creating layouts:</p>
            
            <h4>1. Normal Flow</h4>
            <p>The default layout mode where elements are positioned according to their order in the HTML document.</p>
            
            <h4>2. Floats</h4>
            <p>The float property allows elements to be positioned to the left or right of their container:</p>
            
            <pre><code>.left {
  float: left;
}

.right {
  float: right;
}</code></pre>
            
            <h4>3. Positioning</h4>
            <p>The position property specifies the type of positioning method used for an element:</p>
            
            <pre><code>/* Static (default) */
.static {
  position: static;
}

/* Relative */
.relative {
  position: relative;
  top: 20px;
  left: 20px;
}

/* Absolute */
.absolute {
  position: absolute;
  top: 20px;
  right: 20px;
}

/* Fixed */
.fixed {
  position: fixed;
  bottom: 20px;
  right: 20px;
}

/* Sticky */
.sticky {
  position: sticky;
  top: 0;
}</code></pre>
            
            <h4>4. Flexbox</h4>
            <p>Flexbox is a one-dimensional layout method for laying out items in rows or columns:</p>
            
            <pre><code>.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}</code></pre>
            
            <h4>5. Grid</h4>
            <p>CSS Grid Layout is a two-dimensional layout system designed for complex layouts:</p>
            
            <pre><code>.container {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 20px;
}</code></pre>
          `
        },
        {
          type: "video",
          title: "CSS Flexbox Tutorial",
          description: "Learn how to use CSS Flexbox to create flexible and responsive layouts.",
          source: "YouTube - freeCodeCamp.org",
          url: "https://www.youtube.com/embed/JJSoEo8JSnc",
          duration: "46 minutes",
          thumbnail: "https://img.youtube.com/vi/JJSoEo8JSnc/maxresdefault.jpg"
        },
        {
          type: "exercise",
          title: "Creating Layouts with CSS",
          description: "Practice creating different layouts using CSS techniques.",
          instructions: [
            "Create a new HTML document with various sections",
            "Use the CSS box model to style elements",
            "Create a layout using Flexbox or Grid",
            "Make the layout responsive for different screen sizes",
            "View the result in a browser and resize to test responsiveness"
          ],
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>CSS Layout Practice</title>
  <style>
    /* Add your CSS here */
    
  </style>
</head>
<body>
  <header>
    <h1>CSS Layout Practice</h1>
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  </header>
  
  <main>
    <section class="hero">
      <h2>Welcome to our Website</h2>
      <p>This is a practice layout using CSS.</p>
    </section>
    
    <section class="features">
      <div class="feature">
        <h3>Feature 1</h3>
        <p>Description of feature 1.</p>
      </div>
      <div class="feature">
        <h3>Feature 2</h3>
        <p>Description of feature 2.</p>
      </div>
      <div class="feature">
        <h3>Feature 3</h3>
        <p>Description of feature 3.</p>
      </div>
    </section>
  </main>
  
  <footer>
    <p>&copy; 2023 CSS Layout Practice</p>
  </footer>
</body>
</html>`
        },
        {
          type: "quiz",
          title: "CSS Box Model & Layout Quiz",
          description: "Test your understanding of the CSS box model and layout techniques.",
          questions: [
            {
              id: "q1",
              text: "In the CSS box model, which property creates space outside an element's border?",
              options: [
                { id: "a", text: "Padding" },
                { id: "b", text: "Margin" },
                { id: "c", text: "Border" },
                { id: "d", text: "Spacing" }
              ],
              correctAnswer: "b"
            },
            {
              id: "q2",
              text: "What does the CSS property 'box-sizing: border-box' do?",
              options: [
                { id: "a", text: "It makes all boxes the same size" },
                { id: "b", text: "It includes padding and border in the element's width and height" },
                { id: "c", text: "It removes all borders from elements" },
                { id: "d", text: "It creates a box around the border" }
              ],
              correctAnswer: "b"
            },
            {
              id: "q3",
              text: "Which CSS layout method is best suited for creating a grid of items with rows and columns?",
              options: [
                { id: "a", text: "Floats" },
                { id: "b", text: "Positioning" },
                { id: "c", text: "Flexbox" },
                { id: "d", text: "Grid" }
              ],
              correctAnswer: "d"
            }
          ]
        }
      ]
    }
    // Additional modules would be defined here
  };
  
  return moduleContent[moduleId] || null;
};

export default getCSSModuleContent;
