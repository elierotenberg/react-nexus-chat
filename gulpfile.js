var __NODE__ = !__BROWSER__; var __BROWSER__ = (typeof window === "object"); var __PROD__ = !__DEV__; var __DEV__ = (process.env.NODE_ENV !== "production"); var Promise = require("lodash-next").Promise; require("6to5/polyfill");
var _ = require('lodash-next');

var addsrc = require('gulp-add-src');
var autoprefixer = require('autoprefixer-core')({ cascade: true });
var buffer = require('vinyl-buffer');
var concat = require('gulp-concat');
var cssbeautify = require('gulp-cssbeautify');
var cssmqpacker = require('css-mqpacker');
var csswring = require('csswring');
var del = require('del');
var es6to5 = require('gulp-6to5');
var gplumber = require('gulp-plumber');
var gulp = require('gulp');
var gutil = require('gulp-util');
var gwebpack = require('gulp-webpack');
var insert = require('gulp-insert');
var jshint = require('gulp-jshint');
var path = require('path');
var postcss = require('gulp-postcss');
var react = require('gulp-react');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var sourcemaps = require('gulp-sourcemaps');
var style = require('gulp-react-nexus-style');
var stylish = require('jshint-stylish');
var uglify = require('gulp-uglify');
var webpack = require('webpack');
var wrap = require('gulp-wrap');

// Improve default error handler to get stack trace.
function plumber() {
  return gplumber({
    errorHandler: function(err) {
      console.error(err.stack);
    }
  });
};

if(__DEV__) {
  console.log('gulp started in DEVELOPMENT mode; start with NODE_ENV="production" before deploying.');
}
else {
  console.log('gulp started in PRODUCTION mode; start with NODE_ENV="development" to get more runtime-checks.');
}

gulp.task('clean', function(fn) {
  del([
    'dist',
    'public/native.history.js', 'public/normalize.css',
    'public/p.js', 'public/c.js', 'public/p.css', 'public/p.js',
    'public/p.min.js', 'public/c.min.js', 'public/p.min.css', 'public/p.min.js',
  ], fn);
});

gulp.task('lintJS', ['clean'], function() {
  return gulp.src('src/**/*.js')
  .pipe(plumber())
  .pipe(jshint())
  .pipe(jshint.reporter(stylish));
});

gulp.task('lintJSX', ['clean'], function() {
  return gulp.src(['src/**/*.jsx'])
  .pipe(plumber())
  .pipe(react())
  .pipe(jshint({ quotmark: false }))
  .pipe(jshint.reporter(stylish));
})

gulp.task('lint', ['lintJS', 'lintJSX']);

gulp.task('build', ['clean'], function() {
  return gulp.src(['src/**/*.js', 'src/**/*.jsx'])
  .pipe(plumber())
  .pipe(react())
  .pipe(insert.prepend(
    'require(\'6to5/polyfill\'); ' +
    'const Promise = require(\'lodash-next\').Promise; ' +
    'const __DEV__ = (process.env.NODE_ENV !== \'production\'); ' +
    'const __PROD__ = !__DEV__; ' +
    'const __BROWSER__ = (typeof window === \'object\'); ' +
    'const __NODE__ = !__BROWSER__; '))
  .pipe(es6to5())
  .pipe(gulp.dest('dist'));
});

gulp.task('compile', ['lint', 'build']);

gulp.task('bundle', ['compile'], function() {
  return gulp.src('dist/client.js')
  .pipe(plumber())
  .pipe(gwebpack({
    debug: __DEV__,
    devtool: __DEV__ && 'eval',
    plugins: [
      new webpack.IgnorePlugin(/^fs$/),
      new webpack.DefinePlugin({
        '__DEV__': JSON.stringify(__DEV__),
        '__PROD__': JSON.stringify(__PROD__),
        '__BROWSER__': JSON.stringify(true),
        '__NODE__': JSON.stringify(false),
        'process.env': {
          NODE_ENV: JSON.stringify(__DEV__ ? 'developement' : 'production'),
        },
      }),
      new webpack.optimize.DedupePlugin(),
    ],
  }))
  .pipe(rename({ basename: 'c' }))
  .pipe(gulp.dest('dist'));
});

gulp.task('componentsCSS', ['compile'], function() {
  return gulp.src('src/**/*.jsx', { base: '.' })
  .pipe(plumber())
  .pipe(rename(function(p) {
    p.dirname = path.join(__dirname, p.dirname.replace(/^src/, 'dist'));
    p.extname = ".js";
  }))
  .pipe(style())
  .pipe(__DEV__ ? sourcemaps.init() : gutil.noop())
  .pipe(concat('c.css'))
  .pipe(postcss([autoprefixer]))
  .pipe(cssbeautify({ indent: '  ', autosemicolon: true }))
  .pipe(__DEV__ ? sourcemaps.write() : gutil.noop())
  .pipe(gulp.dest('dist'));
});

gulp.task('public', ['componentsCSS', 'bundle'], function() {
  return gulp.src([
    'bower_components/history.js/scripts/bundled/html4+html5/native.history.js',
    'bower_components/normalize.css/normalize.css',
    'dist/c.js',
    'dist/c.css',
  ])
  .pipe(plumber())
  .pipe(gulp.dest('public'));
});

gulp.task('packJS', ['public'], function() {
  return gulp.src(['public/**/*.js', '!public/p.js', '!public/p.min.js', '!public/c.js'])
  .pipe(plumber())
  // Add c.js later so that it always gets evaluated last
  .pipe(addsrc('public/c.js'))
  // Wrap each file in an IIFE.
  .pipe(wrap('(function() {\n<%= contents %>\n})();\n'))
  .pipe(concat('p.js'))
  .pipe(__DEV__ ? gutil.noop() : uglify({
    mangle: {
      except: ['GeneratorFunction'],
    },
  }))
  .pipe(__DEV__ ? gutil.noop() : rename({ extname: '.min.js' }))
  .pipe(gulp.dest('public'));
});

gulp.task('packCSS', ['public'], function() {
  return gulp.src(['public/**/*.css', '!public/p.css', '!public/p.min.css', '!public/c.css'])
  .pipe(plumber())
  // Add c.css later so that it always gets evaluated last
  .pipe(addsrc('public/c.css'))
  .pipe(concat('p.css'))
  .pipe(__DEV__ ? gutil.noop() : postcss([cssmqpacker, csswring]))
  .pipe(__DEV__ ? gutil.noop() : rename({ extname: '.min.css' }))
  .pipe(gulp.dest('public'));
});

gulp.task('pack', ['packJS', 'packCSS']);

gulp.task('finalize', ['pack'], function(fn) {
  if(__DEV__) {
    return fn(null);
  }
  del(['public/c.css', 'public/c.js', 'public/native.history.js', 'public/normalize.css'], fn);
})

gulp.task('default', ['finalize']);
