'use strict';
const courses = require('../../app/controllers/courses.controller')
const booking = require('../../app/controllers/booking.controller')

module.exports = () => {

    let router = require('express').Router();

    router.route('/courses')
      .get(courses.listCourses)
      .post(courses.createCourse);

    router.get('/getHotels', booking.getHotels);
    
    router.get('/getHotelReviews', booking.getHotelReviews);
    
    router.route('/courses/:courseId')
      .get(courses.getCourse)
      .put(courses.updateCourse)
      .delete(courses.deleteCourse);

    return router;

};
