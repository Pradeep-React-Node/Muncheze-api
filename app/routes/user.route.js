const { verifyToken } = require('../src/util/authenticationHandler.js');

module.exports = (app) => {
  const users = require('../controllers/user.controller.js');
  var router = require('express').Router();

  const baseUrl = '/api';

  router.post('/register', users.register);
  router.post('/login', users.login);
  // router.put("/edit/:id", users.update)
  router.get('/user/get/:id', verifyToken, users.getUser);
  router.get('/user/getwithtrucks/:id', verifyToken, users.getUserWithTrucks);
  router.get('/users', users.getUsers);
  app.use(baseUrl, router);
};
