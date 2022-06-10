'use strict';

module.exports = {
    apps: [
        {
            name: 'dobro-bot',
            interpreter: '/bin/bash',
            script: 'bin/environment',
            cwd: 'server',
            args: ['node', 'dist/telegramBotApp.js'],
        }
    ]
};
