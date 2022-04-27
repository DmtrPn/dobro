const { sassPlugin } = require('esbuild-sass-plugin');

require('esbuild').build({
    entryPoints: ['src/app.ts'],
    bundle: true,
    outfile: 'out.js',
    plugins: [sassPlugin()],
}).catch(() => process.exit(1))