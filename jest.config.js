module.exports = {
    // Indicates which test environment will be used.
    testEnvironment: 'jsdom',
  
    // An array of file extensions your modules use.
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  
    // A map from regular expressions to paths to transformers.
    transform: {
      '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
    },
  
    // A list of paths to modules that run some code to configure or set up the testing framework before each test.
    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  
    // An array of regexp pattern strings that are matched against all test paths before executing the test.
    testPathIgnorePatterns: ['/node_modules/', '/build/'],
  
    // Indicates whether each individual test should be reported during the run.
    verbose: true,
  };
  