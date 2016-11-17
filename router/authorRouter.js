const router = require('express').Router();
const Author = require('../models').Author;

const getAllAuthors = (req,res) => {
  Author.find({}, (err,data) => {
    if(err){console.log("There was an error retrieving authors")
    }else{
      console.log("Retrieving data", data);
      res.send(data);
    }
  })
}

const getAuthorsByLetter = (req,res) => {
  Author.find({}).sort({name: 'asc'}).exec(function(err,data){
    if(err){console.log("There was an error retrieving authors")
    }else{
      console.log("Retrieving data", data);
      res.send(data);
    }
  })
}

const getAuthorById = (req,res) => {
  Author.find({ _id: req.params.id}, (err,data) => {
    if(err){console.log("There was an error retrieving authors")
    }else{
      console.log("Retrieving data", data);
      res.send(data);
    }
  })
}




//-----------------------------------
router.route("/")
  .get(getAllAuthors)

router.route('/sort/a-z')
  .get(getAuthorsByLetter)

router.route('/:id')
  .get(getAuthorById)


module.exports = router ;