const { verifyToken } = require("../src/util/authenticationHandler.js");

module.exports = (app) => {
  const statuses = require("../controllers/status.controller.js");
  var router = require("express").Router();

  const baseUrl = "/api";

  router.post("/status/add",verifyToken, statuses.addStatus);
  router.get("/status/getbyid/:status_id", verifyToken, statuses.getStatusById);
  router.get("/status/getbyorder/:order_id", verifyToken, statuses.getStatusByOrder);
  router.put("/status/edit/:status_id", verifyToken, statuses.updateStatus);

  app.use(baseUrl, router);
};
