const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const styledoc = require('../..');
const matter = require('postcss-matter');
const namespace = require('postcss-namespace');
const preref = require('postcss-preref');

gulp.task('css', () => {
  gulp.src(['**/*.css', '!dist/vender/**'], {cwd: 'src'})
    .pipe(plumber())
    .pipe(postcss([
      matter,
      namespace.bem,
      preref,
      styledoc({themePath: styledoc.themes.ILLUMINATE})
    ]))
    .pipe(gulp.dest('./dist'))
    .pipe(styledoc.write({
      dependencies: ['dist/vender/*.css']
    }, docStream => {
      docStream
        .pipe(gulp.dest('styledoc'));
    }));
});

gulp.task('default', ['css'], () => {
  gulp.watch([
    'src/**/*.css',
    'styledoc/**/*.css',
    '../../themes/illuminate/style.css'
  ], ['css']);
});
