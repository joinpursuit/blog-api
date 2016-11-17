const Post = require('mongoose').model('Post');
const router = require('express').Router();

router.route('/posts')
	.post((req,res)=>{
	Post.create(req.body, (err,data)=>{
		if(err){
				console.log('error')
			}	else {
				res.send(data)
			}
	})
})

module.exports = router;