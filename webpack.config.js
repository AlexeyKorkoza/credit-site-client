const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const CompressionPlugin = require('compression-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const config = require('config');
const path = require('path');

const {
  api: { url: apiUrl },
  app: { port, env, analyzeBundle },
} = config;

const environment = env || 'development';
const plugins = [
  new MiniCssExtractPlugin({
    filename: 'app.css',
    allChunks: true,
  }),
  new webpack.DefinePlugin({
    NODE_ENV: JSON.stringify(environment),
    API_URL: JSON.stringify(`${apiUrl}`),
  }),
  new webpack.HotModuleReplacementPlugin(),
  new webpack.optimize.ModuleConcatenationPlugin(),
  new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ru|en/),
];

if (analyzeBundle) {
  plugins.push(new BundleAnalyzerPlugin());
}

const optimization = {};

if (environment === 'production') {
  plugins.push(
    new CompressionPlugin({
      algorithm: 'gzip',
      test: /\.js$|\.jsx$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  );

  optimization.minimize = true;
  optimization.minimizer = [
    new TerserPlugin({
      terserOptions: {
        compress: {
          sequences: true,
          booleans: true,
          loops: true,
          unused: true,
          warnings: false,
          drop_console: true,
          unsafe: true,
          join_vars: true,
        },
      },
    }),
  ];
}

module.exports = [
  {
    devtool: 'source-map',
    context: __dirname,
    entry: './src/index.jsx',
    output: {
      filename: 'app.js',
      path: path.resolve(__dirname, 'public'),
      publicPath: '/',
    },
    optimization,
    plugins,
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
            },
          },
        },
        {
          test: /\.html$/,
          use: {
            loader: 'html-loader',
          },
          exclude: /node_modules/,
        },
        {
          test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
          use: {
            loader: 'file-loader?name=assets/[name].[hash].[ext]',
          },
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'babel-loader',
            },
            {
              loader: 'react-svg-loader',
              options: {
                jsx: true,
              },
            },
          ],
        },
        {
          test: /\.(js|jsx)$/,
          use: ['source-map-loader'],
          enforce: 'pre',
        },
      ],
    },
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, 'public'),
      hot: true,
      port: port || 3000,
    },
  },
];
