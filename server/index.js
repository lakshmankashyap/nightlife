require('dotenv').config();
require('./config/db');
const express = require('express');
// const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Routes
app.use('/api/users', require('./api/user'));
app.use('/api/bars', require('./api/bar'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app };
