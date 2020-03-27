const webpack = require('webpack')
const Timestamp = new Date().getTime();
module.exports = {
  publicPath: '/',
  configureWebpack:{
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      }),
    ],
    output: {
      filename: `[name].js?v=${Timestamp}`,
      chunkFilename: `[name].js?v=${Timestamp}`,
    },

  },
}
