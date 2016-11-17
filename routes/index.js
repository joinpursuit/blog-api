const posts = require('./posts-router.js');
const authors = require('./authors-router.js')

module.exports = {
	routes: {
		posts: posts,
		authors: authors
	}
}