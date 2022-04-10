const { context } = require('fuse-box/sparky');
const {
    FuseBox,
    WebIndexPlugin,
    SassPlugin,
    QuantumPlugin,
    CSSModulesPlugin,
    CSSPlugin,
    CSSResourcePlugin,
    PostCSSPlugin,
} = require('fuse-box');

const getLocalIdent = require('./getLocalIdent');

context(
    class  {
        getSWConfig() {
            return FuseBox.init({
                homeDir: 'src/serviceWorker',
                target: 'es6',
                output: '../public/$name.js',
                useTypescriptCompiler: true,
            });
        }
        getConfig() {
            return FuseBox.init({
                homeDir: 'src/',
                target: 'browser@es6',
                output: '../public/static/$name.js',
                useTypescriptCompiler: true,
                allowSyntheticDefaultImports: true,
                log: {
                    enabled: !this.isProduction,
                    showBundledFiles: false
                },
                cache: !this.isProduction,
                alias: {
                    '@store/*': '~/store/',
                    '@api/*': '~/api/',
                    '@modules/*': '~/modules/',
                    '@movie/*': '~/modules/movie/',
                    '@dream/*': '~/modules/dream/',
                    '@common/*': '~/modules/common/',
                    '@components/*': '~/components/',
                    '@hoc/*': '~/components/HOC/',
                    '@utils/*': '~/utils/',
                    '@core/*': '~/core/',
                    '@facades/*': '~/facades/',
                },
                plugins: [
                    // WebIndexPlugin({
                    //     template : 'src/index.html'
                    // }),
                    [
                        SassPlugin(),
                        CSSModulesPlugin({
                            scopedName: getLocalIdent,
                            useDefault: false
                        }),
                        CSSResourcePlugin({ inline: true }),
                        PostCSSPlugin([
                            require('autoprefixer')
                        ]),
                        CSSPlugin({
                            minify: this.isProduction
                        }),
                    ],
                    [
                        CSSResourcePlugin({ inline: true }),
                        PostCSSPlugin([
                            require('autoprefixer')
                        ]),
                        CSSPlugin({
                            minify: this.isProduction
                        }),
                    ],
                    this.isProduction && QuantumPlugin({
                        bakeApiIntoBundle: true,
                        replaceProcessEnv: true,
                        processPolyfill: true,
                        uglify: { es6: true },
                        css: {
                            path: '/styles.css',
                        },
                    })
                ]
            });
        }
    }
);
