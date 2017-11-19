const Course = require('../models/courses.model');

module.exports = {
  createCourse,
  getCourse,
  listCourses,
  updateCourse,
  deleteCourse,
};

function createCourse(req, res){
  Course.create(req.body, (err, course) => {
    if(err) {
      res.json(err);
    }
    res.json(course)
  });
}

function listCourses(req, res){
  Course.find({}, (err, courses) => {
    if(err) {
      res.json(err);
    }
    res.json(courses)
  });
}

function getCourse(req, res){
  Course.findById(req.params.courseId, (err, course) => {
    if(err) {
      res.json(err);
    }
    res.json(course)
  });
}

function updateCourse(req, res){
  Course.findByIdAndUpdate(req.params.courseId, {$set: req.body}, {new: true}, (err, response)=> {
    if(err) {
      res.json(err);
    }
    res.json(response)
  });
}

function deleteCourse(req, res){
  Course.remove(req.params.courseId, (err, response) => {
    if(err) {
      res.json(err);
    }
    res.json(response);
  });
}
