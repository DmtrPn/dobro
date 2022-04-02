const { task } = require("fuse-box/sparky");

require('./fusebox/context');
const clean = require('./fusebox/clean');
const devServer = require('./fusebox/devServer');
const prodBuild = require('./fusebox/prodBuild');
// const serviceWorker = require('./fusebox/serviceWorker');
const indexHTML = require('./fusebox/indexHTML');
const buildFonts = require('./fusebox/buildFonts');

task('clean', clean);
task('prodBuild', prodBuild);
task('devServer', devServer);
task('indexHTML', indexHTML);
task('buildFonts', buildFonts);
// // task('sw', serviceWorker);
//
// task('default', [ 'clean', 'sw', 'prodBuild' ]);
//
// task('dev', [ 'clean', 'sw', 'devServer' ]);
//
task('default', [ 'clean', 'buildFonts', 'prodBuild', 'indexHTML' ]);

task('dev', [ 'clean', 'buildFonts', 'indexHTML', 'devServer' ]);
