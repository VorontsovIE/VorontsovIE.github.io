const path = require('path');
// const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  // cache: false,
  entry: {
    main: ['./src/main.js'],
    'lagrange-interpolation': ['./src/lagrange_interpolation.js'],
  },
  // plugins: [
  //   new HtmlWebpackPlugin({filename: '_site/[name]/index.html', }),
  // ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    // filename: '[name].[contenthash].js',
  },
  optimization: {
    usedExports: true,
  },
  // mode: "development",
  module: {
    rules: [
      {
        test: /\.m?jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env', "@babel/preset-react"],
          }
        }
      },
      // {
      //   test: /\.tsx?$/,
      //   use: 'ts-loader',
      //   exclude: /node_modules/,
      // },
      {
        test: /\.css$/i,
        use: [
          "style-loader",
          {loader: "css-loader", options: {modules: true}},
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.css'],
  },
};
