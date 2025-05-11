// This file contains learning paths for various programming languages
// Each path is structured from beginner to advanced levels
// Content is based on open source educational resources
// Videos are sourced from platforms like YouTube (freeCodeCamp, Traversy Media, etc.)

import { getVideoResource } from './videoResourcesData';

export const getLanguageLearningPaths = () => {
  return [
    // Frontend Languages
    {
      id: "lang-html-1",
      title: "HTML Fundamentals",
      difficulty: "Beginner",
      moduleCount: 6,
      estimatedTime: "12-15 hours",
      description: "Learn HTML, the backbone of the web. Master the essential elements, semantic markup, forms, and best practices for creating well-structured web pages.",
      source: "MDN Web Docs, W3Schools, freeCodeCamp",
      category: "Frontend",
      tags: ["HTML", "Web Development", "Frontend"],
      prerequisites: ["No prior programming experience required"],
      learningOutcomes: [
        "Create well-structured HTML documents",
        "Use semantic HTML elements appropriately",
        "Build accessible forms and tables",
        "Embed media like images, audio, and video",
        "Understand HTML5 features and APIs"
      ]
    },
    {
      id: "lang-css-1",
      title: "CSS Fundamentals",
      difficulty: "Beginner",
      moduleCount: 7,
      estimatedTime: "15-18 hours",
      description: "Master CSS, the styling language of the web. Learn selectors, layout techniques, animations, and responsive design to create beautiful, user-friendly websites.",
      source: "MDN Web Docs, CSS-Tricks, freeCodeCamp",
      category: "Frontend",
      tags: ["CSS", "Web Development", "Frontend", "Design"],
      prerequisites: ["Basic HTML knowledge"],
      learningOutcomes: [
        "Style HTML elements with CSS",
        "Understand the CSS box model and layout techniques",
        "Create responsive designs with media queries",
        "Implement animations and transitions",
        "Use modern CSS features like Flexbox and Grid"
      ]
    },
    {
      id: "lang-js-1",
      title: "JavaScript Fundamentals",
      difficulty: "Beginner",
      moduleCount: 8,
      estimatedTime: "20-25 hours",
      description: "Master the fundamentals of JavaScript, the language of the web. Learn syntax, data types, functions, and basic DOM manipulation to build interactive websites.",
      source: "MDN Web Docs, JavaScript.info, freeCodeCamp",
      category: "Frontend",
      tags: ["JavaScript", "Web Development", "Frontend"],
      prerequisites: ["Basic HTML and CSS knowledge", "Understanding of how the web works"],
      learningOutcomes: [
        "Write clean, efficient JavaScript code",
        "Understand JavaScript data types and structures",
        "Create interactive web elements with DOM manipulation",
        "Debug JavaScript code effectively",
        "Build simple web applications"
      ]
    },
    {
      id: "lang-react-1",
      title: "React Fundamentals",
      difficulty: "Intermediate",
      moduleCount: 8,
      estimatedTime: "25-30 hours",
      description: "Learn React, the popular JavaScript library for building user interfaces. Master components, state management, hooks, and modern React patterns.",
      source: "React Documentation, freeCodeCamp, Egghead.io",
      category: "Frontend",
      tags: ["React", "JavaScript", "Frontend", "UI"],
      prerequisites: ["JavaScript fundamentals", "Basic HTML and CSS"],
      learningOutcomes: [
        "Build component-based user interfaces",
        "Manage state effectively in React applications",
        "Use React hooks for functional components",
        "Implement routing in single-page applications",
        "Create reusable, maintainable React components"
      ]
    },

    // Backend Languages
    {
      id: "lang-py-1",
      title: "Python Fundamentals",
      difficulty: "Beginner",
      moduleCount: 7,
      estimatedTime: "18-22 hours",
      description: "Learn Python from scratch - one of the most beginner-friendly and versatile programming languages. Master syntax, data structures, functions, and file operations.",
      source: "Python.org, Real Python, freeCodeCamp",
      category: "Backend",
      tags: ["Python", "Programming Basics", "Backend"],
      prerequisites: ["No prior programming experience required"],
      learningOutcomes: [
        "Write clean, Pythonic code",
        "Understand Python data types and structures",
        "Create functions and use modules",
        "Work with files and external data",
        "Build simple command-line applications"
      ]
    },
    {
      id: "lang-java-1",
      title: "Java Fundamentals",
      difficulty: "Beginner",
      moduleCount: 9,
      estimatedTime: "25-30 hours",
      description: "Start your journey with Java, a powerful object-oriented language used in enterprise applications, Android development, and more. Learn core concepts, syntax, and object-oriented programming principles.",
      source: "Oracle Java Documentation, Java Tutorials, Codecademy",
      category: "Backend",
      tags: ["Java", "Object-Oriented Programming", "Backend"],
      prerequisites: ["No prior programming experience required, but helpful"],
      learningOutcomes: [
        "Write and compile Java programs",
        "Understand object-oriented programming concepts",
        "Create classes and implement inheritance",
        "Handle exceptions and debug Java code",
        "Build simple Java applications"
      ]
    },
    {
      id: "lang-nodejs-1",
      title: "Node.js Fundamentals",
      difficulty: "Intermediate",
      moduleCount: 7,
      estimatedTime: "20-25 hours",
      description: "Learn Node.js, the JavaScript runtime for building server-side applications. Master asynchronous programming, file system operations, and building RESTful APIs.",
      source: "Node.js Documentation, freeCodeCamp, Mosh Hamedani courses",
      category: "Backend",
      tags: ["Node.js", "JavaScript", "Backend", "Server-side"],
      prerequisites: ["JavaScript fundamentals"],
      learningOutcomes: [
        "Build server-side applications with Node.js",
        "Understand asynchronous programming with callbacks, promises, and async/await",
        "Create RESTful APIs with Express.js",
        "Work with file systems and streams",
        "Connect to databases from Node.js applications"
      ]
    },
    {
      id: "lang-php-1",
      title: "PHP Fundamentals",
      difficulty: "Beginner",
      moduleCount: 7,
      estimatedTime: "18-22 hours",
      description: "Learn PHP, one of the most widely used server-side scripting languages. Master syntax, forms handling, database interactions, and building dynamic web applications.",
      source: "PHP Documentation, W3Schools, Laracasts",
      category: "Backend",
      tags: ["PHP", "Web Development", "Backend"],
      prerequisites: ["Basic HTML knowledge"],
      learningOutcomes: [
        "Write clean, efficient PHP code",
        "Process form data and handle user input",
        "Connect to and query databases",
        "Implement sessions and cookies for state management",
        "Build simple dynamic web applications"
      ]
    },

    // Systems and General-Purpose Languages
    {
      id: "lang-cpp-1",
      title: "C++ Fundamentals",
      difficulty: "Beginner",
      moduleCount: 10,
      estimatedTime: "30-35 hours",
      description: "Learn C++, a powerful language used in systems programming, game development, and performance-critical applications. Master syntax, memory management, and object-oriented concepts.",
      source: "CPlusPlus.com, C++ Reference, Codecademy",
      category: "Systems Programming",
      tags: ["C++", "Systems Programming", "Performance"],
      prerequisites: ["No prior programming experience required, but helpful"],
      learningOutcomes: [
        "Write and compile C++ programs",
        "Understand memory management and pointers",
        "Implement object-oriented programming in C++",
        "Use the Standard Template Library (STL)",
        "Build efficient C++ applications"
      ]
    },
    {
      id: "lang-csharp-1",
      title: "C# Fundamentals",
      difficulty: "Beginner",
      moduleCount: 8,
      estimatedTime: "22-28 hours",
      description: "Start with C#, Microsoft's powerful language for building Windows applications, games with Unity, and web applications with ASP.NET. Learn syntax, object-oriented concepts, and basic application development.",
      source: "Microsoft Learn, C# Documentation, Mosh Hamedani courses",
      category: "Backend",
      tags: ["C#", ".NET", "Windows Development"],
      prerequisites: ["No prior programming experience required, but helpful"],
      learningOutcomes: [
        "Write and compile C# programs",
        "Understand object-oriented programming concepts",
        "Work with the .NET framework",
        "Create simple Windows applications",
        "Understand LINQ and collections"
      ]
    },
    {
      id: "lang-ruby-1",
      title: "Ruby Fundamentals",
      difficulty: "Beginner",
      moduleCount: 6,
      estimatedTime: "15-20 hours",
      description: "Learn Ruby, an elegant, readable language known for its simplicity and productivity. Master syntax, object-oriented concepts, and the Ruby way of solving problems.",
      source: "Ruby-Lang.org, Ruby Documentation, The Odin Project",
      category: "Backend",
      tags: ["Ruby", "Web Development", "Backend"],
      prerequisites: ["No prior programming experience required"],
      learningOutcomes: [
        "Write clean, idiomatic Ruby code",
        "Understand Ruby's object-oriented approach",
        "Use Ruby's built-in classes and modules",
        "Work with collections and blocks",
        "Build simple Ruby applications"
      ]
    },
    {
      id: "lang-go-1",
      title: "Go (Golang) Fundamentals",
      difficulty: "Beginner",
      moduleCount: 7,
      estimatedTime: "18-24 hours",
      description: "Start with Go, a modern language designed for simplicity, efficiency, and concurrency. Learn syntax, data structures, and Go's approach to building reliable software.",
      source: "Golang.org, Go Documentation, freeCodeCamp",
      category: "Backend",
      tags: ["Go", "Golang", "Systems Programming"],
      prerequisites: ["Basic programming concepts helpful but not required"],
      learningOutcomes: [
        "Write clean, efficient Go code",
        "Understand Go's type system and data structures",
        "Implement concurrency with goroutines and channels",
        "Use Go's standard library effectively",
        "Build command-line applications and web servers"
      ]
    },

    // Mobile Development Languages
    {
      id: "lang-swift-1",
      title: "Swift Fundamentals",
      difficulty: "Beginner",
      moduleCount: 7,
      estimatedTime: "20-25 hours",
      description: "Learn Swift, Apple's modern language for iOS, macOS, watchOS, and tvOS development. Master syntax, data structures, and the foundations of app development.",
      source: "Swift.org, Apple Developer Documentation, Hacking with Swift",
      category: "Mobile Development",
      tags: ["Swift", "iOS Development", "Apple"],
      prerequisites: ["No prior programming experience required"],
      learningOutcomes: [
        "Write clean, safe Swift code",
        "Understand Swift's type system and optionals",
        "Work with Swift collections and control flow",
        "Implement object-oriented and functional programming concepts",
        "Build simple iOS applications"
      ]
    },
    {
      id: "lang-kotlin-1",
      title: "Kotlin Fundamentals",
      difficulty: "Beginner",
      moduleCount: 7,
      estimatedTime: "18-22 hours",
      description: "Learn Kotlin, a modern language for Android development, server-side applications, and more. Master syntax, null safety, and functional programming concepts.",
      source: "Kotlin Documentation, Google Codelabs, Udacity",
      category: "Mobile Development",
      tags: ["Kotlin", "Android Development", "JVM"],
      prerequisites: ["No prior programming experience required, but helpful"],
      learningOutcomes: [
        "Write clean, concise Kotlin code",
        "Understand Kotlin's type system and null safety",
        "Use functional programming features in Kotlin",
        "Work with collections and coroutines",
        "Build simple Android applications"
      ]
    },

    // Database Languages
    {
      id: "lang-sql-1",
      title: "SQL Fundamentals",
      difficulty: "Beginner",
      moduleCount: 6,
      estimatedTime: "15-18 hours",
      description: "Master SQL, the standard language for working with relational databases. Learn to create, query, and manipulate databases to store and retrieve data efficiently.",
      source: "W3Schools, Khan Academy, Mode Analytics",
      category: "Database",
      tags: ["SQL", "Database", "Data"],
      prerequisites: ["No prior programming experience required"],
      learningOutcomes: [
        "Create and modify database tables",
        "Write efficient queries to retrieve data",
        "Perform data manipulation operations",
        "Understand database relationships and joins",
        "Optimize queries for performance"
      ]
    }
  ];
};

