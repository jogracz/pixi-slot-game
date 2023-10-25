const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  // MODE
  mode: "development",
  // ENTRY
  entry: {
    index: "./src/index.ts",
  },
  // DEVTOOL
  devtool: "inline-source-map",
  // DEV SERVER
  devServer: {
    static: "./dist",
  },
  // PLUGINS
  plugins: [new HtmlWebpackPlugin({ title: "Pixi Slot Game" })],
  // OTPUT
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
  // MODULE
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  // RESOLVE
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  // OPTIMALIZATION
  optimization: {
    runtimeChunk: "single",
  },
};
