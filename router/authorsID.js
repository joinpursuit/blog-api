const Author = require('mongoose').model('Author');
const router = require('express').Router();

router.route('/authors/:id')
	.get((req,res)=>{
		Author.find({_id:req.params.id}, (err,data)=>{
			if(err){
				console.log('error')
			}	else {
				res.send(data)
			}
		})
})

module.exports = router; 