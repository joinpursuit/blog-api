// const models = require('./models');
// const Post = models.Post;
const router = require('express').Router();

const Post = require('../models').Post

const getPosts = (req, res) => {
	console.log("hello from post")
	Post.find({}, (err, data)=>{
		if(err) {
			console.log('there was an error getting posts');
			res.send('error finding posts')
		} else {
			console.log('success retrieving data', data)
			res.send(data)
			}
		})
}

const getPostId = (req, res) =>{
	console.log(req.params.id)
	Post.find({_id: req.params.id}, (err, data) =>{
		if(err) {
			console.log('there was an error getting data');
			res.send('there was an err')
		} else {
			console.log('success retrieving data', data)
			res.send(data)
			}
	})
}

const getSortedByDate = (req, res) => {
	Post.find({}).sort({date: 'asc'}).exec((err, data) => {
		if(err) {
			console.log('there was an error sorting');
			res.send('there was an error sorting')
		} else {
			console.log('success in date data sorting', data)
			res.send(data)
		}
	})
}

const getSortedByLetter = (req, res) => {
	Post.find({}).sort({title: 'asc'}).exec((err, data) => {
		if(err) {
			console.log('error in abc order');
			res.send('there was an error doing abc order')
		} else {
			console.log('success in abc sorting', data)
			res.send(data)
		}
	})
}

const getByTag = (req, res) => {
	Post.find({tags: "react"}, (err, data) => {
		if(err) {
			console.log('error in react tag')
			res.send(err)
		} else {
			console.log('success in getting tag', data)
			res.send(data)
		}
	})
}

const makePost = (req, res) => {
	Post.create(req.body , (err, data) =>
		err ? res.send(err) : res.send(data))
}

const deletePost = (req, res) => {
	Post.remove({_id: req.params.id}, (err, data) =>
		err ? res.send(err) : res.send(data))
}

const editPost = (req, res) => {
	Post.update({_id: req.params.id}, req.body, (err, data) => 
		err ? res.send(err) : res.status(200))
}


// we are here at localhost:4321/api/posts
router.route('/')
	.get(getPosts)
	.post(makePost)

router.route('/:id')
	.get(getPostId)
	.delete(deletePost)
	.put(editPost)

router.route('/sort/by-date')
	.get(getSortedByDate)

router.route('/sort/a-z')
	.get(getSortedByLetter)

router.route('/tags/react')
	.get(getByTag)



module.exports = router;