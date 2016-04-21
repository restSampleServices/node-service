var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    del = require('del');


gulp.task('ServiceScripts', function () {
    return gulp.src('./src/rest/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('rest.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
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