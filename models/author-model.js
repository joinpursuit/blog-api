// const mongoose = require('mongoose');

// const authorSchema = mongoose.Schema({
//   name: {type: String, required: true}
// });

// module.exports = mongoose.model('Author', authorSchema);


//require mongoose 
const mongoose = require('mongoose');

//defines schema & passing it to moongose
const authorSchema = mongoose.Schema({
	name: {type: String, require:true}
});

//exports module & creates authors db schema
module.exports = mongoose.model('Author', authorSchema);