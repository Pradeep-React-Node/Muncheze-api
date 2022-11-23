const { verifyToken } = require("../src/util/authenticationHandler.js");

module.exports = (app) => {
  const items = require("../controllers/item.controller.js");
  var router = require("express").Router();

  const baseUrl = "/api";

  router.post("/item/add", verifyToken, items.addItem);
  router.get("/item/getbyid/:item_id", verifyToken, items.getItemById);
  router.get("/item/getall", verifyToken, items.getAllItems);
  router.get("/item/getbyorder/:order_id", verifyToken, items.getItemByOrder);
  router.get("/item/getbymenu/:menu_id", verifyToken, items.getItemByMenu);
  router.put("/item/edit/:item_id", verifyToken, items.updateItem);

  app.use(baseUrl, router);
};
