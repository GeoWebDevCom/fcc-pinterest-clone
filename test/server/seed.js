'use strict';

const {ObjectID} = require('mongodb');
const UserModel = require('./../../server/models/users.js');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [
  {
    _id: userOneID,
    twitter: {
      id: '123',
      displayName: 'John Doe',
    },
  },
  {
    _id: userTwoID,
    twitter: {
      id: '321',
      displayName: 'Jane Doe',
    },
  },
];

const populateServer = (done) => {
  UserModel.remove({}).then(() => {
    return UserModel.insertMany(users);
  });
  done();
};

module.exports = {
  users, populateServer,
};
