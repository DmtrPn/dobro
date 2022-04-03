module.exports = {
    server: {
        env: 'prod'
    },
    db: {
        logging: ['error'],
    },
    log: {
        main: {
            pattern: '%p %m'
        },
        access: {
            pattern: '%p %m'
        }
    }
};
