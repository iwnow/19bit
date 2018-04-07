const path = require("path");

module.exports = {
  entry: path.join(__dirname,'index.js'),
  output: {
    path: path.join(__dirname, '/build'),
    filename: 'index.js'
  },
  module: {
    rules: [{
            test: require.resolve('./index.js'),
            use: [{
                loader: 'expose-loader',
                options: 'coreHack'
            }]
        }]
  }
}
