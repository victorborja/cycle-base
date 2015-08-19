require('dotenv').config();

import path from 'path';
import webpack from 'webpack';
import merge from 'webpack-merge';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CompressionPlugin from 'compression-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';

const isProduction = process.env.NODE_ENV !== 'prod';

const common = {
  entry: {
    index: './tmp/js/index.js',
    vendor: './tmp/js/vendor.js'
  },
  output: {
    path: 'tmp/bundle',
    filename: '[name]-[chunkhash].js',
    pathinfo: true,
    publicPath: ''
  },
  module: {
    loaders: [
      { test: /\.html$/, loader: 'html' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, 'tmp/js'),
      path.join(__dirname, 'tmp/css'),
      path.join(__dirname, 'node_modules'),
      path.join(__dirname, 'bower_components')
    ]
  },
  plugins: [
    new CleanPlugin(['tmp/bundle']),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        BROWSER: JSON.stringify(true)
      }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin(
      'vendor', 'vendor-[chunkhash].js', Infinity
    ),
    new ExtractTextPlugin('[name]-[chunkhash].css'),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin
        .DirectoryDescriptionFilePlugin('package.json', ['main'])
    ),
    new webpack.ResolverPlugin(
      new webpack.ResolverPlugin
        .DirectoryDescriptionFilePlugin('bower.json', ['main'])
    ),
    new HtmlWebpackPlugin({
      title: process.env.APP_TITLE || 'App',
      fbAppId: process.env.FB_APP_ID,
      minify: isProduction ? {
        removeComments: true,
        removeCommentsFromCDATA: true,
        collapseWhitespace: true,
        conservativeCollapse: false,
        collapseBooleanAttributes: true,
        removeAttributeQuotes: true,
        removeRedundantAttributes: true,
        preventAttributesEscaping: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      } : false,
      template: './src/index.html'
    })
  ]
};


const development = merge(common, {
  debug: true,
  profile: false
});

const production = merge(common, {
  debug: false,
  watch: false,
  plugins: [
    /*
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: /\@license|\@preserv/gi
    }),
    */
    new CompressionPlugin({
      asset: '{file}.gz',
      algorithm: 'gzip',
      regExp: new RegExp('\.(js|html|css|svg)$'),
      threshold: 10240,
      minRatio: 0.8
    })
    /*
    function writeWebpackStats() {
      this.plugin('done', function writeStats(stats) {
        require('fs').writeFileSync(
          require('path').join(__dirname,
                               'tmp/bundle', 'webpack-stats.json'),
          JSON.stringify(stats.toJson())
        );
      });
    }
     */
  ]
});

export default (isProduction ? production : development);
