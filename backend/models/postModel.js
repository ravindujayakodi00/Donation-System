const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  postCaption: String,
  postImageUrl: String,
  createdDate: {
    type: Date,
    default: Date.now
  },
  commentIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment'
  }],
  userIds: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
