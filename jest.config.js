/** @format */

module.exports = {
	collectCoverage: false,
	verbose: true,
	browser: false,
	errorOnDeprecated: true,
	moduleFileExtensions: ['js', 'json', 'jsx', 'ts', 'tsx', 'node'],
	coverageDirectory: './coverage',
	collectCoverageFrom: [
		// coverage for these files.
		'**/*.{js,jsx}',
		'!**/node_modules/**',
		'!**/vendor/**',
		'!**/database/**',
		'!**/tests/**',
		'!**/spec/**',
		'!**/*.spec.{js,jsx}',
		'!**/coverage/**'
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
			statements: 50
		},
		projects: [
			{
				displayName: 'test'
			} //,
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
	}
};
