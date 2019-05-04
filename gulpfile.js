'use strict';

const gulp = require('gulp');
const path = require('path');
const sass = require('gulp-sass');
const imageMin = require('gulp-imagemin');
const gutil = require('gulp-util');
const uglify = require('gulp-uglify');

const src = path.resolve('./assets/');
const dist = path.resolve('./public/');


gulp.task('sass', function () {
    return gulp.src(`${src}/scss/**/*.scss`)
        .pipe(sass({includePaths: ['node_modules/normalize-scss/sass/', 'node_modules/bourbon/app/assets/stylesheets']})
            .on('error', sass.logError))
        .pipe(gulp.dest(`${dist}/css`));
});

gulp.task('imagemin', function () {
    return gulp.src('assets/images/**/*.{png,svg,ico,gif,jpg,webp}')
        .pipe(imageMin({
            progressive: true,
            interlaced: true,
            svgoPlugins: [{ removeViewBox: false }, { removeUselessStrokeAndFill: false }]
        }))
        .pipe(gulp.dest('public/images/'));
});

gulp.task('sw-toolbox', () => {
    return gulp.src('node_modules/sw-toolbox/sw-toolbox.js')
        .pipe(uglify().on('error', gutil.log))
        .pipe(gulp.dest('./public'));
});

gulp.task('sass:watch', function () {
    gulp.watch(`${src}/scss/**/*.scss`, ['sass']);
});

gulp.task('imagemin:watch', function () {
    gulp.watch(`${src}/images/*`, ['imagemin'])
});

gulp.task('default', gulp.parallel(
    gulp.task('sass'),
    gulp.task('imagemin'),
    gulp.task('sw-toolbox')
));

gulp.task('dev', gulp.parallel(
    gulp.task('sass:watch'),
    gulp.task('imagemin:watch')
));

exports.dev = gulp.task('dev');
exports.default = gulp.task('default');
