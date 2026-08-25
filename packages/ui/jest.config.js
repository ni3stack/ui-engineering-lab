// import type { Config } from "jest";

module.exports = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  transform: {
    "^.+\\.(ts|tsx)$": [
      "babel-jest",
      {
          rootMode: "upward"
      }
    ],
  },
  moduleNameMapper: {
      "\\.css$": "<rootDir>/test/styleMock.js"
  },
  testMatch: [
      "<rootDir>/src/**/*.test.ts",
      "<rootDir>/src/**/*.test.tsx"
  ]
}