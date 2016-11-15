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

app.get('/api/posts', (req, res) => {
  Post.find({}, (err, data) => {
    if(err) console.log(err);
    else res.send(data);
  })
});

app.get('/api/posts/:id', (req, res) => {
  Post.findById(req.params.id)
  .populate('author')
  .exec((err, data) => {
    if(err) console.log(err);
    else res.send(data);
  })
});

app.get('/api/posts/sort/by-date', (req, res) => {
  Post.find({})
  .sort({date: 'desc'})
  .exec((err, data) => {
    if(err) console.log(err);
    else res.send(data);
  })
});

app.get('/api/posts/sort/a-z', (req, res) => {
  Post.find({})
  .sort({title: 'desc'})
  .exec((err, data) => {
    if(err) console.log(err);
    else res.send(data);
  })
});

app.get('/api/authors', (req, res) => {
  Author.find({}, (err, data) => {
    if(err) console.log(err);
    else res.send(data);
  })
});

app.get('/api/authors/sort/a-z', (req, res) => {
  Author.find({})
  .sort({title: 'desc'})
  .exec((err, data) => {
    if(err) console.log(err);
    else res.send(data);
  })
});

app.get('/api/authors/:id', (req, res) => {
  Author.findById(req.params.id)
  .populate('author')
  .exec((err, data) => {
    if(err) console.log(err);
    else res.send(data);
  })
});

app.get('/api/posts-with-authors', (req, res) => {
  Post.find({})
  .populate('author')
  .exec((err, data) => {
    if(err) console.log(err);
    else res.send(data);
  })
});


app.get('/api/posts/tags/react', (req, res) => {
  Post.find({tags: 'react'})
  .exec((err, data) => {
    if(err) console.log(err);
    else res.send(data);
  })
});

app.delete('/api/posts/:id', (req, res) => {
  Post.remove({_id: req.params.id}, (err, data) => {
    if(err) console.log(err);
    else res.send(data);
  })
});

app.put('/api/posts/:id', (req, res) => {
  Post.findOneAndUpdate({_id: req.params.id}, req.body, (err, data) => {
    if(err) console.log(err);
    else res.send(data);
  })
});

db.on('open', () => {
  console.log('db connection opened!');
  app.listen(4321, () => {
    console.log('Listening on port 4321!');
  });
})

db.on('error', () => {
  console.log('error in db connection!');
})
