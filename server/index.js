require('dotenv').config();
require('./src/config/db');
const express = require('express');
const cors = require('cors');
// const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Enable cors
const corsOptions = {
  exposedHeaders: 'x-auth' // 'Access-Control-Expose-Headers'
};
app.use(cors(corsOptions));

// Routes
app.use('/api/users', require('./src/api/user'));
app.use('/api/bars', require('./src/api/bar'));

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app };
