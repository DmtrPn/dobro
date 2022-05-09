// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')
// const { ESBuildMinifyPlugin } = require('esbuild-loader')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
// const { ProvidePlugin } = require('webpack');
// const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
// const TerserPlugin = require('terser-webpack-plugin');

const path = require('path');
const fs = require('fs');

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const getLocalIdent = require('./build-scripts/getLocalIdent');
const { PUBLIC_PATH, ROOT_DIR } = require('./build-scripts/constants');

const sprites = fs.readFileSync(path.resolve(ROOT_DIR, './dist/sprite.svg'), 'utf8');

module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'static/dobro.js',
        path: PUBLIC_PATH,
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: 'esbuild-loader',
                options: {
                    loader: 'tsx',
                    target: 'es2017',
                },
            },
            {
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: {
                                localIdentName: '[local]',
                                getLocalIdent: getLocalIdent,
                            },
                            sourceMap: true,
                            importLoaders: 2,
                            url: {
                                filter: (url) => {
                                    // Semantic-UI-CSS has an extra semi colon in one of the URL due to which CSS loader along
                                    // with webpack 5 fails to generate a build.
                                    // Below if condition is a hack. After Semantic-UI-CSS fixes this, one can replace use clause with just
                                    // use: ['style-loader', 'css-loader']
                                    if (url.includes('charset=utf-8;;')) {
                                        return false;
                                    }
                                    return true;
                                },
                            },
                        },
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: true,
                            postcssOptions: {
                                plugins: [
                                    ['autoprefixer'],
                                ],
                            },
                        },
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true,
                        },
                    },
                ],
            },
        ],
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: 'styles',
                    type: 'css/mini-extract',
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new HtmlWebpackPlugin({
            minify: false,
            template: './src/template.ejs',
            inject: false,
            templateParameters: {
                sprites,
                isProduction: process.env.NODE_ENV === 'production',
            },
        }),
        new MiniCssExtractPlugin({
            filename: 'static/[name].css',

        }),
    ],
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '*'],
        alias: {
            '@facades': path.resolve(__dirname, './src/facades'),
            '@store': path.resolve(__dirname, './src/store'),
            '@core': path.resolve(__dirname, './src/core'),
            '@api': path.resolve(__dirname, './src/api'),
            '@components': path.resolve(__dirname, './src/components'),
            '@hoc': path.resolve(__dirname, './src/components/HOC'),
            '@common': path.resolve(__dirname, './src/modules/common'),
            '@utils': path.resolve(__dirname, './src/utils'),
            '@modules': path.resolve(__dirname, './src/modules'),
            '@movie': path.resolve(__dirname, './src/modules/movie'),
            '@dream': path.resolve(__dirname, './src/modules/dream'),
            '@affirmation': path.resolve(__dirname, './src/modules/affirmation'),
        },
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000,
    },
};
