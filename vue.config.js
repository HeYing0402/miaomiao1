module.exports = {
  devServer: {
    proxy: {
      '/ajax': {
        target: 'https://m.maoyan.com',
        changeOrigin: true
      },
      '/api': {
        target: 'https://api.map.baidu.com',
        changeOrigin: true
      }
    }
  }
}
