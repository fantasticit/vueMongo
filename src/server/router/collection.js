module.exports = function collection(app, router) {
  const controller = app.controller.collection;

  router.get('/db/:db/collection/:collection', controller.findAll);
  router.post('/db/:db/collection/:collection', controller.insert);
  router.delete('/db/:db/collection/:collection', controller.deleteCollection);
}
