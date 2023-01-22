const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    module: {
        rules: [
            {
                test: /\.html$/i,
                loader: "html-loader",
            },
        ],
    },
    output: {
        clean: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Webpack Test",
            filename: "my-index.html",
            template: "./src/index.html",
            favicon: "./src/assets/img/favicon.jpeg",
        }),
    ],
};
