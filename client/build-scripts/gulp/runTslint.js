const gulp = require('gulp');
const gulpTslint = require("gulp-tslint");
const tslint = require("tslint");

const { PUBLIC_PATH } = require('../constants');

function runTslint() {
    var program = tslint.Linter.createProgram("./tsconfig.json");

    return gulp.src(['src/**/*.tsx', 'src/**/*.ts', '!src/**/*.scss.d.ts'], { base: '.', allowWarnings: true })
        .pipe(gulpTslint({ program, fix: true }))
        .pipe(gulpTslint.report());
};

module.exports = { runTslint }
