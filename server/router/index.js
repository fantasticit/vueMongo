const router = require('koa-router')()
const connect = require('./connect');

module.exports = function withRouter(app) {
  connect(app, router);
  app.use(router.routes()).use(router.allowedMethods());
};
