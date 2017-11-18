const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const testsSchema =  Schema({
  course: {
    type: Schema.Types.ObjectId,
    ref: 'Courses'
  },
  questions: Array,
});

module.exports = mongoose.model('Tests', testsSchema);
