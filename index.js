const router = require('./router/router');
const authorModel = require('./models/author-model');
const postModel = require('./models/post-model');

module.exports = {
  models:{
    author: authorModel,
    post: postModel,
    },
  routes: router
}
