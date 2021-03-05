module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.json'
        }
    },
    moduleFileExtensions: [
        'ts',
        'js'
    ],
    moduleNameMapper: {
        '@src/(.*)$': '<rootDir>/src/$1'
    },
    roots: [
        '<rootDir>/src'
    ],
    testEnvironment: 'node',
    testMatch: [
        '**/__tests__/**/*.test.(ts|js)'
    ],
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest'
    },
};
