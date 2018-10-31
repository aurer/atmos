var server = require('browser-sync');
var gulp = require('gulp');
var scss = require('gulp-sass');
var plumber = require('gulp-plumber');
var config = require('./config.json');

var src = './assets';
var dist = './public';

// Compile sass
gulp.task('scss', function() {
	gulp.src([`${src}/scss/main.scss`])
		.pipe(plumber())
		.pipe(scss())
		.pipe(gulp.dest(`${dist}/css`))
		.pipe(server.stream());
});

// Compile JS
gulp.task('js', function() {
	return gulp.src(`${src}/js/main.js`)
		.pipe(plumber())
		.pipe(gulp.dest(`${dist}/js`))
		.pipe(server.stream());
});

// Watch for changes
gulp.task('watch', function() {
	gulp.watch(`${src}/scss/**/*.scss`, ['scss']);
	gulp.watch(`${src}/js/**/*.js`, ['js']);
});

// Setup local server with injection
gulp.task('serve', function() {
	server.init({
		proxy: 'localhost:' + config.port,
		notify: false
	});
});

gulp.task('default', ['scss', 'js']);
gulp.task('dev', ['default', 'watch', 'serve']);
