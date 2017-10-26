const { ObjectID } = require('mongodb');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = process.env;

const userOneId = new ObjectID();
const userTwoId = new ObjectID();

const users = [{
  _id: userOneId,
  email: 'fausto@example.com',
  password: 'userOnePass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userOneId, access: 'auth'}, JWT_SECRET).toString()
  }]
}, {
  _id: userTwoId,
  email: 'userTwo@example.com',
  password: 'userTwoPass',
  tokens: [{
    access: 'auth',
    token: jwt.sign({_id: userTwoId, access: 'auth'}, JWT_SECRET).toString()
  }]
}];

module.exports = { users };
