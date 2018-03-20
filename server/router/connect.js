module.exports = function connect(app, router) {
  const controller = app.controller.connect

  router.get('/db/:db/collection/:collection', controller.findAll)
  router.post('/db/connect', controller.createConnect)
}
