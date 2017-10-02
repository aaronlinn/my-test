var gulp = require('gulp');

// Plug-ins
var sass = require('gulp-sass'),
    htmlclean = require('gulp-htmlclean'),
    include = require("gulp-include"),
    uglify = require('gulp-uglify'),
    del = require('del'),
    zip = require('gulp-zip');


// HTML default pages - minify src and place in /build
gulp.task('htmlDefault', function() {
    return gulp.src('../_html/*.html')
        .pipe(htmlclean({
            protect: /<\!--%fooTemplate\b.*?%-->/g,
            edit: function(html) { return html.replace(/\begg(s?)\b/ig, 'omelet$1'); }
        })) // Minification using gulp-htmlclean
        .pipe(gulp.dest('build'))
});

// SCSS - parse and place in /build/css
gulp.task('sass', function() {
    return gulp.src('src/scss/**/*.scss')
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(gulp.dest('build/css'))
});

// JS - include needed files, minimize and place in /build/js
gulp.task('js', function() {
    return gulp.src('src/js/**/*.js')
        .pipe(include())
        .pipe(uglify())
        .pipe(gulp.dest('build/js'))
});

// Images - src to /build/img
gulp.task('images', function() {
   return gulp.src('src/img/**/*')
       .pipe(gulp.dest('build/img'))
});

// Delete archived.zip in build folder
gulp.task('clean-zip', function() {
    return del(['build/*.zip']);
});

// Zip all items in the build folder - Run clean-zip as dependency first
gulp.task('zip', ['clean-zip', 'htmlDefault', 'sass', 'js', 'images'], function() {
    return gulp.src('build/**/*')
        .pipe(zip('archive.zip'))
        .pipe(gulp.dest('build'))
});

// Watch files
gulp.task('watch', function() {
    gulp.watch('../_html/*.html', ['zip']);
    gulp.watch('src/scss/**/*.scss', ['zip']);
    gulp.watch('src/js/**/*.js', ['zip']);
    gulp.watch('src/img/**/*', ['zip']);
});

// Enables you to run gulp command and order the tasks you want to run
gulp.task('default', ['watch', 'zip']);