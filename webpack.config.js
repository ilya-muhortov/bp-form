var path = require('path');

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        include: path.resolve(__dirname, 'src'),
        exclude: /(node_modules|bower_components|build)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  resolve: {
    alias: {
      'react': path.resolve("./node_modules", "react"),
      'styled-components': path.resolve("./node_modules", "styled-components"),
      '@blueprintjs/core': path.resolve("./node_modules", "@blueprintjs/core"),
    }
  },
  externals: {
    'react': 'commonjs react',
    '@blueprintjs/core': 'commonjs @blueprintjs/core',
    '@blueprintjs/icons': 'commonjs @blueprintjs/icons',
    'styled-components': 'commonjs styled-components',
    'axios': 'commonjs axios',
  }
};
