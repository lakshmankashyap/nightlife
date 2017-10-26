const express = require('express');
const controller = require('./bar.controller');
const { authenticate } = require('../../middleware/authenticate');

const router = express.Router();

router.get('/', controller.search);
router.post('/vote', authenticate, controller.vote);

module.exports = router;
