const config = {
  mode: 'production',
  entry: {
    index: './src/js/index.js',
    page: './src/js/page.js',
    wizard: './src/js/wizard.js'
    // contacts: './src/js/contacts.js',
    // about: './src/js/about.js',
  },
  output: {
    filename: '[name].bundle.js',
  },
  resolve: {
    extensions: ['.json', '.js', '.jsx', 'css'],
    modules: ['node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

module.exports = config;