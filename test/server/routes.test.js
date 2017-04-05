/*global describe it*/
const expect = require('expect');
const request = require('supertest');

const {app} = require('./../../server.js');

describe('Server Routes', () => {
  describe('/', () => {
    describe('GET', () => {
      it('should respond with success 200', (done) => {
        request(app)
          .get('/')
          .send()
          .expect(200)
          .end((err, res) => {
            if (err)
              return done(err);
            done();
          });
      });
    });
  });

  describe('/photos', () => {
    describe('GET', () => {
      it('should respond with a list of photos from the database', (done) => {
          request(app)
          .get('/photos')
          .send()
          .expect(200)
          .end((err, res) => {
            if(err)
              return done(err);

            let {photos} = res.body;
            expect(photos).toExist();
            expect(photos.length).toBe(4);
            expect(photos[0].url).toExist();
            done();
          });
      });
    });
  });

  // describe('/login', () => {
  //   describe('GET', () => {
  //     it('should respond with success 200', (done) => {
  //       request(app)
  //         .get('/login')
  //         .send()
  //         .expect(200)
  //         .end((err, res) => {
  //           if (err)
  //             return done(err);
  //           done();
  //         });
  //     });
  //   });
  // });
  //
  // describe('/logout', () => {
  //   describe('GET', () => {
  //     it('should redirect to login after logout', (done) => {
  //       request(app)
  //         .get('/logout')
  //         .send()
  //         .expect(302)
  //         .end((err, res) => {
  //           if (err)
  //             return done(err);
  //           done();
  //         });
  //     });
  //   });
  // });
  //
  // describe('/profile', () => {
  //   describe('GET', () => {
  //     it('should redirect an unauthenticated user', (done) => {
  //       request(app)
  //         .get('/profile')
  //         .send()
  //         .expect(302)
  //         .end((err, res) => {
  //           if (err)
  //             return done(err);
  //           done();
  //         });
  //     });
  //   });
  // });
  //
  describe('/api/me', () => {
    describe('GET', () => {
      it('should redirect an unauthenticated user', (done) => {
        request(app)
          .get('/api/me')
          .send()
          .expect(302)
          .end((err, res) => {
            if (err)
              return done(err);
            done();
          });
      });
    });
  });
});
