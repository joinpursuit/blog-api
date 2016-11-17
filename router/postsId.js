const Post = require('mongoose').model('Post');
const router = require('express').Router()


router.route('/posts/:id')
	.delete((req,res) =>{
	Post.remove({_id:req.params.id}, (err,data)=>{
		if(err){
				console.log('error')
			}	else {
				res.send(data)
			}
	})
})
	.post((req,res) =>{
	Post.findOneAndUpdate({_id:req.params.id}, req.body, (err,data)=>{
		if(err){
				console.log('error')
			}	else {
				res.send(data)
			}
	})
})

module.exports = router;