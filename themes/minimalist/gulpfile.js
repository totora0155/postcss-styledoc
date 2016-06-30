const gulp = require('gulp');
const plumber = require('gulp-plumber');
const postcss = require('gulp-postcss');
const pxtorem = require('postcss-pxtorem');
const matter = require('postcss-matter');
const defineIt = require('postcss-define-it');
const namespace = require('postcss-namespace');
const preref = require('postcss-preref');

gulp.task('css', () => {
  gulp.src('src/style.css')
    .pipe(plumber())
    .pipe(postcss([
      defineIt({
        width: '1080px'
      }),
      pxtorem({
        rootValue: 14,
        selectorBlackList: [':root'],
        propWhiteList: [
          'flex', 'flex-basis', 'font', 'font-size', 'line-height',
          'letter-spacing', 'width', 'height'
        ]
      }),
      matter,
      preref,
      namespace({token: '__'})
    ]))
    .pipe(gulp.dest('.'));
});

gulp.task('default', ['css'], () => {
  gulp.watch('src/style.css', ['css']);
});
