'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const User = new Schema({
  twitter: {
    id: {
      type: String,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
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
