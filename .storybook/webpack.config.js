const path = require('path');

const SRC_PATH = path.join(__dirname, '../src');
const STORIES_PATH = path.join(__dirname, '../stories');

module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        include: [
          SRC_PATH,
          STORIES_PATH
        ]
      }
    ]
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    enforceExtension: false
  }
};
