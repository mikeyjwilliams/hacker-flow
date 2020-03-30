/** @format */

module.exports = {
  verbose: true,
  browser: false,
  errorOnDeprecated: true,
  moduleFileExtensions: [
    'cookie-parser',
    'js',
    'json',
    'jsx',
    'ts',
    'tsx',
    'node'
  ],
  collectCoverageFrom: [
    '**/*{.js,jsx}',
    '!**/node_modules/**',
    '!**/vendor/**'
  ],
  coveragePathIgnorePatterns: ['/node_modules/', '/Secret/'],
  coverageReporters: [
    'json',
    'lcov',
    'text',
    'clover',
    'text-summary',
    'json-summary'
  ],
  testPathIgnorePatterns: ['./**/server.js', './**/index.js'],
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
    }
  },
  projects: [
    {
      displayName: 'test'
    }
    // {
    //   displayName: 'jest-runner-eslint',
    //   displayName: 'lint',
    //   testMatch: ['<rootDir>/**/*.js']
    // },
    // {
    //   displayName: 'jest-runner-prettier',
    //   displayName: 'prettier',
    //   testMatch: ['<rootDir>/**/*.js']
    // }
  ]
};
