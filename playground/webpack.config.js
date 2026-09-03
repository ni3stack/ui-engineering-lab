const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { template } = require("@babel/core");

module.exports = {
    mode: "development",
    entry: "./src/index.tsx",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
      clean: true
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: "ts-loader",
          exclude: /node-modules/
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          type: "asset/resource",
        }
      ]
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: "./index.html"
      })
    ],
    devServer: {
      port: 3000,
      open: true
    }

}