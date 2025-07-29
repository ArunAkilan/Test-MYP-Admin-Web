import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest/presets/default-esm',   // important: use ESM preset
  testEnvironment: 'jsdom',                 // for React testing
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', {
      useESM: true,                        // tell ts-jest to treat files as ESM
      isolatedModules: true,               // helps with isolated compilation
      tsconfig: 'tsconfig.app.json',      // your tsconfig with verbatimModuleSyntax and jsx settings
    }],
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],  // import jest-dom matchers etc.
  extensionsToTreatAsEsm: ['.ts', '.tsx'],           // treat these as ESM
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],

  // Add this to mock static assets:
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/styleMock.js',
    '\\.(gif|ttf|eot|svg|png|jpg|jpeg)$': '<rootDir>/fileMock.js',
  },
};

export default config;

