'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const Photo = new Schema({
  url: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      isAsync: false,
    }
  },
  desc: {
    type: String,
    required: true,
  },
  creator: {
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
    profile_pic: {
      type: String,
    },
  },
  likes: [Schema.Types.ObjectId],
});

module.exports = mongoose.model('Photo', Photo);
