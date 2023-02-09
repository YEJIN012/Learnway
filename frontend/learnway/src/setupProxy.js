const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/youtubeapi',
    createProxyMiddleware({
      target: 'https://www.googleapis.com',
      pathRewrite: {
        '^/youtubeapi': '',
      },
      changeOrigin:true
    }),
  );
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://i8a408.p.ssafy.io/api',
      pathRewrite: {
        '^/api': '',
      },
      changeOrigin:true
    }),
  );
  app.use(
    '/papagoapi',
    createProxyMiddleware({
      target: 'https://openapi.naver.com',
      pathRewrite: {
        '^/papagoapi': '',
      },
      changeOrigin:true
    }),
  );
};