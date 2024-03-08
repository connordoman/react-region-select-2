const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

/** @type {import("webpack").Configuration} */
module.exports = {
    target: ["web", "browserslist"],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
            watch: true,
            publicPath: "/",
        },
        port: 9000,
        compress: true,
    },
    entry: "./src/example/index.js",
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist"),
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "index.html"),
        }),
        new MiniCssExtractPlugin(),
        new ReactRefreshWebpackPlugin(),
        new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                use: ["babel-loader"],
                include: path.join(__dirname, "src"),
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                include: path.join(__dirname, "src"),
            },
            {
                test: /\.html$/,
                use: "file-loader",
                include: path.join(__dirname, "src"),
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
    mode: process.env.NODE_ENV || "development",
};
