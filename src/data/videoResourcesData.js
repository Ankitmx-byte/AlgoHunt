// Video resources for language learning modules
// Based on open source educational content from YouTube and other platforms

/**
 * Get all video resources
 * @returns {Array} - An array of all video resources
 */
export const getVideoResources = () => {
  return videoResources;
};

/**
 * Get a video resource for a specific programming language and topic
 * @param {string} language - The programming language (e.g., 'html', 'css', 'javascript')
 * @param {string} topic - The topic within the language (e.g., 'introduction', 'syntax', 'functions')
 * @returns {Object} - A video resource object with title, description, source, url, etc.
 */
export const getVideoResource = (language, topic) => {
  // Normalize inputs to lowercase for matching
  const lang = language.toLowerCase();
  const normalizedTopic = topic.toLowerCase();

  // Find matching video from our catalog
  const video = videoResources.find(v =>
    v.language === lang &&
    normalizedTopic.includes(v.topicKeyword)
  );

  // If no specific match is found, return a general video for the language
  if (!video) {
    return videoResources.find(v =>
      v.language === lang &&
      v.topicKeyword === 'general'
    ) || defaultVideo;
  }

  return video;
};

// Default video to return if no match is found
const defaultVideo = {
  title: "Introduction to Programming",
  description: "A general introduction to programming concepts and principles that apply to all languages.",
  source: "freeCodeCamp.org",
  url: "https://www.youtube.com/embed/zOjov-2OZ0E",
  duration: "2 hours 12 minutes",
  thumbnail: "https://img.youtube.com/vi/zOjov-2OZ0E/maxresdefault.jpg",
  language: "general",
  topicKeyword: "introduction"
};

