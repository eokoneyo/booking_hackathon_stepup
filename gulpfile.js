'use strict';

const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');

const src = path.resolve('./assets/');
const dist = path.resolve('./public/');


gulp.task('sass', function () {
    return gulp.src(`${src}/scss/**/*.scss`)
        .pipe(sass({includePaths: ['./node_modules/normalize-scss/sass/']}).on('error', sass.logError))
        .pipe(gulp.dest(`${dist}/css`));
});

gulp.task('sass:watch', function () {
    gulp.watch(`${src}/scss/**/*.scss`, ['sass']);
});


gulp.task('default', ['sass']);

gulp.task('dev', ['sass:watch']);