module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: "px",                // 要转化的单位
      viewportWidth: 375,                 // UI设计稿的宽度,高度一般不用设置
      unitPrecision: 6,                   // 转换后的精度，即保留小数点后有效数字的位数
      propList: ["*"],                    // 指定转换的css属性的单位，*代表全部css属性的单位都进行转换
      viewportUnit: "vw",                 // 指定需要转换成的视窗单位，默认vw
      fontViewportUnit: "vw",             // 指定字体需要转换成的视窗单位，默认vw
      selectorBlackList: [".ignore"],     // 指定不转换为视窗单位的class类名(css选择器选中的)，
      minPixelValue: 1,                   // 默认值1，小于或等于1px则不进行转换
      mediaQuery: true,                   // 是否在媒体查询的css代码中也进行转换，默认false
      replace: true,                      // 是否转换后直接更换属性值
      exclude: [/node_modules/],          // 设置忽略文件，用正则做目录名匹配
      landscape: false                    // 是否处理横屏情况
    }
  }
}