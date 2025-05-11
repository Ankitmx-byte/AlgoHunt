// HTML module content data
// Based on open source resources like MDN Web Docs, W3Schools, and freeCodeCamp

export const getHTMLModuleContent = (moduleId) => {
  const moduleContent = {
    // HTML Introduction & Setup
    "html-mod-1": {
      id: "html-mod-1",
      title: "HTML Introduction & Document Structure",
      content: [
        {
          type: "text",
          title: "What is HTML?",
          body: `
            <p>HTML (HyperText Markup Language) is the standard markup language for creating web pages. It describes the structure of a web page using elements that tell the browser how to display the content.</p>
            
            <p>HTML consists of a series of elements, which you use to enclose, or wrap, different parts of the content to make it appear a certain way, or act a certain way. The enclosing tags can make a word or image hyperlink to somewhere else, can italicize words, can make the font bigger or smaller, and so on.</p>
            
            <h4>HTML's Role in Web Development</h4>
            <p>HTML is one of the core technologies of the World Wide Web, alongside CSS and JavaScript:</p>
            <ul>
              <li><strong>HTML</strong> provides the structure and content</li>
              <li><strong>CSS</strong> controls the presentation and layout</li>
              <li><strong>JavaScript</strong> adds interactivity and behavior</li>
            </ul>
            
            <h4>A Brief History</h4>
            <p>HTML was created by Tim Berners-Lee in 1991. Since then, it has gone through many versions, with HTML5 being the latest major revision. HTML5 introduced many new features including semantic elements, form improvements, multimedia support, and APIs for complex web applications.</p>
          `
        },
        {
          type: "video",
          title: "HTML Crash Course For Absolute Beginners",
          description: "A comprehensive introduction to HTML for beginners, covering all the basics you need to get started.",
          source: "YouTube - Traversy Media",
          url: "https://www.youtube.com/embed/UB1O30fR-EE",
          duration: "1 hour",
          thumbnail: "https://img.youtube.com/vi/UB1O30fR-EE/maxresdefault.jpg"
        },
        {
          type: "text",
          title: "HTML Document Structure",
          body: `
            <p>Every HTML document follows a basic structure that includes several key elements:</p>
            
            <pre><code>&lt;!DOCTYPE html&gt;
&lt;html&gt;
  &lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Page Title&lt;/title&gt;
  &lt;/head&gt;
  &lt;body&gt;
    &lt;h1&gt;My First Heading&lt;/h1&gt;
    &lt;p&gt;My first paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
            
            <p>Let's break down this structure:</p>
            
            <ul>
              <li><strong>&lt;!DOCTYPE html&gt;</strong> - Declares the document type and HTML version</li>
              <li><strong>&lt;html&gt;</strong> - The root element that contains all other HTML elements</li>
              <li><strong>&lt;head&gt;</strong> - Contains meta-information about the document, such as its title and links to CSS files</li>
              <li><strong>&lt;meta charset="UTF-8"&gt;</strong> - Specifies the character encoding for the document</li>
              <li><strong>&lt;title&gt;</strong> - Specifies the title of the document (shown in the browser's title bar or tab)</li>
              <li><strong>&lt;body&gt;</strong> - Contains the visible content of the document</li>
            </ul>
          `
        },
        {
          type: "exercise",
          title: "Your First HTML Document",
          description: "Let's create your first HTML document with the proper structure.",
          instructions: [
            "Create a new file with a .html extension",
            "Add the basic HTML document structure",
            "Include a heading and a paragraph in the body",
            "Save the file and open it in a web browser"
          ],
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>My First HTML Page</title>
</head>
<body>
  <!-- Add your content here -->
  
</body>
</html>`
        },
        {
          type: "quiz",
          title: "HTML Introduction Quiz",
          description: "Test your understanding of HTML basics with this quiz.",
          questions: [
            {
              id: "q1",
              text: "What does HTML stand for?",
              options: [
                { id: "a", text: "Hyper Text Markup Language" },
                { id: "b", text: "High Tech Modern Language" },
                { id: "c", text: "Hyperlinks and Text Markup Language" },
                { id: "d", text: "Home Tool Markup Language" }
              ],
              correctAnswer: "a"
            },
            {
              id: "q2",
              text: "Which element is the root of an HTML document?",
              options: [
                { id: "a", text: "<body>" },
                { id: "b", text: "<head>" },
                { id: "c", text: "<html>" },
                { id: "d", text: "<root>" }
              ],
              correctAnswer: "c"
            },
            {
              id: "q3",
              text: "Where in an HTML document is the correct place to refer to an external CSS file?",
              options: [
                { id: "a", text: "In the <body> section" },
                { id: "b", text: "In the <head> section" },
                { id: "c", text: "At the end of the document" },
                { id: "d", text: "In the <html> section" }
              ],
              correctAnswer: "b"
            }
          ]
        }
      ]
    },
    
    // HTML Elements & Text
    "html-mod-2": {
      id: "html-mod-2",
      title: "HTML Elements & Text Formatting",
      content: [
        {
          type: "text",
          title: "HTML Elements",
          body: `
            <p>HTML elements are the building blocks of HTML pages. An HTML element is defined by a start tag, some content, and an end tag:</p>
            
            <pre><code>&lt;tagname&gt;Content goes here...&lt;/tagname&gt;</code></pre>
            
            <p>Some HTML elements have no content and are called empty elements. Empty elements do not have an end tag, such as the &lt;br&gt; element (which indicates a line break).</p>
            
            <h4>Nested HTML Elements</h4>
            <p>HTML elements can be nested (elements can contain elements). All HTML documents consist of nested HTML elements.</p>
            
            <pre><code>&lt;html&gt;
  &lt;body&gt;
    &lt;h1&gt;My First Heading&lt;/h1&gt;
    &lt;p&gt;My first paragraph.&lt;/p&gt;
  &lt;/body&gt;
&lt;/html&gt;</code></pre>
            
            <h4>HTML Element Attributes</h4>
            <p>HTML elements can have attributes, which provide additional information about the element:</p>
            
            <pre><code>&lt;a href="https://www.example.com"&gt;This is a link&lt;/a&gt;</code></pre>
            
            <p>In this example, the <code>href</code> attribute specifies the URL of the page the link goes to.</p>
            
            <p>Attributes usually come in name/value pairs like: <code>name="value"</code></p>
          `
        },
        {
          type: "video",
          title: "HTML Elements Explained",
          description: "Learn about HTML elements, their structure, and how to use them effectively in your web pages.",
          source: "YouTube - Programming with Mosh",
          url: "https://www.youtube.com/embed/XiQ9rjaa2Ow",
          duration: "15 minutes",
          thumbnail: "https://img.youtube.com/vi/XiQ9rjaa2Ow/maxresdefault.jpg"
        },
        {
          type: "text",
          title: "Text Formatting Elements",
          body: `
            <p>HTML provides several elements for formatting text:</p>
            
            <h4>Headings</h4>
            <p>HTML headings are defined with the &lt;h1&gt; to &lt;h6&gt; tags, with &lt;h1&gt; being the most important and &lt;h6&gt; the least important.</p>
            
            <pre><code>&lt;h1&gt;This is heading 1&lt;/h1&gt;
&lt;h2&gt;This is heading 2&lt;/h2&gt;
&lt;h3&gt;This is heading 3&lt;/h3&gt;
&lt;h4&gt;This is heading 4&lt;/h4&gt;
&lt;h5&gt;This is heading 5&lt;/h5&gt;
&lt;h6&gt;This is heading 6&lt;/h6&gt;</code></pre>
            
            <h4>Paragraphs</h4>
            <p>The &lt;p&gt; element defines a paragraph:</p>
            
            <pre><code>&lt;p&gt;This is a paragraph.&lt;/p&gt;
&lt;p&gt;This is another paragraph.&lt;/p&gt;</code></pre>
            
            <h4>Text Formatting</h4>
            <p>HTML provides several elements for formatting text:</p>
            
            <ul>
              <li><strong>&lt;b&gt;</strong> - Bold text</li>
              <li><strong>&lt;strong&gt;</strong> - Important text (semantically strong emphasis)</li>
              <li><strong>&lt;i&gt;</strong> - Italic text</li>
              <li><strong>&lt;em&gt;</strong> - Emphasized text (semantically emphasized)</li>
              <li><strong>&lt;mark&gt;</strong> - Marked/highlighted text</li>
              <li><strong>&lt;small&gt;</strong> - Smaller text</li>
              <li><strong>&lt;del&gt;</strong> - Deleted text</li>
              <li><strong>&lt;ins&gt;</strong> - Inserted text</li>
              <li><strong>&lt;sub&gt;</strong> - Subscript text</li>
              <li><strong>&lt;sup&gt;</strong> - Superscript text</li>
            </ul>
            
            <pre><code>&lt;p&gt;This is &lt;b&gt;bold&lt;/b&gt; text.&lt;/p&gt;
&lt;p&gt;This is &lt;strong&gt;important&lt;/strong&gt; text.&lt;/p&gt;
&lt;p&gt;This is &lt;i&gt;italic&lt;/i&gt; text.&lt;/p&gt;
&lt;p&gt;This is &lt;em&gt;emphasized&lt;/em&gt; text.&lt;/p&gt;</code></pre>
          `
        },
        {
          type: "exercise",
          title: "Working with HTML Text Elements",
          description: "Practice using various HTML text elements to format content.",
          instructions: [
            "Create a new HTML document",
            "Add headings of different levels",
            "Create paragraphs with various text formatting",
            "Use semantic elements appropriately",
            "View the result in a browser"
          ],
          starterCode: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Text Formatting Practice</title>
</head>
<body>
  <!-- Add your formatted text here -->
  
</body>
</html>`
        },
        {
          type: "video",
          title: "HTML Text Formatting Tutorial",
          description: "A detailed tutorial on how to format text in HTML using various elements and best practices.",
          source: "YouTube - freeCodeCamp.org",
          url: "https://www.youtube.com/embed/bWPMSSsVdPk",
          duration: "20 minutes",
          thumbnail: "https://img.youtube.com/vi/bWPMSSsVdPk/maxresdefault.jpg"
        },
        {
          type: "quiz",
          title: "HTML Elements & Text Quiz",
          description: "Test your understanding of HTML elements and text formatting.",
          questions: [
            {
              id: "q1",
              text: "Which HTML element defines the most important heading?",
              options: [
                { id: "a", text: "<heading>" },
                { id: "b", text: "<h6>" },
                { id: "c", text: "<h1>" },
                { id: "d", text: "<head>" }
              ],
              correctAnswer: "c"
            },
            {
              id: "q2",
              text: "What is the difference between <strong> and <b> elements?",
              options: [
                { id: "a", text: "There is no difference" },
                { id: "b", text: "<strong> is semantic (indicates importance) while <b> is just visual" },
                { id: "c", text: "<b> is newer and should be used instead of <strong>" },
                { id: "d", text: "<strong> makes text bigger while <b> just makes it bold" }
              ],
              correctAnswer: "b"
            },
            {
              id: "q3",
              text: "Which HTML element is used to define a paragraph?",
              options: [
                { id: "a", text: "<paragraph>" },
                { id: "b", text: "<p>" },
                { id: "c", text: "<para>" },
                { id: "d", text: "<text>" }
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

export default getHTMLModuleContent;
