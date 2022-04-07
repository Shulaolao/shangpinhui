const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true
})

module.exports = {
  //不打包map 文件（需要的内存相对较大）
  productionSourceMap:false,
  //关闭eslint
  lintOnSave: false,
  //代理跨域
  devServer: {
    host: 'localhost',
    proxy: {
      '/api': {
        target: 'http://39.98.123.211',
        // pathRewrite: {'^/api':''},
      },
    }
  }
}
