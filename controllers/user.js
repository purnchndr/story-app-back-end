// const User = require('../models/user');
const { catchAsync } = require('../errors/error');
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
const AppError = require('../errors/appError');
const Story = require('../models/story');
const User = require('../models/user');

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
    message: 'Story Saved',
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

const deleteUser = catchAsync(async (req, res, next) => {
  await User.findByIdAndDelete(req.user._id);
  return res.status(200).json({
    message: 'User Deleted',
    result: true,
  });
});

module.exports = { likeStory, saveStory, getUser, deleteUser };
