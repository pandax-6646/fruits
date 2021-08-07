const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}



module.exports = {
  lintOnSave: false,
  chainWebpack: config => {
    config.resolve.alias
      .set("@", resolve("src"))
      .set("assets", resolve("src/assets"))
      .set("components", resolve("src/components"));
  },

  // 打包后的文件以相对路径进行访问
  publicPath: './',

  // 打包文件的输出路径
  outputDir: 'fruits_dist',
  devServer: {
    port: 5000,
    proxy: {
      '/api': {

        // api接口基础路径
        target: 'http://132.232.87.95:3003/',
        changeOrigin: true, // 是否支持跨域
        ws: true,

        // 重写路径：去掉路径中开头的 '/api'
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}