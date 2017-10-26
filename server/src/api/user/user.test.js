const expect = require('expect');
const request = require('supertest');
const { app } = require('../../../index');
const User = require('./user.model');
const { users } = require('../../config/seed');

/* eslint-disable no-undef */
beforeEach(done => {
  User.remove({}).then(() => {
    // Save returns a Promise
    let userOne = new User(users[0]).save();
    let userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
});

describe('GET /api/users/me', () => {
  it('should return user if authenticated', function (done) {
    let user = users[0];

    request(app)
      .get('/api/users/me')
      .set('x-auth', user.tokens[0].token)
      .expect(200)
      .expect(res => {
        expect(res.body.user._id).toBe(user._id.toHexString());
        expect(res.body.user.email).toBe(user.email);
      })
      .end(done);
  });

  it('should return a 401 if not authenticated', (done) => {
    request(app)
      .get('/api/users/me')
      .expect(401)
      .expect(res => {
        expect(res.body).toEqual({message: 'jwt must be provided', name: 'JsonWebTokenError'});
      })
      .end(done);
  });
});

describe('POST /api/users', () => {
  it('should create an user', (done) => {
    let email = 'example@email.com';
    let password = 'somepass';
    let passwordRepeat = password;

    request(app)
      .post('/api/users')
      .send({email, password, passwordRepeat})
      .expect(200)
      .expect(res => {
        expect(res.body._id).toBeTruthy();
        expect(res.body.email).toBe(email);
      })
      .end(err => {
        if (err) {
          return done(err);
        }
        User.findOne({email}).then((user) => {
          expect(user).toBeTruthy();
          expect(user.password).not.toBe(password);
          done();
        }).catch(e => done(e));
      });
  });

  it('should return validations errors if request is invalid', (done) => {
    let email = 'wrongemail.com';
    let password = 'pass';

    request(app)
      .post('/api/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });

  it('should return validations errors if missing passwordRepeat', (done) => {
    let email = 'some@email.com';
    let password = 'password';

    request(app)
      .post('/api/users')
      .send({email, password})
      .expect(400)
      .end(done);
  });

  it('should return validations errors if password and passwordRepeat are not the same', (done) => {
    let email = 'some@email.com';
    let password = 'password';
    let passwordRepeat = 'password123';
    request(app)
      .post('/api/users')
      .send({email, password, passwordRepeat})
      .expect(400)
      .end(done);
  });
});

describe('POST /api/users/login', () => {
  it('should login successfuly', (done) => {
    let user = users[0];

    request(app)
      .post('/api/users/login')
      .send({email: user.email, password: user.password})
      .expect(200)
      .expect(res => {
        expect(res.body.email).toBe(user.email);
        expect(res.headers['x-auth']).toBeTruthy();
      })
      .end(done);
  });

  it('should not be able to login', (done) => {
    request(app)
      .post('/api/users/login')
      .send({email: 'wrong@email.com', password: 'password'})
      .expect(400)
      .expect(res => {
        expect(res.body).toEqual({});
      })
      .end(done);
  });
});