// Get detailed information about a specific language learning path
export const getLanguageLearningPathDetail = (pathId) => {
  const allPaths = getLanguageLearningPaths();
  const path = allPaths.find(p => p.id === pathId);

  if (!path) return null;

  // Add modules information based on the path ID
  switch(pathId) {
    case "lang-html-1":
      return {
        ...path,
        modules: getHTMLModules()
      };
    case "lang-css-1":
      return {
        ...path,
        modules: getCSSModules()
      };
    case "lang-js-1":
      return {
        ...path,
        modules: getJavaScriptModules()
      };
    case "lang-py-1":
      return {
        ...path,
        modules: getPythonModules()
      };
    case "lang-java-1":
      return {
        ...path,
        modules: getGenericModules("Java")
      };
    case "lang-cpp-1":
      return {
        ...path,
        modules: getGenericModules("C++")
      };
    case "lang-csharp-1":
      return {
        ...path,
        modules: getGenericModules("C#")
      };
    case "lang-ruby-1":
      return {
        ...path,
        modules: getGenericModules("Ruby")
      };
    case "lang-go-1":
      return {
        ...path,
        modules: getGenericModules("Go")
      };
    case "lang-swift-1":
      return {
        ...path,
        modules: getGenericModules("Swift")
      };
    case "lang-kotlin-1":
      return {
        ...path,
        modules: getGenericModules("Kotlin")
      };
    case "lang-php-1":
      return {
        ...path,
        modules: getGenericModules("PHP")
      };
    case "lang-sql-1":
      return {
        ...path,
        modules: getGenericModules("SQL")
      };
    case "lang-react-1":
      return {
        ...path,
        modules: getGenericModules("React")
      };
    case "lang-nodejs-1":
      return {
        ...path,
        modules: getGenericModules("Node.js")
      };
    // Default case - return path without modules
    default:
      return {
        ...path,
        modules: getGenericModules(path.title)
      };
  }
};

