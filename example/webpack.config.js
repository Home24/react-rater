var path = require('path');
var root = path.resolve(__dirname, '..');
var srcFolder = path.resolve(root, './src');
var exampleFolder = path.resolve(root, './example');

module.exports = {
  entry: path.join(__dirname, 'index.js'),
  output: {
    path: __dirname,
    filename: 'build.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        query: { presets: ['es2015'] },
        include: [
            srcFolder,
            exampleFolder
        ],
        exclude: /(node_modules|bower_components)/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
        include: [srcFolder, exampleFolder]
      }
    ]
  },
  resolve: {
    root: root
  }
}
