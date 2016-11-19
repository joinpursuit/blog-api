const mongoose = require('mongoose');

const authorSchema = mongoose.Schema({
  name: {type: String, required: true}
});

module.exports = mongoose.model('Author', authorSchema);
// mongoose.model('Author', authorSchema);