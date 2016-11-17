//create a route


const Post = require('mongoose').model('Post');
const router = require('express').Router();

router.route('/post')
	.get((req,res)=>{
		Post.find({}, (err,data)=>{
			if (err) {
				console.log('error')
			} else {
				res.send(data)
			}
	})
})

//export the route to retrieve in index-router.js
module.exports = router;