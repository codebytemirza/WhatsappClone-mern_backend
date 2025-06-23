const Message = require('../models/Message');
const Conversation = require('../models/Conversation');

exports.sendMessage = async (req, res) => {
  try {
    const { receiverId, message, type } = req.body;
    const senderId = req.user._id;

    const newMessage = await Message.create({
      senderId, receiverId, message, type
    });

    // Update or create conversation
    await Conversation.findOneAndUpdate(
      { userId: senderId, contactId: receiverId },
      { lastMessage: message, $inc: { unreadCount: 1 } },
      { upsert: true, new: true }
    );

    res.status(201).json(newMessage);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const userId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: userId, receiverId: conversationId },
        { senderId: conversationId, receiverId: userId }
      ]
    }).sort({ timestamp: 1 });

    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
