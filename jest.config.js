module.exports = {
    transform: {
      "^.+\\.(ts|tsx)$": "babel-jest",
    },
    moduleNameMapper: {
      "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    testEnvironment: "jest-environment-jsdom",
    moduleDirectories: ["node_modules", "src"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    transformIgnorePatterns: [
      "/node_modules/(?!@babel/runtime).+\\.js$",
    ],
  };