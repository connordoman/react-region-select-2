const path = require("path");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

module.exports = {
    devtool: "eval",
    entry: ["webpack-dev-server/client?http://localhost:4000", "webpack/hot/only-dev-server", "./src/example/index"],
    output: {
        path: path.join(__dirname, "dist"),
        filename: "bundle.js",
        publicPath: "/static/",
    },
    plugins: [new webpack.HotModuleReplacementPlugin(), new MiniCssExtractPlugin(), new ReactRefreshWebpackPlugin()],
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
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: [".tsx", ".ts", ".js"],
    },
};
