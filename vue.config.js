const webpack = require('webpack')
module.exports = {
  lintOnSave: false,   // 去除vue语法检测模式
  devServer: {
    hotOnly: true, // 热更新
    disableHostCheck: true,
  },
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
