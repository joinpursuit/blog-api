const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
//const models = require('./models'); //something in nodeJS allows to read index.js
//const Post = models.Post;
//const Author = models.Author;
//const router = require('./router'); //reads index.js

mongoose.connect('mongodb://localhost/blog-api');

const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));

//////////
//Your code here:
//////////

app.use('/api', require('./router'))
//when the url /api, send it to ROUTER to handle it (middleware)




db.on('open', () => {
  console.log('db connection opened!');
  app.listen(4321, () => {
    console.log('Listening on port 4321!');
  });
})

db.on('error', () => {
  console.log('error in db connection!');
})
