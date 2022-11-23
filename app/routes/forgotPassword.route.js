const { verifyToken } = require("../src/util/authenticationHandler.js");

module.exports = (app) => {
  const communication = require("../controllers/forgotPassword.controller.js");
  var router = require("express").Router();

  const baseUrl = "/api";

  router.post("/communication/sendOtp", communication.sendMail);
  //   router.post("/communication/sendOtp", verifyToken, communication.sendMail);
  router.post("/communication/verifyOtp", communication.verifyOtp);
  //   router.get("/communication/verifyOtp", verifyToken, communication.getMenuByTruck)
  router.post("/communication/resetPassword", communication.resetPassword);
  //   router.post("/communication/resetPassword", verifyToken, communication.resetPassword);

  app.use(baseUrl, router);
};