// HTML modules
const getHTMLModules = () => {
  return [
    createModuleWithVideo(
      "html-mod-1",
      "HTML Introduction & Document Structure",
      "Get started with HTML by understanding its role in web development and learning the basic document structure.",
      "2-3 hours",
      ["HTML basics", "Document structure", "Elements & attributes", "HTML5 doctype"],
      "html",
      "introduction"
    ),
    createModuleWithVideo(
      "html-mod-2",
      "HTML Elements & Text Formatting",
      "Learn about HTML elements for text content and how to format text on your web pages.",
      "3-4 hours",
      ["Headings", "Paragraphs", "Text formatting", "Lists", "Semantic elements"],
      "html",
      "text"
    ),
    createModuleWithVideo(
      "html-mod-3",
      "HTML Links & Images",
      "Master creating hyperlinks and adding images to your web pages.",
      "2-3 hours",
      ["Anchor tags", "Relative & absolute URLs", "Image elements", "Image formats", "Accessibility"],
      "html",
      "image"
    ),
    createModuleWithVideo(
      "html-mod-4",
      "HTML Tables & Forms",
      "Learn how to create tables for data presentation and forms for user input.",
      "3-4 hours",
      ["Table structure", "Form elements", "Input types", "Form validation", "Accessibility"],
      "html",
      "form"
    ),
    createModuleWithVideo(
      "html-mod-5",
      "HTML5 Semantic Elements & Media",
      "Explore HTML5 semantic elements and embedding media like audio and video.",
      "2-3 hours",
      ["Semantic structure", "Audio & video", "Embedding content", "HTML5 APIs"],
      "html",
      "semantic"
    ),
    createModuleWithVideo(
      "html-mod-6",
      "Final Project: Building a Complete HTML Website",
      "Apply everything you've learned to build a complete multi-page website using HTML.",
      "3-4 hours",
      ["Project planning", "Site structure", "Implementation", "Testing", "Validation"],
      "html",
      "project"
    )
  ];
};

