const express = require('express');
const mongoose = require('mongoose');
const Post = mongoose.model('Post')
const router = express.Router();
const Author = mongoose.model('Author')

//part 1 of the API Endpoints - getting all posts
const getPosts = (req, res) => (
	Post.find({}, (err, data) => (
		res.json(data)
	)).populate('author')
)

//part 2 
//req.params.id = id #
const getPostById = (req, res) => (
	Post.findById(req.params.id, (err, data) => (
		res.json(data)
	)) 
)

//part 3 - sorting by date
const getPostByDate = (req, res) => (
	Post.find({}, (err, data) => (
		res.json(data)
	)).sort('-date') 
)

//part 4 - sorting titles Alphabetically 
const getPostAZ = (req, res) => (
	Post.find({}, (err, data) => (
		res.json(data)
		)).sort({title: 1})
)

//part 8 - find posts by tags
const getPostByTag = (req, res) => (
	Post.find({tags: 'react'}, (err, data) => (
		res.json(data)
	))
)

//part 10 - Post a new Blog Post
const postNew = (req, res) => (
	Post.create(req.body, (err, data) => {
		res.json(req.body)
		console.log('Post Added')
	})
)

//part 11 - Delete a blog post
const postDelete = (req, res) => (
	Post.findById(req.params.id).remove({}, (err, data) => (
		console.log('Post Deleted')
	))
)

//part 12 - Update Post
const postUpdate = (req, res) => (
	Post.findById(req.params.id).findOneAndUpdate({}, req.body, (err, data) => (
		console.log('Post Updated')
	))
)

router.route('/')
	.get(getPosts)
	.post(postNew)

router.route('/:id')
	.get(getPostById)
	.delete(postDelete)
	.put(postUpdate)

router.route('/sort/by-date')
	.get(getPostByDate)

router.route('/sort/a-z')
	.get(getPostAZ)

router.route('/tags/react')
	.get(getPostByTag)


module.exports = router;