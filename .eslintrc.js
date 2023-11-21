module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
<<<<<<< HEAD
        '.eslintrc.{js,cjs}',
=======
        '.eslintrc.{js,cjs,jsx}',
>>>>>>> main
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
<<<<<<< HEAD
=======
  ignorePatterns: ['main.js', 'main.css', '**/apiSampleData/**'],
>>>>>>> main
  rules: {
  },
};
