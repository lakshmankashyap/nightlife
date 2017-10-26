const expect = require('expect');
const request = require('supertest');
const { app } = require('../../../index');
const Bar = require('./bar.model');

/* eslint-disable no-undef */
beforeEach(done => {
  Bar.remove({}).then(() => {
    done();
  });
});

describe('GET /api/bar/?location', () => {
  it('it should get all available bars for given location', (done) => {
    request(app)
      .get('/api/bars')
      .query({ location: 'San Francisco' })
      .expect(200)
      .expect(res => {
        expect(res.body.length).toBe(20);
      })
      .end(err => {
        if (err) {
          return done(err);
        }
        Bar.find({}).then(docs => {
          expect(docs.length).toBe(20);
          done();
        }).catch(err => done(err));
      });
  });
});
