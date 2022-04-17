const { task } = require("fuse-box/sparky");

require('./fusebox/context');
const clean = require('./fusebox/clean');
const devServer = require('./fusebox/devServer');
const prodBuild = require('./fusebox/prodBuild');
// const serviceWorker = require('./fusebox/serviceWorker');
const indexHTML = require('./fusebox/indexHTML');
const buildFonts = require('./fusebox/buildFonts');
const buildImages = require('./fusebox/buildImages');
const svgSprite = require('./fusebox/svgSprite');

task('clean', clean);
task('prodBuild', prodBuild);
task('devServer', devServer);
task('indexHTML', indexHTML);
task('buildFonts', buildFonts);
task('buildImages', buildImages);
task('svgSprite', svgSprite);
// // task('sw', serviceWorker);
//
// task('default', [ 'clean', 'sw', 'prodBuild' ]);
//
// task('dev', [ 'clean', 'sw', 'devServer' ]);
//
task('default', [ 'clean', 'buildFonts', 'svgSprite', 'buildImages', 'prodBuild', 'indexHTML' ]);

task('dev', [ 'clean', 'buildFonts', 'svgSprite', 'buildImages', 'indexHTML', 'devServer' ]);
