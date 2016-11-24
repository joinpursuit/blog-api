//post is only for /posts, post-router checks which api should use based on the link
const router = require('express').Router();
const Post = require('../models').Post;
// const Author = require('../models').Author;
// const models = require('./models');
// const Post = models.Post;


//if /api/posts GETS ALL POSTS 
const getPosts = (req, res) => {
	Post.find({}, (err, data)=> {
		if(err) {
			console.log('Error in getPosts');
			res.send()
		} else {
		  res.send(data)
		}
	})
}

//if /api/posts/:id  GETS A POST BASE ON ID
const getPostId = (req,res) => {
	//'_id' is mongo property,post a unique id, checks to see the param id. which was giving in the req.
	Post.find({_id: req.params.id}, (err,data) =>{
		if(err) {
			console.log('Error in getPostId');
			res.send()
		} else {
		  console.log('successfully retrived data!')
		  res.send(data)//return json
		}

	})
}


//if  /api/posts/sort/by-date  SORT BY DATE ASC or 0-10 
const getPostsSortedByDate = (req, res) => {
	//goes to url which triggers a get request .exec will wait for the find and sort method to happen before it responds. 
	Post.find({}).sort({date: 'asc'}).exec((err,data)=> { 
		if(err)console.log('error in getPostsSortedByDate!') 
			else res.send(data)
	}) 
}


//if  /api/posts/sort/a-z SORT ALPHETICALLY BY TITLE
const getPostsSortedAlphabetically = (req,res) => {

	Post.find({}).sort({title: 'asc'}).exec((err,data) => {
		if(err) console.log('Error in getPostsSortedAlphabetically!')
			else res.send(data)
	})
    //sort and send only titles
	// Post.find({}).sort({title: 'asc'}).exec((err,data) => {
	// 	if(err) console.log('Error in getPostsSortedAlphabetically!')
	// 		else res.send(data.map(function(a){
	// 			return a.title.toUpperCase()
	// 		}).sort())
	// })

}

//If  /api/posts creates new post
const createPost = (req, res) => {
	Post.create(req.body, (err, data) => {
        if(err) console.log('New Post create Err!', err);
        else {
          console.log('New Posts created!', data);
        }
        res.send(data)
    })//req.body input from client,res.send(data) comes mongoose
}

//IF  api/posts/:id DELETE post BY ID 
const deletePost = (req, res) => {
	Post.remove({_id: req.params.id}, (err, data) => {
        if(err) console.log('Error in deletePost!', err);
        else {
          console.log('Successfully deletePost!');
        res.send(data)
        }
    })
}

//IF /api/posts/:id  UPDATE POST BY ID
const updatePost = (req, res) => {
	Post.findOneAndUpdate({_id:req.params.id}, req.body, {new: tru}, (err, data) => {
        if(err) console.log('Error in updatePost!', err);
        else {
          console.log('Successfully updatePost!');
        res.send(data)
        }
    })
}


//IF  /api/posts/tags/react get all blog posts that have a 'react' tag
const reactTag = (req, res) => {
	Post.find({tags: 'react'}, (err, data) => {
		if(err) {
			console.log('Error in reactTag')
			res.send()
		} else {
			
			res.send(data)
			console.log('Successfully reactTag')
		}
	}) 
}

// /api/posts-with-authors get all posts with author fully populated (in other words, the full author information should be displayed, including author name and id)
const postWithAuthors = (req, res) => {
	Post.find({}).populate('author').exec((err,data)=>{
		if(err)console.log('error')
		else res.send(data)
			console.log('IS IT reactTag WORKING?') 
	})
	
}




router.route('/')
.get(getPosts)       // /api/posts gets all
.post(createPost)    // /api/posts creates newPost

//IF  /api/posts-with-authors
router.route('/with-authors')
.get(postWithAuthors)


// /api/posts/:id
router.route('/:id')
.get(getPostId) 
.put(updatePost)
.delete(deletePost)


//library allows u to define all http verbs on 1 route onb

//route definition
// /api/posts/sort/by-date
router.route('/sort/by-date')
.get(getPostsSortedByDate)


//api/posts/sort/a-z
router.route('/sort/a-z')
.get(getPostsSortedAlphabetically) 

//IF /api/posts/tags/react go to reactTag
 router.route('/tags/react')
  .get(reactTag)








module.exports = router;


