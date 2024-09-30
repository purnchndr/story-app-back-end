const mongoose = require('mongoose');
const Story = require('./story');

const schema = mongoose.Schema;

const userSchema = new schema({
  username: { type: String, required: [true, "Email can't be Empty"] },
  password: { type: String, required: [true, "Password can't be Empty"] },
  bookmarks: [
    {
      type: schema.Types.ObjectId,
      ref: 'Story',
    },
  ],
  liked: [
    {
      type: schema.Types.ObjectId,
      ref: 'Story',
    },
  ],
});

const User = mongoose.model('User', userSchema);

module.exports = User;
