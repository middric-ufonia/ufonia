import type { JestConfigWithTsJest } from "ts-jest";

const jestConfig: JestConfigWithTsJest = {
  preset: "ts-jest/presets/default-esm",
  testPathIgnorePatterns: ["node_modules", "dist"],
  collectCoverageFrom: ["src/**/*.ts", "!src/__tests__/**/*"],
};

export default jestConfig;
