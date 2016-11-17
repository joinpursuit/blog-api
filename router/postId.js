const Post = require('mongoose').model('Post');
const router = require('express').Router()

router.route('/post/:id')
//id is kinda like a variable and whatever i set the param name will indicate the params object that i have to bracket into.
		.get((req,res)=>{
		console.log("THESE ARE MY PARAMS", req.params)
//'_id' is property from mongo that gives post a unique id
//mongoose method 'find' is searching for a key that matches
		Post.find({_id:req.params.id}, (err,data)=>{
//than checks to see the param id. which was giving in the req.
			if (err) {
				console.log('error')
			} else {
				res.send(data)
//and return the json object.				
			}
	})
})

module.exports = router;