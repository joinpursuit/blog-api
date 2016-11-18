const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./models');
const Post = models.Post;
const Author = models.Author;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/blog-api');

const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());
// =========================================

// API ROUTE
var router = express.Router();

router.use(function(req, res, next) {
	console.log('Something, something, blah, blah, blah');
	next();
});

// Test route, http://localhost:4321/api/posts
router.get('/', function(req,res) {
	res.json({message: 'api y\'all!'});
});

router.route('/posts')

	.post(function(req, res) {
		var newPost = new Post()
		newPost.title = req.body.title
		newPost.body = req.body.body

		newPost.save(function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({message: 'New Post created!'});
			}
		});
	})

	.get(function(req, res) {
		Post.find(function(err, posts) {
			if (err) {
				res.send(err);
			} else {
				res.json(posts);
			}
		})

	});

// Routes that have /posts/:id

router.route('/posts/:id')

	.get(function(req, res) {
		Post.findById(req.params.id, function(err, posts) {
			if (err){
				res.send(err);
			} else {
				res.json(posts);
			}
		})
	})
	.put(function(req, res) {
		Post.findById(req.params.id, function (err, posts) {
			if (err) {
				res.send(err);
			} else {
				res.json({message: 'Post updated!'});
			}
		})
	})
	.delete(function(req, res) {
		Post.remove({
			_id: req.params.id
		}, function (err, posts) {
			if (err) {
				res.send(err);
			} else {	
				res.json({message: 'Delete success'})
			}
		})
	})

// Sorting
router.route('/posts/sort/by-date')

	.get(function(req, res) {
		Post.find({}).sort({date: 1}).exec(function (err, posts) {
			if (err) { 
				res.send(err); 
			} else {
				res.json(posts);
			}

		})
	})

router.route('/posts/sort/a-z')

	.get(function(req, res) {
		Post.find({}).sort({title: 1}).exec(function (err, posts) {
			if (err) { 
				res.send(err); 
			} else {
				res.json(posts);
			}

		})
	})

router.route('/posts/tags/react')

	.get(function(req, res) {
		Post.find({ tags: { "$in" : ["react"]}}, function (err, posts) {
			if (err) { 
				res.send(err); 
			} else {
				res.json(posts);
			}

		})
	})

router.route('/posts-with-authors')

	.post(function(req, res) {
		var authorPost = new Post()
		authorPost.title = req.body.title
		authorPost.body = req.body.body
		authorPost.author = req.body.author

		authorPost.save(function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({message: 'New Post created!'});
			}
		});
	})

	.get(function(req, res) {
		Post.find({}).populate('author').exec(function(err, posts) {
			if (err) {
				res.send(err);
			} else {
				res.json(posts);
			}
		})

	});

////////////////////////////
///////  AUTHORS ///////////
////////////////////////////

router.route('/authors')

	.post(function(req, res) {
		var newAuthor = new Author()
		newAuthor.name = req.body.name

		newAuthor.save(function(err) {
			if (err) {
				res.send(err);
			} else {
				res.json({message: 'New Author created!'});
			}
		});
	})

	.get(function(req, res) {
		Author.find(function(err, author) {
			if (err) {
				res.send(err);
			} else {
				res.json(author);
			}
		})

	});

// Routes that have /author/:id

router.route('/authors/:id')

	.get(function(req, res) {
		Author.findById(req.params.id, function(err, author) {
			if (err){
				res.send(err);
			} else {
				res.json(author);
			}
		})
	})
	.put(function(req, res) {
		Author.findById(req.params.id, function (err, author) {
			if (err) {
				res.send(err);
			} else {
				res.json({message: 'Author updated!'});
			}
		})
	})
	.delete(function(req, res) {
		Author.remove({
			_id: req.params.id
		}, function (err, author) {
			if (err) {
				res.send(err);
			} else {	
				res.json({message: 'Delete author success'})
			}
		})
	})

router.route('/authors/sort/a-z')

	.get(function(req, res) {
		Author.find({}).sort({name: 1}).exec(function (err, name) {
			if (err) { 
				res.send(err); 
			} else {
				res.json(name);
			}

		})
	})

////////////////////////////
/////////  BONUS ///////////
////////////////////////////

router.route('/search/:id')

	.get(function(req, res) {
		Post.findById(req.params.id, function(err, posts) {
			if (err){
				res.send(err);
			} else {
				res.json(posts);
			}
		})
	})

// Regiser API routes and prefix with /api
app.use('/api', router)
app.use(express.static('http://localhost:4321/', {
  index: 'index.html'
}))

db.on('open', () => {
  console.log('db connection opened!');
  app.listen(4321, () => {
    console.log('Listening on port 4321!');
  });
})

db.on('error', () => {
  console.log('error in db connection!');
})
