const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const config = require('config');
const path = require('path');

const {
    api: {
        url: apiUrl,
    },
} = config;

const environment = config.app.env || 'development';
const plugins = [
    new MiniCssExtractPlugin({
        filename: 'app.css',
        allChunks: true
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.DefinePlugin({
        NODE_ENV: JSON.stringify(environment),
        API_URL: JSON.stringify(`${apiUrl}`),
    }),
    new HtmlWebPackPlugin({
        template: path.resolve( __dirname, 'public/index.html'),
        filename: 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin(),
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
        context: __dirname,
        entry: "./src/index.jsx",
        output: {
            filename: 'app.js',
            path: path.resolve(__dirname, 'public'),
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
                    test: /\.(js|jsx)$/,
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
        devServer: {
            historyApiFallback: true,
            contentBase: path.join(__dirname, 'public'),
            hot: true,
            port: 3000,
            compress: true,
        },
    },
];
