module.exports = {
  ...require('config/eslint-next.js'),
  rules: {
    'no-param-reassign': '1',
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
}
