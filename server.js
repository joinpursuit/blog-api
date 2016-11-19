const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./index').models;
const routes = require('./index').routes;
const Post = models.Post;
const Author = models.Author;
const router = require('express').Router();
const rootPath = path.join(__dirname, '.');

mongoose.connect('mongodb://localhost/blog-api');


const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static(`${rootPath}/bundle`));
//////////
//Your code here:
//////////


app.use('/api/posts',routes.posts)

app.use('/api/authors',routes.authors)

app.get('/*', (req, res) => {
    res.sendFile(`${rootPath}/public/index.html`);
});
db.on('open', () => {
  console.log('db connection opened!');
  app.listen(8000, () => {
    console.log('Listening on port 8000!');
  })
})

db.on('error', () => {
  console.log('error in db connection!');
})
