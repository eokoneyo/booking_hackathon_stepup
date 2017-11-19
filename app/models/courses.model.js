const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const coursesSchema =  Schema({
  title: String,
  category: String,
  material: String,
  summary: String
});

module.exports = mongoose.model('Courses', coursesSchema);
