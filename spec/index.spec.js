const { expect } = require('chai');
const app = require('../app.js');
const request = require('supertest')(app);

  describe('/*', () => {
    it('GET invalid path returns status 404 and message Page not found', () => {
      return request
        .get('/hello')
        .expect(404)
        .then((res) => {
          expect(res.body.msg).to.equal('Page not found');
        });
    });
  });
  describe('/api/exchange', () => {
    describe('/api/exchange', () => {
      it('GET site returns status 200 and object with exchange rate', () => {
        return request
          .get(`/api/exchange?fiat=usd&crypto=btc`)
          .expect(200)
          .then((res) => {
            expect(res.body).to.include.keys(
              "cryptocurrency",
              "Fiat Currency",
              "Exchange rate",
              "last updated"
            );
          });
      });
    });
  });