const express = require('express');
const controller = require('./user.controller');
const { authenticate } = require('../../middleware/authenticate');

const router = express.Router();

router.get('/me', authenticate, controller.me);
router.post('/', controller.create);
router.post('/login', controller.login);
router.get('/logout', authenticate, controller.logout);

module.exports = router;
