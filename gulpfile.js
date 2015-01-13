var gulp = require('gulp');
var gutil = require('gulp-util');
var gulpif = require('gulp-if');
var filter = require('gulp-filter');
var compass = require('gulp-compass');
var plumber = require('gulp-plumber');
var bower = require('gulp-bower');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');
var mainBowerFiles = require('main-bower-files');
var del = require('del');

// Configuration.
var baseDestPath = './public/assets';
var baseDestLibsPath = baseDestPath + '/libs';
var baseSrcPath = './resources';
var config = {
    src: {
        // Compass configuration.
        configFile: baseSrcPath + '/config.rb',
        // SASS directory.
        sass: baseSrcPath + '/sass',
        js: baseSrcPath + '/js'
    },
    // Individual static files path of this project.
    dest: {
        js: baseDestPath + '/js',
        css: baseDestPath + '/css',
        images: baseDestPath + '/images',
        font: baseDestPath + '/fonts'
    },
    // Individual static files path of 3rd party products.
    lib: {
        js: baseDestLibsPath + '/js',
        css: baseDestLibsPath + '/css',
        images: baseDestLibsPath + '/images',
        font: baseDestLibsPath + '/fonts'
    }
}

// Attach 3rd party products by Bower.
// Gulp doesn't compress any file when Gulp has --dev switch.
gulp.task('bower', function(){
    var jsFilter = filter('**/*.js');
    var cssFilter = filter('**/*.css');
    var imageFilter = filter(['**/*.png', '**/*.jpg', '**/*.gif']);
    gulp.src(mainBowerFiles())
        .pipe(jsFilter)
        .pipe(gulpif(!gutil.env.dev, uglify()))
        .pipe(gulp.dest(config.lib.js))
        .pipe(jsFilter.restore())
        .pipe(cssFilter)
        .pipe(gulpif(!gutil.env.dev, minify()))
        .pipe(gulp.dest(config.lib.css))
        .pipe(cssFilter.restore())
        .pipe(imageFilter)
        .pipe(gulp.dest(config.lib.images));
});

// Build stylesheets by Compass.
gulp.task('compass', function(){
    gulp.src([config.src.sass + '/**/*.scss'])
        .pipe(plumber({errorHandler: console.log}))
        .pipe(compass({
            config_file: config.src.configFile,
            sass: config.src.sass
        }))
        .pipe(gulpif(!gutil.env.dev, minify()))
        .pipe(gulp.dest(config.dest.css));
});

// Compass task will perform when some files change while performing this task.
gulp.task('watch', function(){
    gulp.watch(config.src.sass + '/**/*.scss', ['compass']);
    gulp.watch(config.src.js + '/**/*.js', function(){
        gulp.src([config.src.js + '/**/*.js'])
            .pipe(gulpif(!gutil.env.dev, uglify()))
            .pipe(gulp.dest(config.dest.js));
    });
});

// Gulp will perform this task when Gulp doesn't specify any task.
// Gulp doesn't compress any file when Gulp has --dev switch.
gulp.task('default', ['watch']);