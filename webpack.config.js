const WebpackHtmlPlugin =  require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack')
const ModularFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const {dependencies} = require('./package.json');

require('dotenv').config({path: './.env'})

module.exports = {
    entry: {
        app:"./src/index",
        vendor: ['react', 'react-dom', 'react-router']
    },
    mode: "development",
    devServer: {
        hot: true,
        open: true,
        historyApiFallback: true,
        static: {
            directory: path.join(__dirname, "public"),
        },
        port: 8082,
    },
    output: {
        publicPath: "http://localhost:8082/",
    },
    module: {
        rules: [
            { test: /\.tsx?$/, exclude: /node_modules/, loader: "ts-loader"
            },
            {
                test: /\.(css)$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(s(a|c)ss)$/,
                use: ['style-loader','css-loader', 'sass-loader'],
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
                use: {
                    loader: 'url-loader',
                },
            },
        ],
    },
    plugins: [
        new ModularFederationPlugin({
            name: 'storeMgmt',
            filename: 'remoteStoreEntry.js',
            exposes: {
                './StoreMgmtIndex': './src/bootstrap',
            },
            shared: {
                ...dependencies,
                react: {
                    singleton: true,
                    requiredVersion: dependencies["react"],
                },
                "react-dom": {
                    singleton: true,
                    requiredVersion: dependencies["react-dom"],
                },
            },
        }),
        new WebpackHtmlPlugin({
            template: "./public/index.html",
        }),
        new webpack.DefinePlugin({
            "process.env": JSON.stringify(process.env)
        })
    ],
    resolve: {
        extensions: ["*", ".ts", ".tsx", ".js"]
    },
    target: "web",
}
