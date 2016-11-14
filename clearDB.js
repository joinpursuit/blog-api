const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/blog-api');
const db = mongoose.connection;
const models = require('./models');
const Post = models.Post;
const Author = models.Author;

db.on('open', () => {
  Post.remove({});
  Author.remove({});
  process.kill(0);
});
