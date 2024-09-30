const AppError = require('../errors/appError.js');
const { catchAsync } = require('../errors/error.js');
const Story = require('../models/story');

const getOne = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) throw new AppError(300, 'Invalid request');
  let story = await Story.findByIdAndUpdate(
    id,
    { $inc: { views: 1 } },
    { new: true }
  );
  if (!story) throw new AppError(404, 'Story not found');
  return res.status(200).json({
    message: 'Story Fetched',
    story,
    result: true,
  });
});

const getCategory = catchAsync(async (req, res, next) => {
  const category = req.params.category;
  if (!category) throw new AppError(300, 'Invalid request');

  let story = await Story.find({ category });
  return res.status(200).json({
    message: 'Story Fetched',
    story,
    result: true,
  });
});

const create = catchAsync(async (req, res, next) => {
  const { cards, category } = req.body;
  if (!typeof cards === 'object' || cards.length < 2)
    throw new AppError(300, 'Invalid request');

  let story = new Story({ cards, author: req.user, category });
  await story.save();
  return res.status(200).json({
    message: 'Story Created',
    story,
    result: true,
  });
});

const getAll = catchAsync(async (req, res, next) => {
  let story = await Story.find({ author: req.user });
  return res.status(200).json({
    message: 'Story Fetched',
    story,
    result: true,
  });
});

const update = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const data = {};
  if (req.body.cards) data.cards = req.body.cards;
  if (req.body.category) data.category = req.body.category;

  let story = await Story.findByIdAndUpdate(id, { ...data }, { new: true });
  if (!story) throw new AppError(404, 'Story not found');
  return res.status(200).json({
    message: 'Story Updated',
    story,
    result: true,
  });
});

const like = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) throw new AppError(300, 'Invalid request');
  let story = await Story.findByIdAndUpdate(
    id,
    { $inc: { likes: 1 } },
    { new: true }
  );
  req.story = story;
  next();
});

const deleteStory = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) throw new AppError(300, 'Invalid request, No id');
  let story = await Story.findById(id);
  if (!story) throw new AppError(404, 'Story not found');
  if (!story.author.equals(req.user._id))
    throw new AppError(300, 'Invalid request');
  await Story.findByIdAndDelete(id);
  return res.status(200).json({
    message: 'Story Deleted',
    result: true,
  });
});

const save = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  if (!id) throw new AppError(300, 'Invalid request');
  let story = await Story.findByIdAndUpdate(
    id,
    { $inc: { bookmarks: 1 } },
    { new: true }
  );
  req.story = story;
  next();
});

module.exports = {
  getOne,
  getCategory,
  getAll,
  create,
  update,
  like,
  save,
  deleteStory,
};
