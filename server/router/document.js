module.exports = function connect(app, router) {
  const controller = app.controller.document;

  router.get('/db/:db/collection/:collection/document/:document', controller.findById);
  router.post('/db/:db/collection/:collection/document/:document', controller.updateById);
  router.delete('/db/:db/collection/:collection/document/:document', controller.deleteById);
}
