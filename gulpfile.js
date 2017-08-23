'use strict';

// Directories
var src = 'src/',
    dist = 'dist/',
    lib = 'lib/';

// Load gulp
var gulp = require('gulp');

// Load other plugins
var del = require('del'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

// Define CSS task
gulp.task('styles', function() {
    return gulp.src(src + 'scss/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({ basename: 'styles' }))
        .pipe(gulp.dest(dist + 'css'));
});

// Define JS task
gulp.task('scripts', function() {
    var instance = browserify({
        entries: src + 'js/main.js',
        debug: true,
        transform: [babelify.configure({
            presets: ['es2015']
        })]
    });
    return instance.bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(rename({ basename: 'scripts' }))
        .pipe(gulp.dest(dist + 'js'));
});

// Define HTML copy task
gulp.task('copy-html', function() {
    return gulp.src(src + 'html/**')
        .pipe(gulp.dest(dist));
});

// Define images copy task
gulp.task('copy-img', function() {
    return gulp.src(src + 'img/**/*')
        .pipe(gulp.dest(dist + 'img'));
});

// Files removed from src/ may still linger in dist/
gulp.task('clean', function() {
    return del([dist + '**']);
});

// Watcher task
gulp.task('watch', function() {
    gulp.watch(src + 'js/*.js', ['scripts']); // JS
    gulp.watch(src + 'scss/**/*.scss', ['styles']); // CSS
    gulp.watch(src + 'html/*.html', ['copy-html']); // HTML
});

// Build only
gulp.task('build', ['clean'], function() {
    gulp.start('styles', 'scripts', 'copy-html', 'copy-img');
});

// Default task with watcher
gulp.task('default', ['clean'], function() {
    gulp.start('styles', 'scripts', 'copy-html', 'copy-img', 'watch');
});