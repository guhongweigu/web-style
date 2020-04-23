const path = require('path');
const publics = path.resolve(__dirname, '../web-common');
module.exports = {
  publicPath: process.env.NODE_ENV === 'development' ? '/' : process.env.VUE_APP_ROUTER,
  configureWebpack: config => {
    Object.assign(config, {
      // 开发生产共同配置
      resolve: {
        alias: {
          '@': path.resolve(__dirname, './src'),
          '@c': path.resolve(__dirname, './src/components'),
          '@a': path.resolve(__dirname, './src/assets'),
          '@publics': publics,
        },
      },
    });
  },
  devServer: {
    port: '8001',
    //api地址前缀
    proxy: {
      '/api': {
        target: 'http://smart.cc-lotus.info',
        ws: true,
        onProxyReq(proxyReq, req, res) {
          proxyReq.setHeader('x-tenant', '99991');
        },
        '/files': {
          target: 'http://free.liaoningdoupo.com',
        },
      },
    },
  },
};
