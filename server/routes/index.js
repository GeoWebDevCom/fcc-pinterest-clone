'use strict';
/*eslint-disable require-jsdoc*/
const PhotoModel = require('../models/photos');

const path = process.cwd();

const sendIndex = (req, res) => {
  res.sendFile(`${path}/public/index.html`);
};

module.exports = function(app, passport) {
  function isLoggedIn(req, res, next) {
    /*istanbul ignore next: not sure how to fake req.isAuthenticated() for tests*/
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  }

  app
    .route('/')
    .get(sendIndex);

  app
    .route('/photos')
    .get((req, res) => {
      PhotoModel
        .find({})
        .then((photos) => {
          res
            .status(200)
            .send({photos});
        })
        .catch(console.error);
    });

  // app   .route('/login')   .get(sendIndex);
  //
  // app   .route('/logout')   .get(function(req, res) {     req.logout();
  // res.redirect('/login');   });
  //
  // app   .route('/profile')   .get(isLoggedIn, sendIndex);
  //
  app
    .route('/api/me')
    .get(isLoggedIn,
    /*istanbul ignore next: not sure how to fake req.isAuthenticated() for tests*/
    function(req, res) {
      res.json(req.user);
    });

  app
    .route('/auth/twitter')
    .get(passport.authenticate('twitter'));

  app
    .route('/auth/twitter/callback')
    .get(passport.authenticate('twitter', {
      successRedirect: '/',
      failureRedirect: '/'
    }));
};
