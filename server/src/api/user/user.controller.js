const _ = require('lodash');
const User = require('./user.model');

const me = (req, res) => {
  res.send(req.user);
};

const create = (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);
  if (_.isEmpty(body.email) || _.isEmpty(body.password)) {
    return res.status(400).send({errors: ['Some of the fields are not set.']});
  }

  if (_.has(req.body, 'passwordRepeat') && body.password === req.body.passwordRepeat) {
    let user = new User(body);

    user.save().then(() => {
      return user.generateAuthToken();
    }).then((token) => {
      res.header('x-auth', token).send(user);
    }).catch(err => {
      if (err.code === 11000) {
        res.status(400).send({errors: ['Email is already taken.']});
      } else {
        res.status(400).send({errors: ['Password is shorter than the minimum allowed length (6)']});
      }
    });
  } else {
    res.status(400).send({errors: ['Password and Repeat Password must be equals.']});
  }
};

const login = (req, res) => {
  let body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then(user => {
    user.generateAuthToken().then(token => {
      res.header('x-auth', token).send(user);
    });
  }).catch(err => {
    res.status(400).send(err);
  });
};

const logout = (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(200).send();
  }).catch(err => res.status(400).send(err));
};

module.exports = { me, create, login, logout };
