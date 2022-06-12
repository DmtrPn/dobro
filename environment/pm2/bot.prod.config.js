'use strict';

module.exports = {
    apps: [
        {
            name: 'dobro_bot',
            interpreter: '/bin/bash',
            script: 'bin/environment',
            cwd: 'server',
            args: ['node', 'dist/botApp.js'],
        }
    ]
};
