const express = require('express');
const mongoose = require('mongoose');
const Author = mongoose.model('Author')
const router = express.Router();

const getAuthors = (req, res) => (
	Author.find({}, (err, data) => (
		res.json(data)
	))
)

const getAuthorsAZ = (req, res) => (
	Author.find({}, (err, data) => (
		res.json(data)
		)).sort({name: 1})
)

const getAuthorsById = (req, res) => (
	Author.findById(req.params.id, (err, data) => (
		res.json(data)
	)) 
)

router.route('/')
	.get(getAuthors)

router.route('/sort/a-z')
	.get(getAuthorsAZ)

router.route('/:id')
	.get(getAuthorsById)

module.exports = router;