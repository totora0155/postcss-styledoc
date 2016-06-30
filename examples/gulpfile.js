const fs = require('fs');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const styledoc = require('..');
const matter = require('postcss-matter');
const extend = require('postcss-extend');
const namespace = require('postcss-namespace');
const preref = require('postcss-preref');

gulp.task('css:minimalist', () => {
  gulp.src(['**/*.css', '!dist/vender/**'], {cwd: 'src'})
    .pipe(plumber())
    .pipe(postcss([
      matter,
      namespace.bem,
      preref,
      styledoc({
        themePath: styledoc.themes.MINIMALIST
      })
    ]))
    .pipe(gulp.dest('./dist'))
    .pipe(styledoc.write({
      dependencies: ['dist/vender/*.css']
    }, docStream => {
      docStream
        .pipe(require('gulp-debug')())
        .pipe(gulp.dest('styledoc-minimalist'));
    }));
});

gulp.task('default', ['css:minimalist'], () => {
  gulp.watch([
    'src/**/*.css',
    'styledoc/**/*.css',
    '../themes/minimalist/style.css'
  ], ['css:minimalist']);
});
