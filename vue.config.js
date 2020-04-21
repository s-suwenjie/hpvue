const webpack = require('webpack')

module.exports = {
  lintOnSave: false,   // 去除vue语法检测模式
  publicPath: '/',
  configureWebpack:{
    plugins: [
      new webpack.ProvidePlugin({
        $:"jquery",
        jQuery:"jquery",
        "windows.jQuery":"jquery"
      }),
    ],
  },
}
