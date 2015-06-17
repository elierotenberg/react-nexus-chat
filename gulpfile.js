require('babel/register')({
  only: /\.jsx$/,
  modules: 'common',
  optional: [
    'es7.classProperties',
    'es7.decorators',
    'es7.objectRestSpread',
    'runtime',
  ],
});

var __DEV__ = (process.env.NODE_ENV === 'development');
var Promise = require('bluebird');
if(__DEV__) {
  Promise.longStackTraces();
}

var concat = require('gulp-concat');
var postcss = require('gulp-postcss');
var autoprefixer = require('autoprefixer-core')({ cascade: true });
var cssbeautify = require('gulp-cssbeautify');
var cssmqpacker = require('css-mqpacker');
var csswring = require('csswring');
var del = require('del');
var babel = require('gulp-babel');
var eslint = require('gulp-eslint');
var fs = require('fs');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gwebpack = require('webpack-stream');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var styles = require('gulp-react-statics-styles');
var webpack = require('webpack');
var uglify = require('gulp-uglify');
var webpackConfig = require('./webpack.config');

function clean(fn) {
  del(['public'], fn);
}

function lint() {
  return gulp.src('src/**/*.jsx')
  .pipe(plumber())
  .pipe(eslint())
  .pipe(eslint.format());
}

function copy() {
  return gulp.src(['src/public/**/*.*', 'src/assets/**/*.*'])
  .pipe(gulp.dest('public'));
}

function css() {
  return gulp.src('src/components/**/*.jsx')
  .pipe(styles())
  .pipe(__DEV__ ? sourcemaps.init() : gutil.noop())
  .pipe(concat('c.css'))
  .pipe(postcss([autoprefixer]))
  .pipe(cssbeautify({
    indent: '  ',
    autosemicolon: true,
  }))
  .pipe(!__DEV__ ? postcss([cssmqpacker, csswring]) : gutil.noop())
  .pipe(__DEV__ ? sourcemaps.write() : gutil.noop())
  .pipe(gulp.dest('public'));
}

function client() {
  return gulp.src('src/client.jsx')
  .pipe(plumber())
  .pipe(gwebpack(webpackConfig, webpack))
  .pipe(rename({ basename: 'c' }))
  .pipe(!__DEV__ ? uglify({
    mangle: { except: ['GeneratorFunction'] },
  }) : gutil.noop())
  .pipe(rename({ basename: 'c', extname: '.js' }))
  .pipe(gulp.dest('public'));
}

gulp.task('clean', clean);
gulp.task('copy', ['clean'], copy);
gulp.task('lint', lint);
gulp.task('client', ['clean', 'copy', 'lint'], client);
gulp.task('css', ['clean', 'copy', 'lint'], css);
gulp.task('default', ['client', 'css']);
