const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  pseudo: {type: String, required: true},
  title: {type: String, required: true, maxLength: 60},
  content: { type: String},
  imageUrl: { type: String},
  likes: { type: Number},
  dislikes: { type: Number},
  usersLiked: { type: Array},
  usersDisliked: { type: Array}
});

module.exports = mongoose.model('Post', postSchema);