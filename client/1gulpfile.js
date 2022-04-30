const gulp = require('gulp');
const { series } = require('gulp');

const svgSprite = require('./gulp-scripts/svgSprite');


gulp.task('sprite', svgSprite);
// function defaultTask(cb) {
//     // place code for your default task here
//     cb();
// }
//
// exports.default = defaultTask


gulp.task('default', series('sprite'));
