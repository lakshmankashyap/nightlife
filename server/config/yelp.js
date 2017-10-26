'use strict';

const yelp = require('yelp-fusion');

const {YELP_CLIENT_ID, YELP_CLIENT_SECRET} = process.env;

const token = yelp.accessToken(YELP_CLIENT_ID, YELP_CLIENT_SECRET).then(response => {
  return response.jsonBody.access_token;
}).catch(e => {
  console.log(e);
});

module.exports = { token };
