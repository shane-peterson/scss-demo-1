const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const glob = require("glob")
const entry = {}
const plugins = []

const files = glob.sync("src/pages/*.js");

files.map(p => {
  const name = path.basename(p).split('.').slice(0, -1)[0]
  entry[name] = `./${p}`
  plugins.push(new HtmlWebpackPlugin({
    filename: `${name}.html`,
    chunks: [name]
  }))
});

module.exports = {
  mode: 'development',
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[contenthash].js',
  },
  plugins: plugins,
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader",
        ],
      },
    ],
  },
}