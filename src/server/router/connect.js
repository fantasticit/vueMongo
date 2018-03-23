module.exports = function connect(app, router) {
  const controller = app.controller.connect

  router.post('/db/connect', controller.createConnect);
  router.get('/db/:db/collections', controller.getDBCollectionsStats);
}
