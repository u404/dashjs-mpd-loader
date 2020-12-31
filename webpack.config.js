module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    path: __dirname + "/lib",
    filename: "index.js",
    library: 'DashjsMpdLoader',
    libraryExport: 'default',
    libraryTarget: 'umd',
    globalObject: 'this'
  },
  target: "node",
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
}