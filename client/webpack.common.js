const path = require('path');
// const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const { ESBuildMinifyPlugin } = require('esbuild-loader')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const { ProvidePlugin } = require('webpack');
// const TerserPlugin = require("terser-webpack-plugin");

const getLocalIdent = require('./build-scripts/getLocalIdent');

module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'dobro.js',
        path: path.resolve(__dirname, 'public/')
    },
    mode: 'production',
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
                        }
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
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            },
        ]
    },
    optimization: {
        // concatenateModules: true,
        // minimize: false,
        minimizer: [
            new TerserPlugin({
                // test: /\.tsx?$/,
                // Default
                // terserOptions: {
                //     compress: true,
                // },
                // esBuild
                minify: TerserPlugin.esbuildMinify,
                terserOptions: {
                    target: 'es2017',
                    loader: 'tsx',
                    legalComments: 'none',
                    minifyWhitespace: true,
                    minifyIdentifiers: true,
                    minifySyntax: true,
                },
            }),
            // new ESBuildMinifyPlugin({
            //     target: 'es2017',
            //     loader: 'tsx',
            //     minifyWhitespace: true,
            //     minifyIdentifiers: true,
            //     minifySyntax: true,
            //     css: true,
            // }),
        ],
        splitChunks: {
            cacheGroups: {
                styles: {
                    name: "styles",
                    type: "css/mini-extract",
                    chunks: "all",
                    enforce: true,
                },
            },
        },
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        // new NodePolyfillPlugin(),
        new MiniCssExtractPlugin({
            filename: "[name].css",

        }),
        new ProvidePlugin({
            React: 'react',
        }),
    ],
    resolve: {
        // fallback: {
        //     fs: "empty"
        // },
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
        }
    },
    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
};
