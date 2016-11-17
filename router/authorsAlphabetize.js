const Author = require('mongoose').model('Author');
const router = require('express').Router();

router.route('/authors/sort/a-z')
	.get((req,res)=>{
		Author.find({}).sort({name: 'asc'}).exec((err,data)=>{
			if(err){
				console.log('error')
			}	else {
				res.send(data)
			}
		})
})

module.exports = router; 