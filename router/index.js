//handle the routers, to send it back to the server
//each model has its own router

const router = require('express').Router();
//const authorRouter = require('./author-router');
//const postRouter = require('./post-router');
const Post = require('../models').Post

const getPostsWithAuthor = (req, res) => {
	Post.find({}).populate('author').exec((err, data) => {
	err ? res.send(err) : res.send(data)
	})
}

//we are at /api 
router.route('/posts-with-authors')
	.get(getPostsWithAuthor)

router.use('/posts', require('./post-router'));
router.use('/authors', require('./author-router'));
//router.use('/post-with-authors');

module.exports = router;