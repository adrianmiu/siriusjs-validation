module.exports = {
  mode: 'development',
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist/',
    library: 'SiriusValidation',
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: 'validator.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  }
};
