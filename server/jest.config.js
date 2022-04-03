module.exports = {
    name: "dobro",
    testEnvironment: "node",
    globals: {
        "ts-jest": {
            diagnostics: true
        },
    },
    transform: {
        '^.+\\.tsx?$': 'ts-jest'
    },
    testRegex: '((\\.|/)(test.ts|spec.js|spec.ts))$',
    testURL: 'http://localhost/',
    moduleDirectories: [
        'node_modules',
        'src'
    ],
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    testTimeout: 50000,
    moduleNameMapper: {
        '^@services/(.*)': '<rootDir>/dist/services/$1',
        '^@components/(.*)': '<rootDir>/dist/components/$1',
        '^@core/(.*)': '<rootDir>/dist/core/$1',
        '^@common/(.*)': '<rootDir>/dist/services/common/$1',
    }
}
