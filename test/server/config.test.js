/*global describe it beforeEach done*/
const expect = require('expect');
const request = require('supertest');
const sinon = require('sinon');
const passport = require('passport');
const User = require('./../../server/models/users.js');
const {users, populateServer} = require('./seed');

require('dotenv').load('../../.env');
require('../../server/config/passport').default(passport);

beforeEach((done) => {
  populateServer(done);
});

describe('Passport Configuration', () => {
  it('should register a TWITTER STRATEGY', () => {
    let {twitter} = passport._strategies;
    expect(twitter).toExist();
    expect(twitter.name).toBe('twitter');
  });

  it('should register serializeUser', () => {
    let [serializeUser] = passport._serializers;
    expect(serializeUser).toExist();
    let spy = sinon.spy();
    serializeUser({id: '1'}, spy);
    expect(spy.calledOnce).toBe(true);
  });

  it('should register deserializeUser', (done) => {
    let [deserializeUser] = passport._deserializers;
    expect(deserializeUser).toExist();
    deserializeUser(users[0]._id, (err, user) => {
      done();
    });
  });

  it('should register new users in the database', (done) => {
    const {registerTwitterUser} = require('../../server/config/passport');
    let profile = {
      id: '234',
      displayName: 'Slartibartfast',
    };
    registerTwitterUser(null, null, profile, (err, user)=> {
      User.findOne({'twitter.id': '234'}, (err, user) => {
        if(err) {
          done(err);
        }
        expect(user).toExist();
        expect(user.twitter.displayName).toBe('Slartibartfast');
        done();
      });
    });
  });

  it('should return existing users in the database rather than overwriting them', (done) => {
    const {registerTwitterUser} = require('../../server/config/passport');
    let profile = {
      id: '123',
      displayName: 'Slartibartfast',
    };
    registerTwitterUser(null, null, profile, (err, user) =>{
      User.findOne({'twitter.id': '123'}, (err, user) => {
        if(err) {
          done(err);
        }
        expect(err).toBe(null);
        expect(user).toExist();
        expect(user.twitter.username).toBe(users[0].twitter.username);
        expect(user.twitter.displayName).toBe(users[0].twitter.displayName);
        done();
      });
    });
  });
});
