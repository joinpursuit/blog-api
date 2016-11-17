const router = require('express').Router();
const Post = require('../models').Post;

const getAllPosts = (req,res) => {
  console.log("Hello from postRouter")
  Post.find({}, (err, data) => {
    if(err) {console.log("There was an error getting your data");
      res.send("There was a error getting your data")
    }else{
      console.log("Retrieving data", data);
      res.send(data);
    }
  })
}


const getPostId = (req,res) =>{
  console.log(req.param.id)
  Post.find({_id: req.params.id}, (err, data) => {
    if(err) {console.log("There was an error getting your data");
      res.send("There was a error getting your data")
    }else{
      console.log("Retrieving data", data);
      res.send(data);
    }
  })
}

const getSortedByDate = (req,res) => {
  Post.find({}).sort({date: 'asc'}).exec(function(err,data) {
    if(err) {console.log("There was an error getting your data");
      res.send("There was a error getting your data")
    }else{
      console.log("Retrieving data", data);
      res.send(data);
    }
  })
}

const getSortedByLetter = (req,res) => {
  Post.find({}).sort({title: 'asc'}).exec(function(err,data) {
    if(err) {console.log("There was an error getting your data");
      res.send("There was a error getting your data")
    }else{
      console.log("Retrieving data", data);
      res.send(data);
    }
  })
}

const getPostsByTags = (req,res) => {
  console.log(req.params.tag)
  Post.find({tags: req.params.tag}, (err, data) => {
    if(err) {console.log("There was an error getting your data");
      res.send("There was a error getting your data")
    }else{
      console.log("Retrieving data", data);
      res.send(data);
    }
  })
}

//==========================================
const newPost = (req,res) => {
  console.log(req);
  Post.create({title: "Hello World", body:"My favorite color is blue."}, (err,data) => {
      if(err) {console.log("There was an error getting your data");
      res.send("There was a error getting your data")
    }else{
      console.log("Retrieving data", data);
      res.send(data);
    }
    })
}

//*****************************************

const deleteThisPost = (req,res) => {
  Post.remove({_id: req.params.id}, (err, data) => {
    if(err) {console.log("There was an error getting your data");
      res.send("There was a error getting your data")
    }else{
      console.log("Retrieving data", data);
      res.send(data);
    }
  })
}

//+++++++++++++++++++++++++++++++++++++++++++++

const updateThisPost = (req,res) => {
  Post.findOneAndUpdate({_id: req.params.id}, req.body, (err, data) => {
    if(err) {console.log("There was an error getting your data");
      res.send("There was a error getting your data")
    }else{
      console.log("Retrieving data", data);
      res.send(data);
    }
  })
}

  //--------------------------------------------------
router.route("/")
  .get(getAllPosts)
  .post(newPost)

router.route("/:id")
  .get(getPostId)
  .delete(deleteThisPost)
  .put(updateThisPost)

router.route("/sort/by-date")
  .get(getSortedByDate)

router.route("/sort/a-z")
  .get(getSortedByLetter)

router.route("/tags/:tag")
  .get(getPostsByTags)

module.exports = router ;
