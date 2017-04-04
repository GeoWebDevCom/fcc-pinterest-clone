'use strict';

const TwitterStrategy = require('passport-twitter').Strategy;
const User = require('../models/users');
const configAuth = require('./auth');

const registerTwitterUser = function(token, refreshToken, profile, done) {
  process
    .nextTick(function() {
      User
        .findOne({
          'twitter.id': profile.id
        }, function(err, user) {
          if (err) {
            return done(err);
          }

          if (user) {
            return done(null, user);
          } else {
            const newUser = new User();
            newUser.twitter.id = profile.id;
            newUser.twitter.displayName = profile.displayName;

            newUser.save(function(err) {
              if (err) {
                throw err;
              }

              return done(null, newUser);
            });
          }
        });
    });
};

exports.registerTwitterUser = registerTwitterUser;

exports.default = function(passport) {
  passport
    .serializeUser(function(user, done) {
      done(null, user.id);
    });

  passport.deserializeUser(function(id, done) {
    User
      .findById(id, function(err, user) {
        done(err, user);
      });
  });

  passport.use(new TwitterStrategy({
    consumerKey: configAuth.twitterAuth.consumerKey,
    consumerSecret: configAuth.twitterAuth.consumerSecret,
    callbackURL: configAuth.twitterAuth.callbackURL
  }, registerTwitterUser));
};
