const router = require('koa-router')();
const connect = require('./connect');
const collection = require('./collection');
const document = require('./document');
const user = require('./user');

module.exports = function withRouter(app) {
  connect(app, router);
  collection(app, router);
  document(app, router);
  user(app, router);
  
  app.use(router.routes()).use(router.allowedMethods());
};
