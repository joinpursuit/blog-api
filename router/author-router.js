const router = require('express').Router();

// const models = require('./models');
// const Author = models.Author;
const Author = require('../models').Author;

const getAuthors = (req, res) => {
	console.log("hello from slash author")
	Author.find({}, (err, data) => {
		if(err) {
			console.log('err getting authors');
			res.send('err getting authors')
		} else {
			console.log('success getting authors', data)
			res.send(data)
		}
	})
}

const getAuthorsByLetter = (req, res) => {
	Author.find({}).sort({name: 'asc'}).exec((err, data) => { 
		if(err) {
			res.send('error in getting authors alphabetically')
		} else {
			res.send(data)
		}
	})
}

const getSpecificAuthor = (req, res) => {
	console.log(req.params.id)
	Author.find({_id: req.params.id}, (err, data) => {
		if(err) {
			res.send('err getting author')
		} else {
			res.send(data)
		}
	})
}



// we are here at localhost:4321/api/author
router.route('/')
	.get(getAuthors)

router.route('/sort/a-z')
	.get(getAuthorsByLetter)

	router.route('/:id')
		.get(getSpecificAuthor)


//EXPORT ROUTER SO INDEX.JS CAN READ IT
module.exports = router;