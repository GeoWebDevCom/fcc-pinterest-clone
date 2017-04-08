'use strict';
/*eslint-disable require-jsdoc*/
const PhotoModel = require('../models/photos');
const UserModel = require('../models/users');

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
    .route('/profile')
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
    })
    .post((req, res) => {
      UserModel
        .findOne({_id: req.user._id})
        .then((user) => {
          if (!user) {
            res
              .status(400)
              .send(`No such user as ${req.user._id}`);
          }
          let photo = new PhotoModel({
            url: req.body.url,
            desc: req.body.desc,
            creator: {
              _id: user._id,
              displayName: user.twitter.displayName,
              profile_pic: user.twitter.pic,
            }
          });

          photo
            .save()
            .then((photo) => {
              // console.log(photo);
              res
                .status(200)
                .send(photo);
            })
            .catch((error) => {
              res
                .status(400)
                .send(error);
            });

        })
    });

  // app   .route('/login')   .get(sendIndex);
  //
  // app   .route('/logout')   .get(function(req, res) {     req.logout();
  // res.redirect('/login');   });
  //
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
