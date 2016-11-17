const router = require('express').Router();
const Post = require('../models').Post;

const getPostsWithAuthors = (req,res) => {
  Post.find({}).populate("author").exec(function(err, data) {
      if(err) {console.log("There was an error getting your data");
        res.send("There was a error getting your data")
      }else{
        console.log("Retrieving data", data);
        res.send(data);
      }
    })
}


router.route("/")
  .get(getPostsWithAuthors)

module.exports = router;