// CSS modules
const getCSSModules = () => {
  return [
    createModuleWithVideo(
      "css-mod-1",
      "CSS Introduction & Selectors",
      "Get started with CSS by understanding its role in web development and learning about selectors.",
      "2-3 hours",
      ["CSS basics", "Adding CSS to HTML", "Selectors", "Specificity", "Cascade"],
      "css",
      "introduction"
    ),
    createModuleWithVideo(
      "css-mod-2",
      "CSS Box Model & Layout",
      "Learn about the CSS box model and various layout techniques.",
      "3-4 hours",
      ["Box model", "Margin & padding", "Border", "Display properties", "Positioning"],
      "css",
      "box"
    ),
    createModuleWithVideo(
      "css-mod-3",
      "CSS Typography & Colors",
      "Master styling text and using colors in your web pages.",
      "2-3 hours",
      ["Font properties", "Text styling", "Color formats", "Backgrounds", "Gradients"],
      "css",
      "typography"
    ),
    createModuleWithVideo(
      "css-mod-4",
      "CSS Flexbox & Grid",
      "Learn modern layout techniques with Flexbox and CSS Grid.",
      "3-4 hours",
      ["Flexbox container", "Flex items", "Grid container", "Grid items", "Responsive layouts"],
      "css",
      "flexbox"
    ),
    createModuleWithVideo(
      "css-mod-5",
      "CSS Transitions, Animations & Responsive Design",
      "Add movement to your designs and make them work on all devices.",
      "3-4 hours",
      ["Transitions", "Animations", "Media queries", "Responsive images", "Mobile-first design"],
      "css",
      "animation"
    ),
    createModuleWithVideo(
      "css-mod-6",
      "CSS Frameworks & Preprocessors",
      "Explore CSS frameworks and preprocessors to speed up development.",
      "2-3 hours",
      ["Bootstrap basics", "CSS variables", "SASS/SCSS", "CSS organization", "Best practices"],
      "css",
      "framework"
    ),
    createModuleWithVideo(
      "css-mod-7",
      "Final Project: Styling a Complete Website",
      "Apply everything you've learned to style a complete website with CSS.",
      "3-4 hours",
      ["Project planning", "Layout implementation", "Styling", "Responsive design", "Testing"],
      "css",
      "project"
    )
  ];
};

