//requires mongoose
const mongoose = require('mongoose');
//def&connects schema to mongoose
const postSchema = mongoose.Schema({
  title: {type: String, required: true},
  body: {type: String, required: true},
  date: {type: Date, default: Date.now},
  author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
  tags: [String]
});


//makes post collect. usign PostSchema & exports
module.exports = mongoose.model('Post', postSchema);
