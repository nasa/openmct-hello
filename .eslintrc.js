module.exports = {
  extends: ["eslint:recommended", "plugin:prettier/recommended"],
  env: {
    browser: true,
    jasmine: true,
    es6: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: "module",
    ecmaFeatures: { modules: true },
  },
  plugins: ["vue", "prettier", "unicorn", "simple-import-sort"],
  rules: {
    "prettier/prettier": "error",
  },
};
