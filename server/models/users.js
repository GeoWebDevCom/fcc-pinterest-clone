'use strict';

const mongoose = require('mongoose');
const validator = require('validator');
const Schema = mongoose.Schema;

const User = new Schema({
  twitter: {
    id: String,
    displayName: String
  },
  photos: [
    {
      url: {
        type: String,
        required: true,
        validate: {
          validator: validator.isURL
        }
      },
      desc: {
        type: String,
        required: true,
      }
    }
  ]
});

module.exports = mongoose.model('User', User);
