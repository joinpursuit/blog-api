//app starts always with 'server.js'
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const Router = require('./router');

//const models = require('./models/index.js');
// const Post = models.Post;
// const Author = models.Author;

mongoose.connect('mongodb://localhost/blog-api');//starts connection or syn with db

const db = mongoose.connection;
//handle for db 

app.use(bodyParser.urlencoded({ extended: true })); //tells how to process data send to the server in the post,put




//if /api then use it, send it to the router, router goes to index.js
app.use('/api', Router); 


//handling the db connected event
db.on('open', () => {
  console.log('db connection opened!');
  app.listen(4321, () => {
    console.log('Listening on port 4321!');
  });
})

db.on('error', () => {
  console.log('error in db connection!');
})
