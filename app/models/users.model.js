const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usersSchema =  Schema({
  first_name: String,
  last_name: String,
  email: String,
  courses: Array,
  tests: Array
});

module.exports = mongoose.model('Users', usersSchema);
