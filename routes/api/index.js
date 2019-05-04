'use strict';
const courses = require('../../app/controllers/courses.controller');

module.exports = () => {

    let router = require('express').Router();

    router.route('/courses')
      .get(courses.listCourses)
      .post(courses.createCourse);
    
    router.route('/courses/:courseId')
      .get(courses.getCourse)
      .put(courses.updateCourse)
      .delete(courses.deleteCourse);

    return router;
};
