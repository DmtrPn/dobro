const gulp = require('gulp');
const { series } = require('gulp');

// const { buildSvgSprite } = require('./gulp-scripts/buildSvgSprite');
const buildSvgSprite = require('./gulp-scripts/buildSvgSprite');


gulp.task('sprite', buildSvgSprite);

gulp.task('default', series('sprite'));
