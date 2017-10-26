const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const DB_NAME = (process.env.NODE_ENV === 'test') ? 'NightlifeAppTest' : 'NightlifeApp';
const { DB_HOST, DB_PORT, MONGODB_URI } = process.env;
const DB_URI = MONGODB_URI || `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

mongoose.connect(DB_URI, {
  useMongoClient: true
});
