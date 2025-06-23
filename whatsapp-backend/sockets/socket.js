const { Server } = require("socket.io");

const users = new Map(); // userId -> socket.id

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log(`📡 Client connected: ${socket.id}`);

    // ✅ When a user comes online
    socket.on('user:online', (userId) => {
      users.set(userId, socket.id);
      socket.userId = userId;

      // 🔁 Notify others that this user is online
      socket.broadcast.emit('user:online', userId);

      // 📡 Send current online users to this newly connected user
      socket.emit('online:users', Array.from(users.keys()));
    });

    // ✅ Real-time chat
    socket.on('message:send', (data) => {
      const receiverSocket = users.get(data.receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit('message:receive', data);
      }
    });

    // ✅ Delivered
    socket.on('message:delivered', (data) => {
      const receiverSocket = users.get(data.receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit('message:delivered', data);
      }
    });

    // ✅ Seen
    socket.on('message:seen', (data) => {
      const receiverSocket = users.get(data.receiverId);
      if (receiverSocket) {
        io.to(receiverSocket).emit('message:seen', data);
      }
    });

    // ✅ Typing indicators
    socket.on('typing:start', ({ receiverId }) => {
      const receiverSocket = users.get(receiverId);
      if (receiverSocket && socket.userId) {
        io.to(receiverSocket).emit('typing:start', { senderId: socket.userId });
      }
    });

    socket.on('typing:stop', ({ receiverId }) => {
      const receiverSocket = users.get(receiverId);
      if (receiverSocket && socket.userId) {
        io.to(receiverSocket).emit('typing:stop', { senderId: socket.userId });
      }
    });

    // ✅ On disconnect
    socket.on('disconnect', () => {
      for (const [userId, socketId] of users.entries()) {
        if (socketId === socket.id) {
          users.delete(userId);
          io.emit('user:offline', userId);
          break;
        }
      }
      console.log(`📴 Client disconnected: ${socket.id}`);
    });
  });
};
