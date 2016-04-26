var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    asciidoctor = require('gulp-asciidoctor'),
    del = require('del');

var PATH_IN_SRC = 'src/';
var PATH_IN_SPECS = 'spec/';
var PATH_IN_DOC = 'doc/';


var PATH_OUT = 'dist/';
var PATH_OUT_BUILD = PATH_OUT + 'build/';
var PATH_OUT_PACKAGE = PATH_OUT + 'package/';
var PATH_OUT_TESTRESULT = PATH_OUT + 'testresults/';
var PATH_OUT_DOC = PATH_OUT + 'doc/';

gulp.task('ServiceScripts', function () {
    return gulp.src('./src/rest/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('rest.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(PATH_OUT_TESTRESULT));
});

gulp.task('doc', function () {
    return gulp.src(PATH_IN_DOC + '**/*.adoc')
        .pipe(asciidoctor({
            header_footer: false,
            safe: 'secured',
            //doctype:'article',
            ////book,
            //inline header_footer: true, // true or false 
            attributes: ['showtitle']
        }))
        /*.pipe(asciidoctor({
            attributes: ['silverlight']
        }))*/
        .pipe(gulp.dest(PATH_OUT_DOC));
});

gulp.task('lint', function () {
    return gulp.src('src/rest/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'));
});

/*
gulp.task('images', function() {
  return gulp.src('src/images/*.png')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/images'))
    .pipe(notify({ message: 'Images task complete' }));
});
*/

gulp.task('clean', function () {
    return del(['dist/*']);
});

gulp.task('default', ['clean'], function () {
    gulp.start('ServiceScripts');
    //parallel tasks
    //gulp.start('ServiceScripts', 'ClientScripts', 'ClientAssets');
});