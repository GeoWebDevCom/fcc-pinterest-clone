'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  twitter: {
    id: String,
    displayName: String
  },
  photos: [
    {
      photoId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
    }
  ]
});

module.exports = mongoose.model('User', User);
