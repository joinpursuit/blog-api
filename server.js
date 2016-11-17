const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

//models
const models = require('./models');
const Post = models.Post;
const Author = models.Author;

//routers
const routers = require('./routers')
const postsRouter = routers.posts 
const authorsRouter = routers.authors

mongoose.connect('mongodb://localhost/blog-api');

const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));

//////////
//Your code here:
//////////

db.on('open', () => {
  console.log('db connection opened!');

  app.use('/api/posts', postsRouter)
  app.use('/api/authors', authorsRouter)

  app.listen(4321, () => {
    console.log('Listening on port 4321!');
  });
})

db.on('error', () => {
  console.log('error in db connection!');
})
