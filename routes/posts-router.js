const router = require('express').Router();
const Post = require('mongoose').model('Post')

function deleteOnePost(req,res,next){
	Post.findById(req.params.id).remove({}, (err, data) => (
		console.log('POST DELETED')
	))
}

function createPost(req,res,next){
	Post.create(req.body, (err, data) => {
		res.send(data)
    	//console.log('Created new post!');
  	});
}

function postWithAuthor(req,res,next){
	Post.find({}).populate('author').exec(function(err, data) {
		res.send(data)
	})

}

function findTag(req,res,next){
	Post.find({tags:"react"},function(err,data){
		res.send(data)
	})
}

function getByAlphabet(req,res, next){
	Post.find({}).sort({title:1}).exec(function(err, data) {
		res.send(data)
	})

	// Post.find({}, (err, data) => (
 //      res.send(data)
	// )).sort({title:1})
}

function getByDate(re,res, next){
	Post.find({}).sort('-date').exec(function(err,data){
		res.send(data)
	})
}

function getAllPosts(req, res, next){
	Post.find({}, function(err,data){
		res.send(data);
	})
}

function getOnePost(req, res, next){
	Post.findById(req.params.id, function(err, data){
		res.send(data)
	})
}

router.route('/posts-with-authors')
	.get(postWithAuthor)

router.route('/tags/react')
	.get(findTag)

router.route('/sort/a-z')
	.get(getByAlphabet)

router.route('/sort/by-date')
	.get(getByDate)

router.route('/:id')
	.get(getOnePost)
	.delete(deleteOnePost)

router.route('/')
	.get(getAllPosts)
	.post(createPost)

module.exports = router;