const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const port = process.env.PORT || 3000;

const config = require("./webpack.config");
const compiler = webpack(config);

new WebpackDevServer(compiler, {
    devMiddleware: {
        publicPath: config.output.publicPath,
    },
    hot: true,
    historyApiFallback: true,
}).listen(port, "0.0.0.0", function (err) {
    if (err) {
        return console.log(err);
    }

    console.log("Listening at http://localhost:" + port + "/");
});
