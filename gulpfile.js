require('6to5/polyfill');
var Promise = global.Promise = require('bluebird');
var _ = require('lodash-next');

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var del = require('del');
var envify = require('envify');
var es6to5 = require('gulp-6to5');
var gulp = require('gulp');
var gutil = require('gulp-util');
var insert = require('gulp-insert');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core')({ cascade: true });
var cssmqpacker = require('css-mqpacker');
var csswring = require('csswring');
var react = require('gulp-react');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var style = require('gulp-nexus-react-style');
var stylish = require('jshint-stylish');

var dev = process.env.NODE_ENV !== 'production';
if(dev) {
  console.log('gulp started in DEVELOPMENT mode. Set NODE_ENV="production" before deploying.');
}
else {
  console.log('gulp started in PRODUCTION mode. Set NODE_ENV="development" to get more runtime-checks.');
}

function lint() {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
  .pipe(plumber())
  .pipe(react())
  .pipe(jshint({
    globals: {
      Promise: true,
    },
    esnext: true,
    sub: true,
  }))
  .pipe(jshint.reporter(stylish));
}

function bundle() {
  var b = browserify({
    fullPaths: false,
    entries: ['dist/client/main.js'],
    debug: DEV,
    ignoreMissing: ['promise'],
  });
  b.transform('brfs');
  b.transform(envify({ NODE_ENV: DEV }));

  return r.bundle()
  .pipe(plumber())
  .pipe(source('c.js'))
  .pipe(buffer())
  .pipe(gulp.dest('dist'));
}

function componentsCSS() {
  return gulp.src('src/**/*.jsx')
  .pipe(plumber())
  .pipe(react())
  .pipe(insert.prepend('require(\'6to5/polyfill\');\nconst Promise = require(\'bluebird\');\n'))
  .pipe(rename({ extname: '.js' }))
  .pipe(es6to5())
  .pipe(style())
  .pipe(sourcemaps.init())
  .pipe(postcss(autoprefixer))
  .pipe(concat('components.css'))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));
}

function build() {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(react())
  .pipe(insert.prepend('require(\'6to5/polyfill\');\nconst Promise = require(\'bluebird\');\n'))
  .pipe(rename({ extname: '.js' }))
  .pipe(es6to5())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));
}

function clean() {
  del(['dist']);
}

function public() {
  return gulp.src([
    'bower_components/history.js/scripts/bundled/html4+html5/native.history.js',
    'bower_components/normalize.css/normalize.css',
    'dist/c.js',
  ])
  .pipe(plumber())
  .pipe(gulp.dest('public'));
}

function packJS() {
  return gulp.src(['public/**/*.js', '!public/p.js', '!public/p.min.js'])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(concat('p.js'))
  .pipe(DEV ? gulp.noop() : uglify())
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));
}

function packCSS() {
  return gulp.src(['public/**/*css', '!public/p.css', '!public/p.min.css'])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(concat('p.css'))
  .pipe(DEV ? gulp.noop() : postcss([cssmqpacker, csswring]))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('dist'));
}

function pack() {
  return merge(packCSS(), packJS());
}

gulp.task('clean', clean);

gulp.task('build', function() {
  // Promisify stream
  function p(s) {
    return function() { return new Promise(function(y, n) { s.on('error', n).on('end', y); }); };
  }
  // Execute concurrently when its possible
  return p(clean())()
  .then(function() { return p(merge(lint(), build(), componentsCSS())); })
  .then(function() { return p(bundle()); })
  .then(function() { return p(public()); })
  .then(function() { return p(pack()); })
});

gulp.task('default', ['build']);