// JavaScript modules
const getJavaScriptModules = () => {
  return [
    createModuleWithVideo(
      "js-mod-1",
      "JavaScript Introduction & Setup",
      "Get started with JavaScript by understanding its role in web development and setting up your development environment.",
      "2-3 hours",
      ["JavaScript history", "Development tools", "Browser console", "First JavaScript program"],
      "javascript",
      "introduction"
    ),
    createModuleWithVideo(
      "js-mod-2",
      "JavaScript Syntax & Data Types",
      "Learn the basic syntax of JavaScript and understand the different data types available in the language.",
      "3-4 hours",
      ["Variables", "Data types", "Operators", "Type conversion"],
      "javascript",
      "syntax"
    ),
    createModuleWithVideo(
      "js-mod-3",
      "Control Flow & Functions",
      "Master control flow statements and learn how to create and use functions in JavaScript.",
      "3-4 hours",
      ["Conditionals", "Loops", "Function declaration", "Parameters & return values"],
      "javascript",
      "function"
    ),
    createModuleWithVideo(
      "js-mod-4",
      "Arrays & Objects",
      "Explore JavaScript's core data structures: arrays and objects, and learn how to manipulate them effectively.",
      "3-4 hours",
      ["Array methods", "Object properties", "Nested structures", "Destructuring"],
      "javascript",
      "data"
    ),
    createModuleWithVideo(
      "js-mod-5",
      "DOM Manipulation",
      "Learn how to interact with HTML using JavaScript by manipulating the Document Object Model (DOM).",
      "3-4 hours",
      ["Selecting elements", "Modifying content", "Event handling", "Creating elements"],
      "javascript",
      "dom"
    ),
    createModuleWithVideo(
      "js-mod-6",
      "Asynchronous JavaScript",
      "Understand how to work with asynchronous operations in JavaScript using callbacks, promises, and async/await.",
      "3-4 hours",
      ["Callbacks", "Promises", "Async/await", "Fetch API"],
      "javascript",
      "async"
    ),
    createModuleWithVideo(
      "js-mod-7",
      "Error Handling & Debugging",
      "Learn techniques for handling errors and debugging JavaScript code effectively.",
      "2-3 hours",
      ["Try/catch blocks", "Error types", "Browser DevTools", "Debugging techniques"],
      "javascript",
      "error"
    ),
    createModuleWithVideo(
      "js-mod-8",
      "Final Project: Interactive Web Application",
      "Apply everything you've learned to build a complete interactive web application using JavaScript.",
      "3-4 hours",
      ["Project planning", "Implementation", "Testing", "Deployment"],
      "javascript",
      "project"
    )
  ];
};

// Python modules
const getPythonModules = () => {
  return [
    createModuleWithVideo(
      "py-mod-1",
      "Python Introduction & Setup",
      "Get started with Python by understanding its philosophy and setting up your development environment.",
      "2-3 hours",
      ["Python philosophy", "Installation", "IDLE & editors", "First Python program"],
      "python",
      "introduction"
    ),
    createModuleWithVideo(
      "py-mod-2",
      "Python Syntax & Data Types",
      "Learn the basic syntax of Python and understand the different data types available in the language.",
      "3-4 hours",
      ["Variables", "Numbers & strings", "Lists & tuples", "Dictionaries & sets"],
      "python",
      "syntax"
    ),
    createModuleWithVideo(
      "py-mod-3",
      "Control Flow & Functions",
      "Master control flow statements and learn how to create and use functions in Python.",
      "3-4 hours",
      ["Conditionals", "Loops", "Function definition", "Parameters & return values"],
      "python",
      "function"
    ),
    createModuleWithVideo(
      "py-mod-4",
      "Working with Files & Exceptions",
      "Learn how to read from and write to files, and handle exceptions in Python.",
      "2-3 hours",
      ["File operations", "Reading & writing", "Exception handling", "Context managers"],
      "python",
      "file"
    ),
    createModuleWithVideo(
      "py-mod-5",
      "Modules & Packages",
      "Understand how to organize code using modules and packages, and use Python's standard library.",
      "2-3 hours",
      ["Creating modules", "Importing", "Standard library", "Third-party packages"],
      "python",
      "module"
    ),
    createModuleWithVideo(
      "py-mod-6",
      "Object-Oriented Programming",
      "Learn the principles of object-oriented programming and how to implement them in Python.",
      "3-4 hours",
      ["Classes & objects", "Inheritance", "Encapsulation", "Polymorphism"],
      "python",
      "oop"
    ),
    createModuleWithVideo(
      "py-mod-7",
      "Final Project: Command-Line Application",
      "Apply everything you've learned to build a complete command-line application using Python.",
      "3-4 hours",
      ["Project planning", "Implementation", "Testing", "Documentation"],
      "python",
      "project"
    )
  ];
};

