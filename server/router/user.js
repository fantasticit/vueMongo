module.exports = function connect(app, router) {
  const controller = app.controller.user

  router.get('/db/:db/getUsers', controller.getUsers);
  router.post('/db/:db/createUser', controller.createUser);
  router.delete('/db/:db/deleteUser', controller.deleteUser);
}
