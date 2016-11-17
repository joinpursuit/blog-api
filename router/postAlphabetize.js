const Post = require('mongoose').model('Post');
const router = require('express').Router()


router.route("/post/sort/a-z")
	.get((req,res)=>{
	Post.find({}).sort({title: 'asc'}).exec((err,data)=>{
			if (err) {
				console.log('error')
			} else {
				res.send(data)
			}
	})
})

module.exports = router; 