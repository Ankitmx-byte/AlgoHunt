const { ChatbotKnowledge } = require('../models/Chatbot');
const natural = require('natural');
const { removeStopwords } = require('stopword');

// Initialize NLP tools
const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;
const classifier = new natural.BayesClassifier();

// Initialize TF-IDF for document similarity
const TfIdf = natural.TfIdf;
const tfidf = new TfIdf();

// Context management
const sessionContexts = new Map();

// Initialize the chatbot with knowledge
const initializeChatbot = async () => {
  try {
    // Load knowledge base from database
    const knowledgeBase = await ChatbotKnowledge.find();
    
    // Train the classifier with knowledge base
    knowledgeBase.forEach(item => {
      // Add question to classifier with its category as the label
      classifier.addDocument(item.question, item.category);
      
      // Add keywords to classifier
      item.keywords.forEach(keyword => {
        classifier.addDocument(keyword, item.category);
      });
      
      // Add document to TF-IDF for similarity search
      tfidf.addDocument(`${item.topic} ${item.question} ${item.answer} ${item.keywords.join(' ')}`);
    });
    
    // Train the classifier
    classifier.train();
    
    console.log('Chatbot initialized with knowledge base');
  } catch (error) {
    console.error('Error initializing chatbot:', error);
  }
};

// Process user message
const processMessage = async (message) => {
  // Tokenize and normalize the message
  const tokens = tokenizer.tokenize(message.toLowerCase());
  const filteredTokens = removeStopwords(tokens);
  const stems = filteredTokens.map(token => stemmer.stem(token));
  
  // Classify the intent
  let intent = 'unknown';
  let confidence = 0;
  
  try {
    const classification = classifier.getClassifications(message);
    if (classification.length > 0 && classification[0].value > 0.3) {
      intent = classification[0].label;
      confidence = classification[0].value;
    }
  } catch (error) {
    console.error('Error classifying message:', error);
  }
  
  // Extract entities (simple implementation)
  const entities = [];
  
  // Common programming languages
  const programmingLanguages = ['javascript', 'python', 'java', 'c++', 'ruby', 'php', 'go', 'rust', 'swift'];
  programmingLanguages.forEach(lang => {
    if (message.toLowerCase().includes(lang)) {
      entities.push({
        entity: 'programming_language',
        value: lang
      });
    }
  });
  
  // Data structure entities
  const dataStructures = ['array', 'linked list', 'stack', 'queue', 'tree', 'graph', 'hash table', 'heap'];
  dataStructures.forEach(ds => {
    if (message.toLowerCase().includes(ds)) {
      entities.push({
        entity: 'data_structure',
        value: ds
      });
    }
  });
  
  // Algorithm entities
  const algorithms = ['sorting', 'searching', 'recursion', 'dynamic programming', 'greedy', 'backtracking'];
  algorithms.forEach(algo => {
    if (message.toLowerCase().includes(algo)) {
      entities.push({
        entity: 'algorithm',
        value: algo
      });
    }
  });
  
  // App feature entities
  const features = ['battle', 'tournament', 'learning path', 'achievement', 'profile', 'resume', 'interview'];
  features.forEach(feature => {
    if (message.toLowerCase().includes(feature)) {
      entities.push({
        entity: 'feature',
        value: feature
      });
    }
  });
  
  return {
    tokens,
    stems,
    intent,
    confidence,
    entities,
    context: {}
  };
};

// Generate response based on processed message
const generateResponse = async (processedMessage, sessionId, user) => {
  // Get or initialize session context
  let context = sessionContexts.get(sessionId) || {};
  
  // Update context with new information
  context = {
    ...context,
    lastIntent: processedMessage.intent,
    entities: [...(context.entities || []), ...processedMessage.entities]
  };
  
  // Store updated context
  sessionContexts.set(sessionId, context);
  
  // Find relevant knowledge
  let response = {
    message: "I'm sorry, I don't have information about that yet. I'm still learning!",
    intent: processedMessage.intent,
    confidence: processedMessage.confidence,
    context,
    suggestions: []
  };
  
  try {
    // Search for relevant knowledge
    const searchQuery = processedMessage.tokens.join(' ');
    
    // First try exact match with entities
    let knowledgeItems = [];
    
    if (processedMessage.entities.length > 0) {
      const entityValues = processedMessage.entities.map(e => e.value);
      knowledgeItems = await ChatbotKnowledge.find({
        $or: [
          { keywords: { $in: entityValues } },
          { topic: { $in: entityValues } }
        ]
      }).limit(3);
    }
    
    // If no exact matches, use text search
    if (knowledgeItems.length === 0) {
      knowledgeItems = await ChatbotKnowledge.find(
        { $text: { $search: searchQuery } },
        { score: { $meta: "textScore" } }
      )
      .sort({ score: { $meta: "textScore" } })
      .limit(3);
    }
    
    // Generate response from knowledge
    if (knowledgeItems.length > 0) {
      // Use the most relevant knowledge item
      const bestMatch = knowledgeItems[0];
      response.message = bestMatch.answer;
      
      // Add related topics as suggestions
      if (bestMatch.relatedTopics && bestMatch.relatedTopics.length > 0) {
        response.suggestions = bestMatch.relatedTopics.map(topic => ({
          text: `Tell me about ${topic}`,
          value: topic
        }));
      }
      
      // Add other knowledge items as suggestions
      if (knowledgeItems.length > 1) {
        knowledgeItems.slice(1).forEach(item => {
          response.suggestions.push({
            text: item.question,
            value: item.question
          });
        });
      }
    } else {
      // Fallback responses based on intent
      switch (processedMessage.intent) {
        case 'greeting':
          response.message = "Hello! I'm AlgoBot, your coding assistant. How can I help you today?";
          response.suggestions = [
            { text: "Tell me about AlgoHunt", value: "What is AlgoHunt?" },
            { text: "How do coding battles work?", value: "How do coding battles work?" },
            { text: "Learning paths", value: "What are learning paths?" }
          ];
          break;
          
        case 'farewell':
          response.message = "Goodbye! Feel free to come back if you have more questions.";
          break;
          
        case 'help':
          response.message = "I can help you with information about coding concepts, algorithms, data structures, and features of AlgoHunt. What would you like to know?";
          response.suggestions = [
            { text: "Data structures", value: "Tell me about data structures" },
            { text: "Algorithms", value: "Explain algorithms" },
            { text: "Features", value: "What features does AlgoHunt have?" }
          ];
          break;
          
        default:
          // Keep default "I don't know" response
          response.suggestions = [
            { text: "Learning paths", value: "What are learning paths?" },
            { text: "Coding battles", value: "How do coding battles work?" },
            { text: "Algorithms", value: "Tell me about algorithms" }
          ];
      }
    }
  } catch (error) {
    console.error('Error generating response:', error);
  }
  
  return response;
};

module.exports = {
  initializeChatbot,
  processMessage,
  generateResponse
};
