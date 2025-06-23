const mongoose = require('mongoose');

const conversationSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  contactId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  lastMessage: { type: String },
  unreadCount: { type: Number, default: 0 }
}, { timestamps: true });

module.exports = mongoose.model('Conversation', conversationSchema);
