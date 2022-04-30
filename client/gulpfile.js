const { series, parallel, watch, task } = require('gulp');

const { cleanPublic } = require('./build-scripts/gulp/cleanPublic');
const { buildBundle } = require('./build-scripts/gulp/buildBundle');
const { buildDevBundle } = require('./build-scripts/gulp/buildDevBundle');
const { buildSvgSprite } = require('./build-scripts/gulp/buildSvgSprite');
const { serveFonts } = require('./build-scripts/gulp/serveFonts');
const { serveExternalStyles } = require('./build-scripts/gulp/serveExternalStlyes');
const { serveImages } = require('./build-scripts/gulp/serveImages');

task('clean', cleanPublic);
task('sprite', buildSvgSprite);
task('assets', parallel(serveImages, serveExternalStyles, serveFonts))
task('bundle', buildBundle);
task('devBundle', buildDevBundle);

task('default', series(
    'clean',
    parallel('sprite', 'assets'),
    'bundle'
));


task('watch', function() {
    // You can use a single task
    watch('src/*.ts', series('bundle'));
    // Or a composed task
    // watch('src/*.js', series(clean, javascript));
});

task('dev', series(
    'clean',
    parallel('sprite', 'assets'),
    'devBundle',
    'watch',
));
