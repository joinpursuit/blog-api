const Author = require('mongoose').model('Author');
const router = require('express').Router();

router.route('/authors')
	.get((req,res)=>{
		Author.find({}, (err,data)=>{
			if(err){
				console.log('error')
			} else {
				res.send(data)
			}
	})
})

module.exports = router; 