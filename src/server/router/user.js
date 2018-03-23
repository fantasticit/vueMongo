module.exports = function user(app, router) {
  const controller = app.controller.user

  router.get('/db/:db/getUsers', controller.getUsers);
  router.post('/db/:db/createUser', controller.createUser);
  router.delete('/db/:db/users/:users', controller.deleteUser);
}
