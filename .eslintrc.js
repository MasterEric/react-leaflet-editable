module.exports = {
  env: {
    browser: true,
    node: true,
  },
  parser: '@babel/eslint-parser',
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['@babel', 'prettier'],
  rules: {
    'prettier/prettier': ['warn'], // Utilize Prettier to maintain code style.
    'react/static-property-placement': ['off'], // Allow class properties.
    'no-underscore-dangle': ['off'], // Allow internal function names to include underscores.
    'no-console': ['error', { allow: ['error'] }], // Only allow console.log calls to report errors.
    'class-methods-use-this': ['off'], // Don't require internal functions to call `this`
  },
};
