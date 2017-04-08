/*global describe it beforeEach*/
const expect = require('expect');
const {ObjectID} = require('mongodb');

const UserModel = require('./../../server/models/users.js');
const PhotoModel = require('./../../server/models/photos.js');

const {users} = require('./seed');

require('dotenv').load('../../.env');

describe('users model', () => {
  it('should accept valid user entries to database', (done) => {
    const user = new UserModel({
      twitter: {
        id: '234',
        displayName: 'Hamlet the Dane',
        pic: 'pic',
      },
      photos: [{photoId: new ObjectID()}, {photoId: new ObjectID()}, {photoId: new ObjectID()}]
    });
    user
      .save()
      .then(() => done())
      .catch((error) => done);
  });
  it('should reject user entries without an id string', (done) => {
    const user = new UserModel({
      twitter: {
        displayName: 'Hamlet the Dane',
        pic: 'pic',
      },
      photos: [{photoId: new ObjectID()}, {photoId: new ObjectID()}, {photoId: new ObjectID()}]
    });
    user
      .save()
      .then((res) => {
        done(new Error('Expected user to not be accepted'));
      })
      .catch((error) => {
        expect(error).toExist();
        done();
      });
  });
  it('should reject user entries without a displayName', (done) => {
    const user = new UserModel({
      twitter: {
        id: '1234',
        pic: 'pic',
      },
      photos: [{photoId: new ObjectID()}, {photoId: new ObjectID()}, {photoId: new ObjectID()}]
    });
    user
      .save()
      .then((res) => {
        done(new Error('Expected user to not be accepted'));
      })
      .catch((error) => {
        expect(error).toExist();
        done();
      });
  });
  it('should reject user entries without a profile img', (done) => {
    const user = new UserModel({
      twitter: {
        id: '1234',
        displayName: 'Hamlet the Dane',
      },
      photos: [{photoId: new ObjectID()}, {photoId: new ObjectID()}, {photoId: new ObjectID()}]
    });
    user
      .save()
      .then((res) => {
        done(new Error('Expected user to not be accepted'));
      })
      .catch((error) => {
        expect(error).toExist();
        done();
      });
  });
  it('should reject user entries with invalid photo entries', (done) => {
    const user = new UserModel({
      twitter: {
        id: '1234',
        displayName: 'Hamlet the Dane',
      },
      photos: [{photoId: ''}, {photoId: new ObjectID()}, {photoId: new ObjectID()}]
    });
    user
      .save()
      .then((res) => {
        done(new Error('Expected user to not be accepted'));
      })
      .catch((error) => {
        expect(error).toExist();
        done();
      });
  });
});

describe('photos model', () => {
  it('should accept valid photo entries to database', (done) => {
    const creator = {
      _id: new ObjectID(),
      displayName: 'Rosencrantz & Guildenstern',
    };

    let photo = new PhotoModel({url: 'http://tjscollins.me', desc: 'My Home page', creator});

    photo
      .save()
      .then(() => done())
      .catch((err) => done);
  });

  it('should reject photo entries with malformed URLs', (done) => {
    const creator = {
      _id: new ObjectID(),
      displayName: 'Rosencrantz & Guildenstern',
    };
    let photo = new PhotoModel({url: 'http://tjscollinsme', desc: 'My Home page', creator});
    photo
      .save()
      .then((res) => {
        done(new Error('Expected photo to not be accepted'));
      })
      .catch((err) => {
        expect(err).toExist();
        done();
      });
  });

  it('should reject photo entries without descriptions', (done) => {
    const creator = {
      _id: new ObjectID(),
      displayName: 'Rosencrantz & Guildenstern',
    };
    let photo = new PhotoModel({url: 'http://tjscollins.me', creator});
    photo
      .save()
      .then((res) => {
        done(new Error('Expected photo to not be accepted'));
      })
      .catch((err) => {
        expect(err).toExist();
        done();
      });
  });

  it('should reject photo entries without a creator', (done) => {
    let photo = new PhotoModel({url: 'http://tjscollins.me', desc: 'My Home page'});
    photo
      .save()
      .then((res) => {
        done(new Error('Expected photo to not be accepted'));
      })
      .catch((err) => {
        expect(err).toExist();
        done();
      });
  });
});
