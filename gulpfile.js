'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    maps = require('gulp-sourcemaps'),
    cleanCSS = require('gulp-clean-css'),
    livereload = require('gulp-livereload');


// Compiles all Sass file into CSS (doesn't minify)
gulp.task("compileSass", function() {
    return gulp.src('scss/app.scss')
        .pipe(maps.init())
        .pipe(sass({ includePaths: ['./bower_components/foundation/scss'] }))
        .pipe(cleanCSS())
        .pipe(maps.write("./"))
        .pipe(gulp.dest('css'))
        .pipe(livereload());
});

gulp.task("htmlUpdated", function() {
    return gulp.src('index.html')
    .pipe(livereload());
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch("scss/**/*.scss", ['compileSass']);
    gulp.watch("index.html", ['htmlUpdated']);
});

gulp.task('default', ['compileSass']);