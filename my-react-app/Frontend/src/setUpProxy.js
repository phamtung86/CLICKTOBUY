const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://vn-public-apis.fpo.vn',
      changeOrigin: true,
      pathRewrite: {
        '^/api': '',
      },
    })
  );
};
