const path = require('path');

module.exports = {
  resolve: {
    fallback: {
      fs: false,
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
    },
  },
};

const Dotenv = require('dotenv-webpack');

module.exports = {
  // ...other Webpack configuration options...
  plugins: [
    new Dotenv(),
    // ...other plugins...
  ],
};
