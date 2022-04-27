const path = require('path');
const lodash = require('lodash');
// const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

const LOCAL_SUBTRAHEND = 2;
const COMPONENT_SUBTRAHEND = 1;

module.exports = {
    entry: './src/app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public/')
    },
    // target: 'esnext',
    module: {
        rules: [
            {
                test: /\.mp3$/,
                loader: 'file-loader'
            },
                {
                    test: /\.m?js$/,
                    resolve: {
                        fullySpecified: false, // disable the behaviour
                    },
                },
              {
                  test: /\.tsx?$/,
                  loader: 'esbuild-loader',
                  options: {
                      loader: 'tsx',  // Or 'ts' if you don't need tsx
                      target: 'esnext',
                      tsconfigRaw: require('./tsconfig.json')
                  },
                  // resolve: {
                  //     fullySpecified: false, // disable the behaviour
                  // },
              },
            // {

            //     test: /\.jsx?$/,
            //     exclude: /node_modules/,
            //     use: [
            //         {
            //             loader: 'babel-loader',
            //             options: {
            //                 cacheDirectory: true,
            //                 plugins: [
            //                     'transform-decorators-legacy',
            //                     'transform-class-properties'
            //                 ],
            //                 presets: ['es2015', 'stage-0', 'react']
            //             }
            //         }
            //     ]
            // },
            {
                test: /\.s?css$/,
                use: [
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true,
                                //     {
                                //     // exportOnlyLocals: true,
                                //     exportLocalsConvention: 'asIs',
                                //     // namedExport: true,
                                //     getLocalIdent: getLocalIdent,
                                // },
                                // minimize: true,
                                sourceMap: true,
                                importLoaders: 2,

                            }
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                // plugins: (loader) => [
                                //     require('autoprefixer')()
                                // ]
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                // modules: true,
                                sourceMap: true
                            }
                        }
                    ]
                // exclude: /node_modules/,
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    // {
                    //     loader: "react-svg-loader",
                    //     options: {
                    //         jsx: true,
                    //         svgo: {
                    //             plugins: [
                    //                 { removeTitle: false }
                    //             ],
                    //             floatPrecision: 2
                    //         },
                    //
                    //     }
                    // }
                ]
            },
            {
                test: /\.(gif|png|jpg|jpeg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            publicPath: '/static/',
                            outputPath: 'assets/'
                        }
                    }
                ],
            }
        ]
    },
    plugins: [
        new NodePolyfillPlugin(),
        // new ExtractTextPlugin('styles.css')
    ],
    resolve: {
        fallback: {
            fs: "empty"
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '*'],
        alias: {
            '@store': path.resolve(__dirname, './src/store'),
            '@modules': path.resolve(__dirname, './src/modules'), // 'modules',
            '@common': path.resolve(__dirname, './src/modules/common'), // 'modules/common',
            '@components': path.resolve(__dirname, './src/components'), // 'components',
            '@hoc': path.resolve(__dirname, './src/components/HOC'), // 'components/HOC',
            '@utils': path.resolve(__dirname, './src/utils'), // 'components/HOC',
            '@api': path.resolve(__dirname, './src/api'), // 'components/HOC',
        }
    }
};

function getLocalIdent(context, localIdentName, localName, options) {

    const filePath = context.resourcePath;
    const pathParts = filePath.split(path.sep);
    const lastIndex = pathParts.length - 1;

    let className = '';

    if(/_.scss$/i.test(pathParts[lastIndex])) {
        className = localName;
    } else {
        const local = pathParts[lastIndex - LOCAL_SUBTRAHEND];
        const component = pathParts[lastIndex - COMPONENT_SUBTRAHEND];

        const parts = [
            lodash.kebabCase(local),
            lodash.kebabCase(component),
            localName
        ];

        className = parts.join('__');
    }

    return className
}