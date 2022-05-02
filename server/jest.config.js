module.exports = {
    name: 'dobro',
    testEnvironment: 'node',
    globals: {
        'ts-jest': {
            diagnostics: true,
        },
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '((\\.|/)(test.ts|spec.js|spec.ts))$',
    testURL: 'http://localhost/',
    moduleDirectories: [
        'node_modules',
        'src',
    ],
    moduleFileExtensions: [
        'ts',
        'js',
    ],
    testTimeout: 50000,
    moduleNameMapper: {
        '^@components/(.*)': '<rootDir>/dist/components/$1',
        '^@common/(.*)': '<rootDir>/dist/components/common/$1',
        '^@core/(.*)': '<rootDir>/dist/core/$1',
        '^@utils/(.*)': '<rootDir>/dist/core/utils/$1',
        '^@catalog/(.*)': '<rootDir>/dist/services/catalog/$1',
        '^@dream/(.*)': '<rootDir>/dist/services/dream/$1',
        '^@wish/(.*)': '<rootDir>/dist/services/wish/$1',
        '^@user/(.*)': '<rootDir>/dist/services/user/$1',
    },
    setupFilesAfterEnv: [
        '@jest-decorated/core/globals',
    ],
};
