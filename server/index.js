require('dotenv').config();
require('./src/config/db');
const express = require('express');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(`${__dirname}/`, 'dist')));

// Enable cors
const corsOptions = {
  exposedHeaders: 'x-auth' // 'Access-Control-Expose-Headers'
};
app.use(cors(corsOptions));

// Routes
app.use('/api/users', require('./src/api/user'));
app.use('/api/bars', require('./src/api/bar'));

// Since this is a SPA, for other routes send the index.html
// This fix the reload issue
app.get('*', (req, res) => {
  res.sendFile(path.join(`${__dirname}/dist`, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = { app };
