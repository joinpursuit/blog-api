const Post = require('mongoose').model('Post');
const router = require('express').Router();


router.route("/post/sort/by-date")
//we sort the object with the ascending date.
//goes to this url which triggers a get request
	.get((req,res)=>{
		Post.find({}).sort({date: 'asc'}).exec((err,data)=>{
//sort the object by ascending dates 
//.exec will wait for the find and sort method to happen before it responds.
			if (err) {
				console.log('error')
			} else {
				res.send(data)
			}
	})
})

	module.exports = router;