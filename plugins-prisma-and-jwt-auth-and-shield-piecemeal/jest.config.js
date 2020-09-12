// jest.config.js

const { defaults: tsjPreset } = require("ts-jest/presets");

module.exports = {
  preset: "ts-jest",
  testEnvironment: "./tests/nexus-test-environment.js",
  transform: {
    ...tsjPreset.transform,
  },
  collectCoverageFrom: ["api/**/*.{js,jsx,ts,tsx}", "!api/**/*.d.ts"],
  roots: ["<rootDir>/api"],
  testPathIgnorePatterns: [
    "/.nexus/",
    "/examples/",
    "/node_modules/",
  ],
  testTimeout: 10000,
  setupFiles: ["dotenv/config"],
};
