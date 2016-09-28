var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var ManifestPlugin = require('webpack-manifest-plugin');
var ChunkManifestPlugin = require('chunk-manifest-webpack-plugin');
var cssnext = require('postcss-cssnext');
var postcssFocus = require('postcss-focus');
var postcssReporter = require('postcss-reporter');
var cssnano = require('cssnano');
var path = require('path');

module.exports = {
  devtool: 'hidden-source-map',

  entry: {
    app: [
      './client/index.js',
    ],
    vendor: [
      'react',
      'react-dom',
    ]
  },

  output: {
    path: __dirname + '/dist/',
    filename: '[name].[chunkhash].js',
    publicPath: '/',
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
        loader: ExtractTextPlugin.extract(
          'style-loader', "css-loader?localIdentName=[hash:base64]&modules&importLoaders=1!postcss-loader"
        ),
      }, {
        test: /\.css$/,
        include: [/node_modules/, /vendor/, path.resolve(__dirname, "stylesheets/static")],
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader')
      }, {
        test: /\.scss$/,
        include: [path.resolve(__dirname, "stylesheets/static")],
        loader: ExtractTextPlugin.extract(
          'style-loader', 'css-loader?localIdentName=[local]&modules&importLoaders=1&sourceMap!sass-loader?localIdentName=[local]&modules&importLoaders=1&sourceMap!postcss'
        )
      }, {
        test: /\.scss$/,
        exclude: [/node_modules/, /vendor/, /emails/, path.resolve(__dirname, "stylesheets/static")],
        loader: ExtractTextPlugin.extract(
          'style-loader', 'css-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!sass-loader?localIdentName=[name]__[local]__[hash:base64:5]&modules&importLoaders=1&sourceMap!postcss'
        )
      }, {
        test: /\.jsx*$/,
        exclude: /node_modules/,
        loader: 'babel'
      }, {
        test: /\.(jpe?g|gif|png|svg)$/i,
        exclude: [path.resolve(__dirname, "vendor/fonts")],
        loader: 'url-loader?limit=10000'
      }, {
        test: /\.json$/,
        loader: 'json-loader'
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        include: [path.resolve(__dirname, "vendor/fonts")],
        loader: 'file?name=public/fonts/[name].[ext]'
      }
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('staging'),
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
      filename: 'vendor.js',
    }),
    new ExtractTextPlugin('app.[chunkhash].css', { allChunks: true }),
    new ManifestPlugin({
      basePath: '/',
    }),
    new ChunkManifestPlugin({
      filename: "chunk-manifest.json",
      manifestVariable: "webpackManifest",
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
      }
    }),
  ],

  postcss: () => [
    postcssFocus(),
    cssnext({
      browsers: ['last 5 versions']
    }),
    cssnano({
      autoprefixer: false
    }),
    postcssReporter({
      clearMessages: true,
    }),
  ],
};
