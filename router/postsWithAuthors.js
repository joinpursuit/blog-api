const Post = require('mongoose').model('Post');
const router = require('express').Router();

router.route('/posts-with-authors')
	.get((req,res)=>{
	Post.find({}).populate('author').exec((err,data)=>{
		if(err){
				console.log('error')
			}	else {
				res.send(data)
			}
	})
})

module.exports = router; 