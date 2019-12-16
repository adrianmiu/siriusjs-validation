module.exports = {
  mode: 'production',
  entry: [
    './src/index.js'
  ],
  output: {
    path: __dirname + '/dist/',
    library: 'SiriusValidation',
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: 'validator.min.js',
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
