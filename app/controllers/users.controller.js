const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coursesSchema =  Schema({
  first_name: String,
  last_name: String,
  email: String,
  courses: Array,
  tests: Array
});

module.exports = mongoose.model('Users', booksSchema);
