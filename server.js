const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./models');
const Post = models.Post;
const Author = models.Author;

mongoose.connect('mongodb://localhost/blog-api');

const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));

//////////
//Your code here:

//////////
const routes = require("./routes/index.js").routes;
//////////

db.on('open', () => {
  console.log('db connection opened!');

  /////
  app.use("/api/posts", routes.posts);

  app.use('/api/authors', routes.authors);

  app.use('/api', routes.posts);
  //////

  app.listen(4321, () => {
    console.log('Listening on port 4321!');
  });
})

db.on('error', () => {
  console.log('error in db connection!');
})
