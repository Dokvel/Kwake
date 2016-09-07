var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var path = require('path');

module.exports = {
  output: {
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    modules: [
      'client',
      'node_modules',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        exclude: [/node_modules/, /emails/],
        loader: [
          'style-loader',
          'css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap',
          'postcss-loader'
        ],
      }, {
        test: /\.scss$/,
        exclude: [/node_modules/, /emails/],
        loaders: [
          'style-loader',
          'css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap',
          'sass-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap',
          'postcss-loader'
        ],
      }, {
        test: /\.jpe?g$|\.gif$|\.png$|\.svg$/i,
        exclude: [path.resolve(__dirname, "vendor/fonts")],
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: [path.resolve(__dirname, "vendor/fonts")],
        loader: 'file?name=public/fonts/[name].[ext]'
      }
    ],
  },
  postcss: () => [
    postcssFocus(),
    cssnext({
      browsers: ['last 2 versions', 'IE > 10'],
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
};
