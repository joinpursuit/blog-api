//module imports
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');

//file imports
const models = require('./index').models
const router = require('./index').routes

const app = express();

mongoose.connect('mongodb://localhost/blog-api');

const db = mongoose.connection;

db.on('open', () => {
  console.log('db connection opened!');
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(express.static('bundle'));
  app.use('/', router);
  app.listen(4321, () => {
    console.log('Listening on port 4321!');
  });
})

db.on('error', () => {
  console.log('error in db connection!');
})
