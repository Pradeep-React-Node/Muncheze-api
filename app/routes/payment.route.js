const { verifyToken } = require("../src/util/authenticationHandler.js");

module.exports = (app) => {
  const payments = require("../controllers/payment.controller.js");
  var router = require("express").Router();

  const baseUrl = "/api";

  router.post("/payment/add", verifyToken, payments.addPayment);
  router.get("/payment/getbyid/:payment_id", verifyToken, payments.getPaymentById);
  router.get("/payment/getbyorder/:order_id", verifyToken, payments.getPaymentByOrder);
  router.get("/payment/getbyorder/:user_id", verifyToken, payments.getPaymentByUser);
  router.put("/payment/edit/:payment_id", verifyToken, payments.updatePayment);

  app.use(baseUrl, router);
};
