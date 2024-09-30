// const User = require('../models/user');
const { catchAsync } = require('../errors/error');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const AppError = require('../errors/appError');
const Story = require('../models/story');
const User = require('../models/user');

// const profile = catchAsync(async (req, res, next) => {
//   if (!req.user) throw new AppError(404, 'Invalid User ID');
//   res.status(200).json({
//     message: 'User Fetched Successfully',
//     user: req.user,
//     result: true,
//   });
// });

const likeStory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  const story = req.story;
  if (!user || !id) throw new AppError(404, 'Invalid User ID');
  user.liked.push(story);
  await user.save();
  res.status(200).json({
    message: 'Story Liked',
    user,
    result: true,
  });
});

const saveStory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const user = req.user;
  const story = req.story;
  if (!user || !story) throw new AppError(404, 'Invalid User ID');
  user.bookmarks.push(story);
  await user.save();
  res.status(200).json({
    message: 'Story Liked',
    user,
    result: true,
  });
});

const getUser = catchAsync(async (req, res, next) => {
  const user = req.user;
  if (!user) throw new AppError(404, 'Invalid User ID');
  res.status(200).json({
    message: 'User fetched',
    user,
    result: true,
  });
});

module.exports = { likeStory, saveStory, getUser };
