/**
 * Module Dependencies
 */

let gulp = require('gulp');
let jshint = require('gulp-jshint');
let browserSync = require('browser-sync');

let reload = browserSync.reload;
let nodemon = require('gulp-nodemon');
const prettier = require('gulp-prettier');
let eslint = require('gulp-eslint');

/**
 * Config
 */

let paths = {
  styles: ['./client/css/*.css'],
  scripts: ['./client/js/*.js'],
  server: './server/bin/www'
};

let nodemonConfig = {
  script: paths.server,
  ext: 'html js css',
  ignore: ['node_modules']
};

/**
 * Gulp Tasks
 */

gulp.task('lint', function() {
  return gulp
    .src(['server/*.js','server/*/*.js'])
    .pipe(prettier({ singleQuote: true }))
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task('browser-sync', ['nodemon'], function(done) {
  browserSync(
    {
      proxy: 'localhost:3000', // local node app address
      port: 5000, // use *different* port than above
      notify: true
    },
    done
  );
});

gulp.task('nodemon', function(cb) {
  let called = false;
  return nodemon(nodemonConfig)
    .on('start', function() {
      if (!called) {
        called = true;
        cb();
      }
    })
    .on('restart', function() {
      setTimeout(function() {
        reload({ stream: false });
      }, 1000);
    });
});

gulp.task('watch', function() {
  gulp.watch(paths.scripts, ['lint']);
});

gulp.task('default', ['browser-sync', 'watch'], function() {});
