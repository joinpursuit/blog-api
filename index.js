const Author = require('./models/author-model');
const Post = require('./models/post-model');
const authors = require('./routes/authors-router');
const posts = require('./routes/posts-router')

module.exports = {
    models:{
      Author:Author,
      Post: Post
    },
    routes:{
      posts: posts,
        authors: authors
    }
}

