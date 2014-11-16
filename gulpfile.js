require('6to5/polyfill');
var Promise = global.Promise = require('bluebird');
var _ = require('lodash-next');

var autoprefixer = require('autoprefixer-core')({ cascade: true });
var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var cssmqpacker = require('css-mqpacker');
var csswring = require('csswring');
var del = require('del');
var envify = require('envify');
var es6to5 = require('gulp-6to5');
var gulp = require('gulp');
var gutil = require('gulp-util');
var insert = require('gulp-insert');
var jshint = require('gulp-jshint');
var plumber = require('gulp-plumber');
var postcss = require('gulp-postcss');
var react = require('gulp-react');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var style = require('gulp-react-nexus-style');
var stylish = require('jshint-stylish');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

var DEV = process.env.NODE_ENV !== 'production';
if(DEV) {
  console.log('gulp started in DEVELOPMENT mode. Set NODE_ENV="production" before deploying.');
}
else {
  console.log('gulp started in PRODUCTION mode. Set NODE_ENV="development" to get more runtime-checks.');
}
// Promisify stream
function P(s) {
  return function() { return new Promise(function(y, n) { s.on('error', n).on('end', y); }); };
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

  return b.bundle()
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
  .pipe(postcss([autoprefixer]))
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
  return Promise.try(function() { del.sync(['dist', 'public/p.js', 'public/p.css', 'public/p.min.js', 'public/p.min.css', 'public/native.history.js', 'public/normalize.css']); });
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
  .pipe(DEV ? gutil.noop() : uglify())
  .pipe(DEV ? gutil.noop() : rename({ extname: '.min.js' }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public'));
}

function packCSS() {
  return gulp.src(['public/**/*.css', '!public/p.css', '!public/p.min.css'])
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(concat('p.css'))
  .pipe(DEV ? gutil.noop() : postcss([cssmqpacker, csswring]))
  .pipe(DEV ? gutil.noop() : rename({ extname: '.min.css' }))
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('public'));
}

function pack() {
  return Promise.all([P(packCSS()), P(packJS())]);
}

gulp.task('clean', clean);
gulp.task('lint', ['clean'], lint);
gulp.task('build', ['clean'], build);
gulp.task('componentsCSS', ['clean'], componentsCSS);
gulp.task('compile', ['lint', 'build', 'componentsCSS']);
gulp.task('bundle', ['compile'], bundle);
gulp.task('public', ['bundle'], public);
gulp.task('pack', ['public'], pack);

gulp.task('default', ['pack']);
