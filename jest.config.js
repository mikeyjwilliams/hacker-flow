/** @format */

module.exports = {
  verbose: true,
  browser: false,
  errorOnDeprecated: true,
  moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
  coverageDirectory: './test-results.txt',
  collectCoverageFrom: [
    // coverage for these files.
    '<rootDir>/auth/**/*.js',
    '<rootDir>/answers/**/*.js',
    '<rootDir>/questions/**/*.js',
    '<rootDir>/users/**/*.js',
    // spec tests no coverage
    '!<rootDir>/auth/**/*.spec.js',
    '!<rootDir>/answers/**/*.spec.js',
    '!<rootDir>/questions/**/*.spec.js',
    '!<rootDir>/users/**/*.spec.js',
    '!<rootDir>/Secret/**/*.js',
    '!<rootDir>/middleware/**/*.js',
    // individual files no coverage
    '!<rootDir>/index.js',
    '!<rootDir>/server.js',
    '!<rootDir>/knexfile.js',
    '!<rootDir>/index.js'
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    '/Secret/',
    '/middleware/',
    '/.github/',
    '/config/',
    '/data/'
  ],
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover',
    'text-summary',
    'json-summary'
  ],
  coverageThreshold: {
    global: {
      branches: 50,
      functions: 50,
      lines: 50,
      statements: -20
    },
    './auth/': {
      branches: 75,
      functions: 90,
      lines: 65,
      statements: -20
    },
    './answers/': {
      branches: 65,
      functions: 75
    },
    './questions/': {
      branches: 60,
      functions: 70
    },
    './users/': {
      branches: 60,
      functions: 75
    }
  },
  projects: [
    {
      displayName: 'test'
    },
    {
      displayName: 'jest-runner-eslint',
      displayName: 'lint',
      testMatch: ['<rootDir>/**/*.js']
    },
    {
      displayName: 'jest-runner-prettier',
      displayName: 'prettier',
      testMatch: ['<rootDir>/**/*.js']
    }
  ]
};
