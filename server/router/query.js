module.exports = function connect(app, router) {
  const controller = app.controller.query;

  router.get('/db/:db/collection/:collection', controller.findAll);
  router.get('/db/:db/collection/:collection/document/:document', controller.findById);
}
