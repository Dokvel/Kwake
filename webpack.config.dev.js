var webpack = require('webpack');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var path = require('path');

module.exports = {
  devtool: 'cheap-module-eval-source-map',

  entry: {
    app: [
      'eventsource-polyfill',
      'webpack-hot-middleware/client',
      'webpack/hot/only-dev-server',
      'react-hot-loader/patch',
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ],
  },

  output: {
    path: __dirname,
    filename: 'app.js',
    publicPath: 'http://localhost:8000/',
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
        exclude: [/node_modules/, /vendor/, /emails/, path.resolve(__dirname, "stylesheets/static")],
        loader: [
          'style-loader',
          'css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap',
          'postcss-loader'
        ],
      }, {
        test: /\.css$/,
        include: [/node_modules/, /vendor/, path.resolve(__dirname, "stylesheets/static")],
        loaders: [
          'style-loader',
          'css-loader'
        ],
      }, {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "stylesheets/static")],
        loaders: [
          'style-loader',
          'css-loader?localIdentName=[local]&modules&importLoaders=1&sourceMap',
          'sass-loader?localIdentName=[local]&modules&importLoaders=1&sourceMap',
          'postcss-loader'
        ],
      }, {
        test: /\.scss$/,
        exclude: [/node_modules/, /vendor/, /emails/, path.resolve(__dirname, "stylesheets/static")],
        loaders: [
          'style-loader',
          'css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap',
          'sass-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap',
          'postcss-loader'
        ],
      }, {
        test: /\.jsx*$/,
        exclude: [/node_modules/, /.+\.config.js/],
        loader: 'babel'
      }, {
        test: /\.(jpe?g|gif|png|svg)$/i,
        exclude: [path.resolve(__dirname, "vendor/fonts"), path.resolve(__dirname, "vendor/bootstrap/fonts")],
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: [path.resolve(__dirname, "vendor/fonts"), path.resolve(__dirname, "vendor/bootstrap/fonts")],
        loader: 'file?name=public/fonts/[name].[ext]'
      }
    ],
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        CLIENT: JSON.stringify(true),
        'NODE_ENV': JSON.stringify('development'),
      }
    }),
  ],

  postcss: () => [
    postcssFocus(),
    cssnext({
      browsers: ['last 5 versions']
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
};
