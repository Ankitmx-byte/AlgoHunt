const socketIo = require('socket.io');
const { v4: uuidv4 } = require('uuid');

// Store for active users in matchmaking queue
const matchmakingQueue = {
  easy: [],
  medium: [],
  hard: []
};

// Store for active battles
const activeBattles = {};

// Store for user socket mappings
const userSockets = {};

// Store for pending matches
const pendingMatches = {};

// Initialize Socket.io server
function initializeSocketServer(server) {
  const io = socketIo(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST"],
      credentials: true
    }
  });

  // Middleware to authenticate users
  io.use((socket, next) => {
    // In a real app, you would verify the user's token here
    // For demo purposes, we'll assume the user is authenticated
    const userId = socket.handshake.auth.userId || `user_${uuidv4()}`;
    socket.userId = userId;
    userSockets[userId] = socket.id;
    next();
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Handle find match request
    socket.on('find_match', (data) => {
      const { difficulty, category, language } = data;
      const userId = socket.userId;
      
      // Create user profile for matchmaking
      const userProfile = {
        userId,
        socketId: socket.id,
        difficulty,
        category,
        language,
        rating: getUserRating(userId), // Function to get user's rating
        joinedAt: Date.now()
      };
      
      // Add user to matchmaking queue
      addToMatchmakingQueue(userProfile);
      
      // Update queue position for all users in this difficulty
      updateQueuePositions(difficulty);
      
      // Try to find a match
      findMatch(difficulty);
    });

    // Handle match acceptance
    socket.on('accept_match', () => {
      const userId = socket.userId;
      
      // Check if user has a pending match
      if (pendingMatches[userId]) {
        const match = pendingMatches[userId];
        
        // Check if both users accepted
        if (match.user1Accepted || match.user2Accepted) {
          // If the other user already accepted, start the battle
          startBattle(match);
        } else {
          // Mark this user as accepted
          if (match.user1 === userId) {
            match.user1Accepted = true;
          } else {
            match.user2Accepted = true;
          }
        }
      }
    });

    // Handle match decline
    socket.on('decline_match', () => {
      const userId = socket.userId;
      
      // Check if user has a pending match
      if (pendingMatches[userId]) {
        const match = pendingMatches[userId];
        
        // Get the other user
        const otherUserId = match.user1 === userId ? match.user2 : match.user1;
        
        // Notify the other user that the match was declined
        if (userSockets[otherUserId]) {
          io.to(userSockets[otherUserId]).emit('match_declined');
        }
        
        // Remove the pending match
        delete pendingMatches[userId];
        delete pendingMatches[otherUserId];
      }
    });

    // Handle cancel matchmaking
    socket.on('cancel_matchmaking', () => {
      const userId = socket.userId;
      
      // Remove user from all queues
      Object.keys(matchmakingQueue).forEach(difficulty => {
        matchmakingQueue[difficulty] = matchmakingQueue[difficulty].filter(user => user.userId !== userId);
        
        // Update queue positions
        updateQueuePositions(difficulty);
      });
    });

    // Handle join battle
    socket.on('join_battle', (data) => {
      const { battleId } = data;
      const userId = socket.userId;
      
      // Check if battle exists
      if (activeBattles[battleId]) {
        const battle = activeBattles[battleId];
        
        // Add user to battle room
        socket.join(battleId);
        
        // Send battle data to user
        socket.emit('battle_started', {
          battleId,
          problem: battle.problem,
          testCases: battle.testCases,
          opponent: battle.user1 === userId ? battle.user2Profile : battle.user1Profile
        });
      } else {
        socket.emit('error', { message: 'Battle not found' });
      }
    });

    // Handle code submission
    socket.on('submit_code', (data) => {
      const { code, language } = data;
      const userId = socket.userId;
      
      // Find the battle this user is in
      const battleId = findUserBattle(userId);
      
      if (battleId) {
        // In a real app, you would send the code to Judge0 for evaluation
        // For demo purposes, we'll simulate the evaluation
        
        // Simulate evaluation delay
        setTimeout(() => {
          // Notify user of results
          socket.emit('submission_results', {
            passed: true,
            results: [
              { testCase: 1, passed: true, output: 'Expected output' },
              { testCase: 2, passed: true, output: 'Expected output' }
            ]
          });
          
          // Check if all test cases passed
          const allPassed = true;
          
          if (allPassed) {
            // User completed the challenge
            completeBattle(battleId, userId);
          }
        }, 2000);
      }
    });

    // Handle progress update
    socket.on('update_progress', (data) => {
      const { progress } = data;
      const userId = socket.userId;
      
      // Find the battle this user is in
      const battleId = findUserBattle(userId);
      
      if (battleId) {
        const battle = activeBattles[battleId];
        
        // Get the other user
        const otherUserId = battle.user1 === userId ? battle.user2 : battle.user1;
        
        // Send progress update to the other user
        if (userSockets[otherUserId]) {
          io.to(userSockets[otherUserId]).emit('opponent_progress', {
            progress
          });
        }
      }
    });

    // Handle disconnection
    socket.on('disconnect', () => {
      const userId = socket.userId;
      
      // Remove user from matchmaking queues
      Object.keys(matchmakingQueue).forEach(difficulty => {
        matchmakingQueue[difficulty] = matchmakingQueue[difficulty].filter(user => user.userId !== userId);
        
        // Update queue positions
        updateQueuePositions(difficulty);
      });
      
      // Check if user has a pending match
      if (pendingMatches[userId]) {
        const match = pendingMatches[userId];
        
        // Get the other user
        const otherUserId = match.user1 === userId ? match.user2 : match.user1;
        
        // Notify the other user that the match was declined
        if (userSockets[otherUserId]) {
          io.to(userSockets[otherUserId]).emit('match_declined');
        }
        
        // Remove the pending match
        delete pendingMatches[userId];
        delete pendingMatches[otherUserId];
      }
      
      // Check if user is in an active battle
      const battleId = findUserBattle(userId);
      
      if (battleId) {
        const battle = activeBattles[battleId];
        
        // Get the other user
        const otherUserId = battle.user1 === userId ? battle.user2 : battle.user1;
        
        // Notify the other user that the opponent disconnected
        if (userSockets[otherUserId]) {
          io.to(userSockets[otherUserId]).emit('opponent_disconnected');
        }
        
        // End the battle
        delete activeBattles[battleId];
      }
      
      // Remove user socket mapping
      delete userSockets[userId];
      
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  // Helper functions
  
  // Add user to matchmaking queue
  function addToMatchmakingQueue(userProfile) {
    const { difficulty, userId } = userProfile;
    
    // Remove user from all queues first (in case they're already in a queue)
    Object.keys(matchmakingQueue).forEach(diff => {
      matchmakingQueue[diff] = matchmakingQueue[diff].filter(user => user.userId !== userId);
    });
    
    // Add user to the appropriate queue
    matchmakingQueue[difficulty].push(userProfile);
    
    console.log(`User ${userId} added to ${difficulty} queue. Queue size: ${matchmakingQueue[difficulty].length}`);
  }
  
  // Update queue positions for all users in a difficulty
  function updateQueuePositions(difficulty) {
    matchmakingQueue[difficulty].forEach((user, index) => {
      if (userSockets[user.userId]) {
        io.to(userSockets[user.userId]).emit('queue_position', {
          position: index + 1,
          totalUsers: matchmakingQueue[difficulty].length
        });
      }
    });
  }
  
  // Find a match for users in a difficulty queue
  function findMatch(difficulty) {
    // Need at least 2 users to make a match
    if (matchmakingQueue[difficulty].length < 2) {
      return;
    }
    
    // Sort queue by join time (first come, first served)
    matchmakingQueue[difficulty].sort((a, b) => a.joinedAt - b.joinedAt);
    
    // Get the first two users
    const user1 = matchmakingQueue[difficulty][0];
    const user2 = matchmakingQueue[difficulty][1];
    
    // Calculate skill match percentage (in a real app, this would be more sophisticated)
    const matchPercentage = calculateMatchPercentage(user1, user2);
    
    // Create match
    const match = {
      user1: user1.userId,
      user2: user2.userId,
      user1Profile: {
        username: `User_${user1.userId.substring(0, 5)}`,
        rating: user1.rating,
        winRate: `${Math.floor(Math.random() * 30) + 50}%`,
        preferredLanguage: user1.language,
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
      },
      user2Profile: {
        username: `User_${user2.userId.substring(0, 5)}`,
        rating: user2.rating,
        winRate: `${Math.floor(Math.random() * 30) + 50}%`,
        preferredLanguage: user2.language,
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
      },
      difficulty,
      category: user1.category, // Use first user's category preference
      matchPercentage,
      createdAt: Date.now(),
      user1Accepted: false,
      user2Accepted: false
    };
    
    // Add to pending matches
    pendingMatches[user1.userId] = match;
    pendingMatches[user2.userId] = match;
    
    // Remove users from queue
    matchmakingQueue[difficulty] = matchmakingQueue[difficulty].filter(
      user => user.userId !== user1.userId && user.userId !== user2.userId
    );
    
    // Update queue positions
    updateQueuePositions(difficulty);
    
    // Notify users of match
    if (userSockets[user1.userId]) {
      io.to(userSockets[user1.userId]).emit('match_found', {
        opponent: match.user2Profile,
        matchPercentage
      });
    }
    
    if (userSockets[user2.userId]) {
      io.to(userSockets[user2.userId]).emit('match_found', {
        opponent: match.user1Profile,
        matchPercentage
      });
    }
    
    console.log(`Match created between ${user1.userId} and ${user2.userId}`);
    
    // Check for more possible matches
    findMatch(difficulty);
  }
  
  // Start a battle between two users
  function startBattle(match) {
    const { user1, user2, difficulty, category } = match;
    
    // Generate battle ID
    const battleId = `battle_${uuidv4()}`;
    
    // Get problem based on difficulty and category
    const problem = getProblem(difficulty, category);
    
    // Get test cases
    const testCases = getTestCases(problem.id);
    
    // Create battle
    activeBattles[battleId] = {
      id: battleId,
      user1,
      user2,
      user1Profile: match.user1Profile,
      user2Profile: match.user2Profile,
      problem,
      testCases,
      startTime: Date.now(),
      timeLimit: 600, // 10 minutes in seconds
      status: 'active'
    };
    
    // Add users to battle room
    if (userSockets[user1]) {
      io.sockets.sockets.get(userSockets[user1]).join(battleId);
    }
    
    if (userSockets[user2]) {
      io.sockets.sockets.get(userSockets[user2]).join(battleId);
    }
    
    // Notify users that battle has started
    io.to(battleId).emit('battle_started', {
      battleId,
      problem,
      testCases
    });
    
    // Remove from pending matches
    delete pendingMatches[user1];
    delete pendingMatches[user2];
    
    console.log(`Battle ${battleId} started between ${user1} and ${user2}`);
    
    // Set timeout to end battle after time limit
    setTimeout(() => {
      // Check if battle is still active
      if (activeBattles[battleId] && activeBattles[battleId].status === 'active') {
        // End battle due to time limit
        endBattle(battleId, null);
      }
    }, 1800 * 1000);
  }
  
  // Complete a battle when a user solves the problem
  function completeBattle(battleId, winnerId) {
    if (activeBattles[battleId]) {
      const battle = activeBattles[battleId];

      // End the battle
      endBattle(battleId, winnerId);
    }
  }
  
  // End a battle
  function endBattle(battleId, winnerId) {
    if (activeBattles[battleId]) {
      const battle = activeBattles[battleId];
      
      // Get the loser
      const loserId = battle.user1 === winnerId ? battle.user2 : battle.user1;
      
      // Notify users of battle results
