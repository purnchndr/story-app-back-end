const express = require('express');
const { likeStory, saveStory, getUser } = require('../controllers/user');
const { like, save } = require('../controllers/story');
const { auth, register, login } = require('../controllers/auth');

const route = express.Router();

route
  .get('/', auth, getUser)
  .post('/register', register)
  .post('/login', login)
  .post('/like/:id', auth, like, likeStory)
  .post('/save/:id', auth, save, saveStory);

module.exports = route;
