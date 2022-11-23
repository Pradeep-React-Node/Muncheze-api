const { verifyToken } = require('../src/util/authenticationHandler.js');

module.exports = (app) => {
  const trucks = require('../controllers/truck.controller.js');
  var router = require('express').Router();

  const baseUrl = '/api';

  router.post('/truck/add', verifyToken, trucks.addTruck);
  router.get('/truck/getall', verifyToken, trucks.getAllTrucksForAdmin);
  router.get(
    '/truck/getall/customer',
    verifyToken,
    trucks.getAllTrucksForCustomer
  );
  router.get(
    '/truck/getbyuser/:user_id',
    verifyToken,
    trucks.getAllTrucksByUser
  );
  router.get('/truck/getbyid/:truck_id', verifyToken, trucks.getTruckById);
  router.get(
    '/truck/getwithmenu/:truck_id',
    verifyToken,
    trucks.getTruckWithMenu
  );
  router.put('/truck/edit/:truck_id', verifyToken, trucks.updateTruck);
  router.get(
    '/truck/getwithmenu/mobile/:truck_id',
    verifyToken,
    trucks.getTruckWithMenuForMobile
  );

  app.use(baseUrl, router);
};