// Catalog of video resources
const videoResources = [
  // HTML Videos
  {
    title: "HTML Crash Course For Absolute Beginners",
    description: "Learn HTML in this crash course for beginners. This tutorial covers all the basics of HTML including document structure, elements, attributes, and more.",
    source: "Traversy Media",
    url: "https://www.youtube.com/embed/UB1O30fR-EE",
    duration: "1 hour",
    thumbnail: "https://img.youtube.com/vi/UB1O30fR-EE/maxresdefault.jpg",
    language: "html",
    topicKeyword: "introduction"
  },
  {
    title: "HTML Full Course - Build a Website Tutorial",
    description: "Learn HTML in this complete course for beginners. This course teaches HTML from scratch, showing you how to create a complete website.",
    source: "freeCodeCamp.org",
    url: "https://www.youtube.com/embed/pQN-pnXPaVg",
    duration: "2 hours",
    thumbnail: "https://img.youtube.com/vi/pQN-pnXPaVg/maxresdefault.jpg",
    language: "html",
    topicKeyword: "general"
  },
  {
    title: "HTML Forms Tutorial",
    description: "Learn how to create forms in HTML, including different input types, form validation, and best practices.",
    source: "The Net Ninja",
    url: "https://www.youtube.com/embed/YwbIeMlxZAU",
    duration: "20 minutes",
    thumbnail: "https://img.youtube.com/vi/YwbIeMlxZAU/maxresdefault.jpg",
    language: "html",
    topicKeyword: "form"
  },
  {
    title: "HTML Tables Tutorial",
    description: "Learn how to create and style tables in HTML for presenting tabular data effectively.",
    source: "Dani Krossing",
    url: "https://www.youtube.com/embed/LGQuIIv2RVA",
    duration: "18 minutes",
    thumbnail: "https://img.youtube.com/vi/LGQuIIv2RVA/maxresdefault.jpg",
    language: "html",
    topicKeyword: "table"
  },
  {
    title: "HTML Semantic Elements Tutorial",
    description: "Learn about semantic HTML elements and how they improve accessibility and SEO of your web pages.",
    source: "Web Dev Simplified",
    url: "https://www.youtube.com/embed/QDF7WEIb5hw",
    duration: "12 minutes",
    thumbnail: "https://img.youtube.com/vi/QDF7WEIb5hw/maxresdefault.jpg",
    language: "html",
    topicKeyword: "semantic"
  },

  // CSS Videos
  {
    title: "CSS Crash Course For Absolute Beginners",
    description: "Learn CSS in this crash course for beginners. This tutorial covers all the basics of CSS including selectors, properties, the box model, and more.",
    source: "Traversy Media",
    url: "https://www.youtube.com/embed/yfoY53QXEnI",
    duration: "1 hour 25 minutes",
    thumbnail: "https://img.youtube.com/vi/yfoY53QXEnI/maxresdefault.jpg",
    language: "css",
    topicKeyword: "introduction"
  },
  {
    title: "CSS Full Course - Learn CSS in 11 Hours",
    description: "A comprehensive CSS course covering everything from basics to advanced concepts like animations, flexbox, and grid.",
    source: "freeCodeCamp.org",
    url: "https://www.youtube.com/embed/n4R2E7O-Ngo",
    duration: "11 hours 3 minutes",
    thumbnail: "https://img.youtube.com/vi/n4R2E7O-Ngo/maxresdefault.jpg",
    language: "css",
    topicKeyword: "general"
  },
  {
    title: "CSS Flexbox Tutorial",
    description: "Learn how to use CSS Flexbox to create flexible and responsive layouts for your websites.",
    source: "The Net Ninja",
    url: "https://www.youtube.com/embed/JJSoEo8JSnc",
    duration: "46 minutes",
    thumbnail: "https://img.youtube.com/vi/JJSoEo8JSnc/maxresdefault.jpg",
    language: "css",
    topicKeyword: "flexbox"
  },
  {
    title: "CSS Grid Tutorial",
    description: "Learn how to use CSS Grid to create complex layouts with ease. This tutorial covers all the grid properties and techniques.",
    source: "Web Dev Simplified",
    url: "https://www.youtube.com/embed/9zBsdzdE4sM",
    duration: "22 minutes",
    thumbnail: "https://img.youtube.com/vi/9zBsdzdE4sM/maxresdefault.jpg",
    language: "css",
    topicKeyword: "grid"
  },
  {
    title: "CSS Animations Tutorial",
    description: "Learn how to create animations in CSS using keyframes and transitions to bring your websites to life.",
    source: "Dev Ed",
    url: "https://www.youtube.com/embed/zHUpx90NerM",
    duration: "30 minutes",
    thumbnail: "https://img.youtube.com/vi/zHUpx90NerM/maxresdefault.jpg",
    language: "css",
    topicKeyword: "animation"
  },

  // JavaScript Videos
  {
    title: "JavaScript Crash Course For Beginners",
    description: "Learn JavaScript fundamentals in this crash course for beginners. This tutorial will teach you the basics of JavaScript including variables, functions, objects, arrays, and more.",
    source: "Traversy Media",
    url: "https://www.youtube.com/embed/hdI2bqOjy3c",
    duration: "1 hour 40 minutes",
    thumbnail: "https://img.youtube.com/vi/hdI2bqOjy3c/maxresdefault.jpg",
    language: "javascript",
    topicKeyword: "introduction"
  },
  {
    title: "JavaScript Full Course for Beginners",
    description: "A comprehensive JavaScript course covering everything from basics to advanced concepts like asynchronous programming and ES6+ features.",
    source: "freeCodeCamp.org",
    url: "https://www.youtube.com/embed/PkZNo7MFNFg",
    duration: "3 hours 26 minutes",
    thumbnail: "https://img.youtube.com/vi/PkZNo7MFNFg/maxresdefault.jpg",
    language: "javascript",
    topicKeyword: "general"
  },
  {
    title: "JavaScript DOM Manipulation",
    description: "Learn how to manipulate the Document Object Model (DOM) with JavaScript to create dynamic web pages.",
    source: "The Net Ninja",
    url: "https://www.youtube.com/embed/FIORjGvT0kk",
    duration: "38 minutes",
    thumbnail: "https://img.youtube.com/vi/FIORjGvT0kk/maxresdefault.jpg",
    language: "javascript",
    topicKeyword: "dom"
  },
  {
    title: "JavaScript Async/Await Tutorial",
    description: "Learn how to use async/await in JavaScript to handle asynchronous operations in a cleaner and more readable way.",
    source: "Web Dev Simplified",
    url: "https://www.youtube.com/embed/V_Kr9OSfDeU",
    duration: "15 minutes",
    thumbnail: "https://img.youtube.com/vi/V_Kr9OSfDeU/maxresdefault.jpg",
    language: "javascript",
    topicKeyword: "async"
  },
  {
    title: "JavaScript ES6 Tutorial",
    description: "Learn about the modern features of JavaScript introduced in ES6 (ECMAScript 2015) and beyond.",
    source: "Programming with Mosh",
    url: "https://www.youtube.com/embed/NCwa_xi0Uuc",
    duration: "1 hour",
    thumbnail: "https://img.youtube.com/vi/NCwa_xi0Uuc/maxresdefault.jpg",
    language: "javascript",
    topicKeyword: "es6"
  },

  // Python Videos
  {
    title: "Python Tutorial for Beginners",
    description: "Learn Python in this full course for beginners. This course will take you from zero to hero in Python programming.",
    source: "Programming with Mosh",
    url: "https://www.youtube.com/embed/_uQrJ0TkZlc",
    duration: "6 hours 14 minutes",
    thumbnail: "https://img.youtube.com/vi/_uQrJ0TkZlc/maxresdefault.jpg",
    language: "python",
    topicKeyword: "introduction"
  },
  {
    title: "Python Full Course for Beginners",
    description: "A comprehensive Python course covering everything from basics to advanced concepts like object-oriented programming and file handling.",
    source: "freeCodeCamp.org",
    url: "https://www.youtube.com/embed/rfscVS0vtbw",
    duration: "4 hours 27 minutes",
    thumbnail: "https://img.youtube.com/vi/rfscVS0vtbw/maxresdefault.jpg",
    language: "python",
    topicKeyword: "general"
  },
  {
    title: "Python Functions Tutorial",
    description: "Learn how to create and use functions in Python to organize your code and make it more reusable.",
    source: "Corey Schafer",
    url: "https://www.youtube.com/embed/9Os0o3wzS_I",
    duration: "26 minutes",
    thumbnail: "https://img.youtube.com/vi/9Os0o3wzS_I/maxresdefault.jpg",
    language: "python",
    topicKeyword: "function"
  },
  {
    title: "Python OOP Tutorial",
    description: "Learn object-oriented programming in Python with classes, objects, inheritance, and more.",
    source: "Corey Schafer",
    url: "https://www.youtube.com/embed/ZDa-Z5JzLYM",
    duration: "1 hour 10 minutes",
    thumbnail: "https://img.youtube.com/vi/ZDa-Z5JzLYM/maxresdefault.jpg",
    language: "python",
    topicKeyword: "oop"
  },
  {
    title: "Python Data Science Tutorial",
    description: "Learn how to use Python for data science with libraries like NumPy, Pandas, and Matplotlib.",
    source: "Keith Galli",
    url: "https://www.youtube.com/embed/vmEHCJofslg",
    duration: "1 hour 39 minutes",
    thumbnail: "https://img.youtube.com/vi/vmEHCJofslg/maxresdefault.jpg",
    language: "python",
    topicKeyword: "data"
  }
];

export default getVideoResource;
