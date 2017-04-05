'use strict';

const {ObjectID} = require('mongodb');
const UserModel = require('./../../server/models/users.js');
const PhotoModel = require('./../../server/models/photos.js');

const userOneID = new ObjectID();
const userTwoID = new ObjectID();

const users = [
  {
    _id: userOneID,
    twitter: {
      id: '123',
      displayName: 'John Doe'
    }
  }, {
    _id: userTwoID,
    twitter: {
      id: '321',
      displayName: 'Jane Doe'
    }
  }
];

const photos = [
  {
    url: 'http://weknowyourdreams.com/images/python/python-08.jpg',
    desc: 'A real python',
    creator: userOneID,
    likes: [userOneID, userTwoID, new ObjectID(), new ObjectID()]
  }, {
    url: 'http://www.petrozavodsk-mo.ru/images/upload/fofan.jpg',
    desc: 'A boat',
    creator: userOneID,
    likes: [userOneID, userTwoID, new ObjectID()]
  }, {
    url: 'https://s-media-cache-ak0.pinimg.com/originals/ea/05/e1/ea05e17424d521af3454fc862e623f67.jpg',
    desc: 'Tinian',
    creator: userOneID,
    likes: [userOneID, new ObjectID(), new ObjectID()]
  }, {
    url: 'http://www.mymarianas.com/resources/images/Tin030LR.JPG',
    desc: 'Taga\'s Beach',
    creator: userTwoID,
    likes: [userTwoID]
  }
];

const populateServer = (done) => {
  UserModel
    .remove({})
    .then(() => {
      return UserModel.insertMany(users);
    });
  PhotoModel
    .remove({})
    .then(() => {
      return PhotoModel.insertMany(photos);
    });
  done();
};

module.exports = {
  users,
  populateServer
};
