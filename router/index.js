const router = require('express').Router();

router.use('/posts', require('./postRouter'));
router.use('/authors', require('./authorRouter'));
router.use('/posts-with-authors', require("./postsAuthorsRouter"));

module.exports = router;