const mongoose = require('mongoose');
const User = require('./user');

const schema = mongoose.Schema;

const storySchema = new schema({
  cards: [
    {
      image: { type: String, required: [true, 'image can not be empty'] },
      heading: { type: String, required: [true, 'heading can not be empty'] },
      description: {
        type: String,
        required: [true, 'description can not be empty'],
      },
    },
  ],
  author: {
    type: schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: false,
  },
  category: { type: String, required: [true, 'category can not be empty'] },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  bookmarks: { type: Number, default: 0 },
  createdOn: { type: Date, default: Date.now() },
});

const Story = mongoose.model('Story', storySchema);

module.exports = Story;