// Function to create a module with video content
const createModuleWithVideo = (id, title, description, estimatedTime, topics, language, topicKeyword) => {
  // Get a video resource for this language and topic
  const videoResource = getVideoResource(language, topicKeyword);

  return {
    id,
    title,
    description,
    estimatedTime,
    topics,
    hasVideo: true,
    videoTitle: videoResource.title,
    videoDescription: videoResource.description,
    videoSource: videoResource.source,
    videoUrl: videoResource.url,
    videoDuration: videoResource.duration
  };
};

// Generic modules for languages without specific module definitions
const getGenericModules = (languageName) => {
  const language = languageName.toLowerCase();

  return [
    createModuleWithVideo(
      `generic-mod-1-${language.replace(/[^a-z0-9]/g, '-')}`,
      `${languageName} Introduction & Setup`,
      `Get started with ${languageName} by understanding its role and setting up your development environment.`,
      "2-3 hours",
      ["Language basics", "Development environment", "First program", "Syntax overview"],
      language,
      "introduction"
    ),
    createModuleWithVideo(
      `generic-mod-2-${language.replace(/[^a-z0-9]/g, '-')}`,
      `${languageName} Syntax & Data Types`,
      `Learn the basic syntax of ${languageName} and understand the different data types available in the language.`,
      "3-4 hours",
      ["Variables", "Data types", "Operators", "Type conversion"],
      language,
      "syntax"
    ),
    createModuleWithVideo(
      `generic-mod-3-${language.replace(/[^a-z0-9]/g, '-')}`,
      `Control Flow & Functions in ${languageName}`,
      `Master control flow statements and learn how to create and use functions in ${languageName}.`,
      "3-4 hours",
      ["Conditionals", "Loops", "Function declaration", "Parameters & return values"],
      language,
      "function"
    ),
    createModuleWithVideo(
      `generic-mod-4-${language.replace(/[^a-z0-9]/g, '-')}`,
      `Data Structures in ${languageName}`,
      `Explore ${languageName}'s core data structures and learn how to manipulate them effectively.`,
      "3-4 hours",
      ["Arrays/Lists", "Objects/Dictionaries", "Sets", "Maps"],
      language,
      "data"
    ),
    createModuleWithVideo(
      `generic-mod-5-${language.replace(/[^a-z0-9]/g, '-')}`,
      `Object-Oriented Programming in ${languageName}`,
      `Learn the principles of object-oriented programming and how to implement them in ${languageName}.`,
      "3-4 hours",
      ["Classes & objects", "Inheritance", "Encapsulation", "Polymorphism"],
      language,
      "oop"
    ),
    createModuleWithVideo(
      `generic-mod-6-${language.replace(/[^a-z0-9]/g, '-')}`,
      `Error Handling & Debugging in ${languageName}`,
      `Learn techniques for handling errors and debugging ${languageName} code effectively.`,
      "2-3 hours",
      ["Error types", "Try/catch blocks", "Debugging tools", "Debugging techniques"],
      language,
      "error"
    ),
    createModuleWithVideo(
      `generic-mod-7-${language.replace(/[^a-z0-9]/g, '-')}`,
      `Final Project: Building with ${languageName}`,
      `Apply everything you've learned to build a complete application using ${languageName}.`,
      "3-4 hours",
      ["Project planning", "Implementation", "Testing", "Deployment"],
      language,
      "project"
    )
  ];
};

export default getLanguageLearningPaths;
