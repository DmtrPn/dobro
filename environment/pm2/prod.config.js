'use strict';

module.exports = {
    apps: [
        {
            name: 'dobro-server',
            interpreter: '/bin/bash',
            script: 'bin/environment',
            cwd: 'server',
            args: ['node', 'dist/app.js'],
        }
    ]
};
