const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  date: {type: Date, default: Date.now},
  author: mongoose.Schema.Types.ObjectId,
  tags: [String]
});

module.exports = mongoose.model('Post', postSchema);
