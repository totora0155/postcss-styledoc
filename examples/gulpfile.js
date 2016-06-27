const fs = require('fs');
const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const styledoc = require('..');
const extend = require('postcss-extend');
const namespace = require('postcss-namespace');
const preref = require('postcss-preref');

gulp.task('css', () => {
  gulp.src('src/**/*.css')
    .pipe(plumber())
    .pipe(postcss([
      extend,
      namespace({token: '__'}),
      preref,
      styledoc({
        style: fs.readFileSync('./styledoc/style/custom.css'),
        themePath: styledoc.themes.MINIMALIST
      })
    ]))
    .pipe(gulp.dest('.'))
    .pipe(styledoc.write(stream => {
      stream
        .pipe(require('gulp-debug')())
        .pipe(gulp.dest('styledoc'));
    }));
});

gulp.task('default', ['css'], () => {
  gulp.watch([
    'src/**/*.css',
    'styledoc/**/*.css',
    '../themes/minimalist/style.css'
  ], ['css']);
});
