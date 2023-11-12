const path = require('path');

module.exports = {
  entry: {
    main: ['./src/main.js'],
    lagrange_interpolation: ['./src/lagrange_interpolation.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
};
