const mongoose = require('mongoose');

const blogSchema = mongoose.Schema({
  title: {
    type: String,
    minlength: 5,
    required: true
  },
  author: String,
  url: {
    type: String,
    minlength: 5,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  likes: Number,
});

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Blog', blogSchema);
