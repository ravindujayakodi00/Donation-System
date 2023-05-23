const Post = require('../models/postModel');

exports.createPost = async (req, res) => {
  try {
    const { postCaption, postImageUrl } = req.body;
    const post = await Post.create({ postCaption, postImageUrl });
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create a post' });
  }
};


exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve posts' });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve the post' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ error: 'Post not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update the post' });
  }
};

exports.deletePostById = async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id);
      if (post) {  
        res.json({ message: 'Post deleted successfully' });
      } else {
        res.status(404).json({ error: 'Post not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete the post' });
    }
  };