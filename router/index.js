//if not specified goes to index.js handle the routers and send them to the router's model, each models should have its own router

const router = require('express').Router();
router.use('/posts', require('./post-router')); //  /api/posts  from here go to post-router


// const authorRouter = require('./author-router');
// const postRouter = require('./post-models');


router.use('/authors', require('./author-router'));
// router.use('./post-with-authors');

module.exports = router;
