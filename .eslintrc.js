module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "standard",
    "plugin:react/recommended",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "prettier"],
  rules: {
    "react/prop-types": "off",
    // "no-unused-vars": "off",
    "react/display-name": "off",
    "react/no-unescaped-entities": 0,
    "react/no-unknown-property": "off",
    "import/no-webpack-loader-syntax": "off",
    camelcase: "off",
  },
};
