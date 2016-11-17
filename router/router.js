const path = require('path');
const router = require('express').Router();
const post = require(path.join(__dirname, '../models/post-model')).model('post');
const author = require(path.join(__dirname, '../models/author-model')).model('author');

const welcome = (req, res) => {
  res.send('hey buddy')
}

const getPosts = (req, res) => {
  post.find({}, (err, data) => {
    console.log('working')
    res.send(data)
  })
}

router.route('/api/posts')
.get(getPosts)

router.route('/')
.get(welcome)

module.exports = router;
