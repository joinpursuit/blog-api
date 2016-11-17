const Post = require('mongoose').model('Post');
const router = require('express').Router();

router.route('/post/tags/react')
	.get((req,res)=>{
		Post.find({tags: "react"}, (err,data)=>{
			if(err){
				console.log('error')
			}	else {
				res.send(data)
			}
	})
})

	module.exports = router; 