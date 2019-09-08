const webpack = require('webpack');
const rimraf = require('rimraf');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const config = require('config');
const path = require('path');

const {
    api: {
        url: apiUrl,
    },
} = config;

const environment = config.app.env || 'development';
const plugins = [
    {
        apply: compiler => {
            rimraf.sync(compiler.options.output.path);
        },
    },
    new MiniCssExtractPlugin({
        filename: 'app.css',
        allChunks: true
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(environment),
        API_URL: JSON.stringify(`${apiUrl}`),
    }),
];

const optimization = {};

if (environment === 'production') {
    optimization.minimizer = [
        new UglifyJsPlugin({
            sourceMap: true,
            uglifyOptions: {
                compressor: {
                    warnings: false,
                },
            },
        }),
    ];
}

module.exports = [
    {
        context: path.join(__dirname, '/src'),
        entry: './index.jsx',
        output: {
            path: path.join(__dirname, './../src/public/build'),
            publicPath: '/public/build/',
            filename: 'app.js',
        },
        optimization,
        plugins,
        module: {
            rules: [
                {
                    test: /\.css$/,
                    use: ["style-loader", "css-loader"],
                },
                {
                    test: /\.jsx?$/,
                    exclude: /(node_modules)/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                '@babel/preset-env',
                                '@babel/preset-react',
                            ],
                        },
                    },
                },
                {
                    test: /\.js$/,
                    include: path.join(__dirname, '/frontend'),
                    use: {
                        loader: 'babel-loader?presets[]=env,presets[]=react',
                    },
                    exclude: /node_modules/,
                },
                {
                    test: /\.html$/,
                    use: {
                        loader: 'raw',
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
                            loader: 'babel-loader'
                        },
                        {
                            loader: 'react-svg-loader',
                            options: {
                                jsx: true,
                            },
                        }
                    ],
                },
            ],
        },
        resolve: {
            extensions: ['*', '.js', '.jsx'],
        },
    },
];
