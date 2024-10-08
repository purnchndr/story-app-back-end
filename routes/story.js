const express = require('express');
const { auth } = require('../controllers/auth');
const {
  getOne,
  getCategory,
  getAll,
  create,
  update,
  deleteStory,
} = require('../controllers/story');

const route = express.Router();

route
  .get('/', auth, getAll)
  .get('/category/:category', getCategory)
  .get('/:id', getOne)
  .post('/', auth, create)
  .patch('/:id', auth, update)
  .delete('/:id', auth, deleteStory);

module.exports = route;
