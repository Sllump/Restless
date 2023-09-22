const path = require('path');

module.exports = {
  entry: './src/index.js', // Replace './src/index.js' with the entry point of your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Replace 'dist' with the desired output directory
  },
  module: {
    rules: [
      // Add your CSS loader configuration here
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      // Add other loaders and rules as needed
    ],
  },
  // Add other webpack configuration options as needed
};
