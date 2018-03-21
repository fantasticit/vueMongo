module.exports = function connect(app, router) {
  const controller = app.controller.connect

  router.post('/db/connect', controller.createConnect)
}
