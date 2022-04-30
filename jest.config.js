// jest.config.js

const merge = require('merge');
const { defaults: tsjPreset } = require('ts-jest/presets');

module.exports = merge.recursive(tsjPreset, {
  moduleNameMapper: {
    '^~/(.*)$': '<rootDir>/src/$1',
  },
  setupFiles: ['<rootDir>/jest.setup.js'],
  verbose: true,
  testPathIgnorePatterns: ['/node_modules/', '/__mocks__/', '/__utils__/'],
});
