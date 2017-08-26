// Directories
const
    src = 'src/',
    dist = 'dist/',
    lib = 'lib/';

// Load gulp
const gulp = require('gulp');

// Load other plugins
const
    del = require('del'),
    rename = require('gulp-rename'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    browserify = require('browserify'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer');

// Define CSS task
gulp.task('styles', () => {
    return gulp.src(src + 'scss/main.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({ basename: 'styles' }))
        .pipe(gulp.dest(dist + 'css'));
});

// Define JS task
gulp.task('scripts', () => {
    const instance = browserify({
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
gulp.task('copy-html', () => {
    return gulp.src(src + 'html/**')
        .pipe(gulp.dest(dist));
});

// Define images copy task
gulp.task('copy-img', () => {
    return gulp.src(src + 'img/**/*')
        .pipe(gulp.dest(dist + 'img'));
});

// Files removed from src/ may still linger in dist/
gulp.task('clean', () => {
    return del([dist + '**']);
});

// Watcher task
gulp.task('watch', () => {
    gulp.watch(src + 'js/*.js', ['scripts']); // JS
    gulp.watch(src + 'scss/**/*.scss', ['styles']); // CSS
    gulp.watch(src + 'html/*.html', ['copy-html']); // HTML
});

// Build only
gulp.task('build', ['clean'], () => {
    gulp.start('styles', 'scripts', 'copy-html', 'copy-img');
});

// Default task with watcher
gulp.task('default', ['clean'], () => {
    gulp.start('styles', 'scripts', 'copy-html', 'copy-img', 'watch');
});