const router = require('express').Router();
const Author = require('mongoose').model('Author');

function getOneAuthor(req, res, next){
	Author.findById(req.params.id, function(err, data){
		res.send(data)
	})
}

function getByAlphabet(req,res, next){
	Author.find({}).sort({name:1}).exec(function(err, data) {
		res.send(data)
	})
}

function getAllAuthors(req, res, next){
	Author.find({}, function(err,data){
		res.send(data);
	})
}

router.route('/:id')
	.get(getOneAuthor)

router.route('/sort/a-z')
	.get(getByAlphabet)

router.route('/')
	.get(getAllAuthors)

module.exports = router;