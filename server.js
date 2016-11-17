const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const models = require('./models');
const Post = models.Post;
const Author = models.Author;

mongoose.connect('mongodb://localhost/blog-api'); // creating name of database

const db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));

//req is short for request/ res is short for response
app.get('/api/posts/:id', function (req, res) {
  Post.findById(req.params.id, function(err, data) {
    //Post.findByOne({_id: req.params.id}, callback/anon function here)
    //Post.find({title: req.params.id}, callback/anon function here)
    res.send(data)
  })
})

app.get('/api/posts/sort/by-date', function (req, res) {
  Post.find({}, null, {sort: {date: 1}}, function(err,data) {
    res.send(data)
  })
})

app.get('/api/posts/sort/a-z', function (req, res) {
  Post.find({}, null, {sort: {title: 1}}, function(err, data) {
    res.send(data)
  })
})

app.get('/api/authors/sort/a-z', function (req, res) {
  Author.find({}, null, {sort: {name: 1}}, function(err, data) {
    res.send(data)
  })
})

app.get('/api/authors/:id', function (req, res) {
  Author.findById(req.params.id, function (err, data) {
    res.send(data)
  })
})

app.put('/api/posts/:id', function (req, res) {
  Post.findById(req.params.id, function (err, data) {
    res.send('im updated!')
  })
})

app.get('/api/posts/tags/react', function (req, res) {
  Post.find({tags: 'react'}, function (err, data) {
    res.send(data)
  })
})

app.get('/api/posts-with-authors', function (req, res) {
  Post.find({}, null, {populate: 'author'}, function (err, data) {
    res.send(data)
  })
})

app.post('/api/posts', function (req, res) {
  Post.create(req.body, function (err, data) {
    res.send(data)
  //   if (err) {
  //     res.send(err)
  // } else {res.send(data)}
  })
})

app.delete('/api/posts/:id', function (req, res) {
  Post.remove(req.params, function (err,data))
  console.log("PARAMS", req.params)
  console.log("PARAMS ID", req.params.id)
  // Post.remove(req.params.id, function (err, data) {
  //   res.send(data)
  // })
})

app.get('/api/posts', function (req, res) {
  Post.find({}, function (err, data) {
    res.send(data)
  })
})

app.get('/api/authors', function (req, res) {
  Author.find({}, function (err, data) {
    res.send(data)
  })
})

db.on('open', () => {
  console.log('db connection opened!');
  app.listen(4321, () => {
    console.log('Listening on port 4321!');
  });
})

db.on('error', () => {
  console.log('error in db connection!');
})
