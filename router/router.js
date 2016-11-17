const path = require('path');
const router = require('express').Router();
const post = require(path.join(__dirname, '../models/post-model')).model('post');
const author = require(path.join(__dirname, '../models/author-model')).model('author');

const welcome = (req, res) => {
  res.send('hey buddy')
}

const postPosts = (req,res) => {
  post.create(req.body, (err, data) => {
    res.send(data)
    console.log('post created!')
  })
}

const getPosts = (req, res) => {
  post.find({}, (err, data) => {
    console.log('working')
    res.send(data)
  })
}

const getPostsById = (req,res) => {
  post.find({_id:req.params.id}, (err,data)=>{
    if (err)console.log('404')
    else {
    console.log('getPostsById is working')
    res.send(data)
  }
  })
}

const getPostsSortedByDate = (req,res)=>{
	post.find({}).sort({date: 'asc'}).exec((err,data)=>{
		if(err)console.log('404')
		else {console.log('sort completed')
    res.send(data)
    }
	})
}


const getPostSortedByLetters = (req,res)=>{
	post.find({}).sort({title: 'asc'}).exec((err,data)=>{
		if(err)console.log('404')
		else {console.log('sort completed')
    res.send(data)
    }
	})}

const getPostByAuthor = (req,res)=>{
  author.find({}, (err,data)=>{
		if(err)console.log('404')
		else res.send(data)
	})
}

const getPostByAuthorSortedLetter = (req,res)=>{
	author.find({}).sort({name: 'asc'}).exec((err,data)=>{
		if(err)console.log('404')
		else res.send(data)
	})
}

const getPostByAuthorSortedById = (req,res)=>{
	author.find({_id:req.params.id}, (err,data)=>{
		if(err)console.log('404')
		else res.send(data)
	})
}


router.route('/api/posts')
.get(getPosts)
.post(postPosts)

router.route('/api/posts/sort/a-z')
.get(getPostSortedByLetters)

router.route('/api/posts/:id')
.get(getPostsById)

router.route('/api/posts/sort/by-date')
.get(getPostsSortedByDate)

router.route('/api/authors')
.get(getPostByAuthor)

router.route('/api/authors/sort/a-z')
.get(getPostByAuthorSortedLetter)

router.route('/api/authors/:id')
.get(getPostByAuthorSortedById)

router.route('/')
.get(welcome)


module.exports = router;
