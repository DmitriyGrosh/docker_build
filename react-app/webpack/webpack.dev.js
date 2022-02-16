const { DefinePlugin } = require('webpack');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  plugins: [
    new DefinePlugin({
      'process.env.name': JSON.stringify('Dima'),
    })
  ],
};
