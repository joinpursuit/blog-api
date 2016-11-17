const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./models');
const Post = models.Post;
const Author = models.Author;

mongoose.connect('mongodb://localhost/blog-api');

const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));

//////////
//Your code here:
//////////

//Finds all posts inside our database
app.get('/api/posts', (req, res) => {
	Post.find( {}, (err, data) => {
		err ? res.send(err) : res.send(data);
	});
});

//Finds a post by its specific id
app.get('/api/posts/:id', (req, res) => {
	Post.findById( req.params.id, (err, data) => {
		err ? res.send(err) : res.send(data);
	});
});

//Finds and lists all blog posts and orders by date
app.get('/api/posts/sort/by-date', (req, res) => {
	Post.find({}).sort({date: 'asc'}).exec( (err, data) => {
		err ? res.send(err) : res.send(data);
	});
});

//Finds and lists all blog posts alphabetically by title
app.get('/api/posts/sort/a-z', (req, res) => {
	Post.find({}).sort({title: 'asc'}).exec( (err, data) => {
		err ? res.send(err) : res.send(data);
	});
});

//Finds and lists all authors
app.get('/api/authors', (req, res) =>{
	Author.find({}, (err, data) => {
		err ? res.send(err) : res.send(data);
	});
});

//Finds and lists all authors alphabetically
app.get('/api/authors/sort/a-z', (req, res) => {
	Author.find({}).sort({name: 'asc'}).exec( (err, data) => {
		err ? res.send(err) : res.send(data);
	});
});

//Finds author by id
app.get('/api/authors/:id', (req, res) => {
	Author.findById( req.params.id, (err, data) => {
		err ? res.send(err) : res.send(data);
	});
});

//Find posts that have the react tag
app.get('/api/posts/tags/react', (req, res) => {
	Post.find({tags: "react"}, (err, data) => {
		err ? res.send(err) : res.send(data);
	});
});

//Finds all posts AND includes their full author info
app.get('/api/posts-with-authors', (req, res) => {

	Post.find({}).populate('author').exec( (err, data) => {

		err ? res.send(err) : res.send(data);

	});
});

//Posts a new blog post
app.post('/api/posts', (req, res) => {
	Post.create( req.body , (err, data) => {
		err ? res.send(err) : res.send("Post created!", data)
	});
});

app.delete('/api/posts/:id', (req, res) => {
	Post.remove({_id: req.params.id}, (err, data) => {
		err ? res.send(err) : res.send("Post sucessfully deleted")
	});
});

app.put('/api/posts/:id', (req, res) => {
	Post.findOneAndUpdate( { _id: req.params.id}, req.body, (err, data) => {
		err ? res.send(err) : res.send(data)
	})
})

  // title: {type: String, required: true},
  // body: {type: String, required: true},
  // date: {type: Date, default: Date.now},
  // author: {type: mongoose.Schema.Types.ObjectId, ref: 'Author'},
  // tags: [String]

db.on('open', () => {
  console.log('db connection opened!');
  app.listen(4321, () => {
    console.log('Listening on port 4321!');
  });
})

db.on('error', () => {
  console.log('error in db connection!');
})
