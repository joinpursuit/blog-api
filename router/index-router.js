//getting the router	*crud*
const post = require('./post');
const postId = require('./postId')
const postDate = require('./postDate')
const postAlphabetize = require('./postAlphabetize')
const authors = require('./authors')
const authorsAlphabetize = require('./authorsAlphabetize')
const authorsID = require('./authorsID')
const reactTag = require('./reactTag')
const postsWithAuthors = require('./postsWithAuthors')
const postPost = require('./postPost')
const postsId = require('./postsId')

module.exports = {
//created an object and field and exported the router in the field.
  routes:{
  	post: post,
  	postId: postId,
  	postDate: postDate,
  	postAlphabetize: postAlphabetize,
  	authors: authors,
  	authorsAlphabetize: authorsAlphabetize, 
  	authorsID: authorsID, 
  	reactTag:reactTag,
  	postsWithAuthors: postsWithAuthors,
  	postPost: postPost,
  	postsId:postsId
  }
}

//Way to separate routes 