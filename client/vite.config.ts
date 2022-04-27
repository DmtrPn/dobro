import { defineConfig } from 'vite';
import path from 'path';
// import react from '@vitejs/plugin-react';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
    root: './src',
    base: '.public',
    mode: 'production',
    logLevel: 'info',
    esbuild: {
        jsxFactory: 'h',
        jsxFragment: 'Fragment'
    },
    plugins: [
        react({
            babel: {
                parserOpts: {
                    plugins: ['decorators-legacy']
                }
            }
        }),
        tsconfigPaths()
    ],
    server: {
        port: 3333,
        hmr: false,
    },
    build: {
        target: 'esNext',
        minify: false,
        emptyOutDir: true,
        outDir: '../../public',
        rollupOptions: {
            preserveEntrySignatures: 'strict',
            output: {
                // preserveModules: true,
                // entryFileNames: '[name].js',
                // assetFileNames: 'assets/[ext]/[name].[ext]',
                manualChunks: undefined,
                generatedCode: {
                    constBindings: true,
                },
            },
        },
    },
    resolve: {
        alias: {
            '@facades': path.resolve(__dirname, './src/facades'),
            '@store': path.resolve(__dirname, './src/store'),
            '@core': path.resolve(__dirname, './src/core'),
            '@api': path.resolve(__dirname, './src/api'), // 'api/',
            '@components': path.resolve(__dirname, './src/components'), // 'components',
            '@hoc': path.resolve(__dirname, './src/components/HOC'), // 'components/HOC',
            '@common': path.resolve(__dirname, './src/modules/common'), // 'modules/common',
            '@utils': path.resolve(__dirname, './src/utils'), // 'utils',
            '@modules': path.resolve(__dirname, './src/modules'), // 'modules',
            '@movie': path.resolve(__dirname, './src/modules/movie'), // 'modules/movie',
            '@dream': path.resolve(__dirname, './src/modules/dream'), // 'modules/dream',
            '@affirmation': path.resolve(__dirname, './src/modules/affirmation'), // 'modules/affirmation'
        }
    }
    // build: {
    //     target: path.resolve(__dirname, './src/store'), // 'esNext',
    //     minify: false,
    //     emptyOutDir: true,
    //     outDir: path.resolve(__dirname, './src/store'), // '../build',
    //     rollupOptions: {
    //         preserveEntrySignatures: path.resolve(__dirname, './src/store'), // 'strict',
    //         output: {
    //             preserveModules: true,
    //             entryFileNames: path.resolve(__dirname, './src/store'), // '[name.js',
    //             assetFileNames: path.resolve(__dirname, './src/store'), // 'assets/[ext/[name.[ext',
    //             manualChunks: undefined,
    //             generatedCode: {
    //                 constBindings: true,
    //             },
    //         },
    //     },
    // },
});
