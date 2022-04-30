const gulp = require('gulp');
const { series } = require('gulp');
const webpack = require('webpack-stream');

const { PUBLIC_PATH } = require('./build-scripts/constants');

const buildSvgSprite = require('./build-scripts/gulp/buildSvgSprite');

gulp.task('build', function() {
    return gulp.src('src/app.ts')
        .pipe(webpack( require('./webpack.common.js') ))
        .pipe(gulp.dest(PUBLIC_PATH));
});


gulp.task('sprite', buildSvgSprite);

gulp.task('default', series('sprite', 'build'));