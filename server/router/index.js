const router = require('koa-router')();
const connect = require('./connect');
const query = require('./query');

module.exports = function withRouter(app) {
  connect(app, router);
  query(app, router);
  app.use(router.routes()).use(router.allowedMethods());
};
