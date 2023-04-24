const { verifyToken } = require('../src/util/authenticationHandler.js');

module.exports = (app) => {
  const favorites = require('../controllers/favorites.js');
  var router = require('express').Router();

  const baseUrl = '/api';

  router.post('/add/favorites/:user_id', favorites.addFavorite);
  router.get('/get/favorites/:user_id', favorites.getFavoritesByUser);

  app.use(baseUrl, router);
};
