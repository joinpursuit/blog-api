
const router = require('express').Router();
const Author = require('../models').Author;


//if  api/authors get all authors
const postByAuthor = (req,res) => {
	Author.find({}, (err, data) => {
		if(err) {
			res.send()
			console.log('Error in postByAuthor')
		} else {
			res.send(data)
			console.log('Successfully postByAuthor')
		}
	})
}

//if  /api/authors/sort/a-z SORT ALPHETICALLY BY AUTHOR
const getAuthorSortedAlphabetically = (req,res) => {
	Author.find({}, (err, data) => {
		if(err) {
			console.log('Error in getAuthorSortedAlphabetically')
			res.send()
		} else {
			
			res.send(data.map(function(a){
				return a.name.toUpperCase()
			}).sort())
			console.log('Successfully getAuthorSortedAlphabetically')
		}
	}) 
}

//IF  /api/authors/:id get author by id
const authorByID = (req,res) => {
	console.log('req', req)
	Author.find({_id: req.params.id}, (err,data) =>{
		if(err) {
			console.log('Error in authorByID');
			res.send('error')
		} else {
		  res.send(data)
		  console.log('successfully authorByID')
		}

	})
}


//ROUTER DEFINITIONS =================================
//IF  /api/authors  go to postByAuthor
router.route('/')
.get(postByAuthor)

//IF  /authors/sort/a-z  go to getAuthorSortedAlphabetically
router.route('/sort/a-z')
.get(getAuthorSortedAlphabetically)

//IF  /api/authors/:id go to authorByID
router.route('/:id')
 .get(authorByID)

 
module.exports = router;






