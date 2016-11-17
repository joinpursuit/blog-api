const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./models');
//Routes
//we get into the index-router files... .routes allows us access into that object.
const indexRouter = require('./router/index-router').routes

const Author = models.Author;

mongoose.connect('mongodb://localhost/blog-api');

const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true })); 


//Starts the chain

//this will link back to the router when the url contains 
//matches the actually route we route.
app.use('/api',indexRouter.post);
app.use('/api',indexRouter.postId);
app.use('/api',indexRouter.postDate);
app.use('/api',indexRouter.postAlphabetize);
app.use('/api',indexRouter.authors);
app.use('/api',indexRouter.authorsAlphabetize);
app.use('/api',indexRouter.authorsID);
app.use('/api',indexRouter.reactTag);
app.use('/api',indexRouter.postsWithAuthors);
app.use('/api',indexRouter.postPost);
app.use('/api',indexRouter.postsId);


db.on('open', () => {
  console.log('db connection opened!');
  app.listen(4321, () => {
    console.log('Listening on port 4321!');
  });
})

db.on('error', () => {
  console.log('error in db connection!');
})
