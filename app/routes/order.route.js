const { verifyToken } = require("../src/util/authenticationHandler.js");

module.exports = (app) => {
  const orders = require("../controllers/order.controller.js");
  var router = require("express").Router();

  const baseUrl = "/api";

  router.post("/order/add", orders.addOrder);
  router.get("/order/getbyid/:order_id", verifyToken, orders.getOrderById);
  router.get(
    "/order/getorderitemstatus/:order_id",
    verifyToken,
    orders.getOrderItemStatus
  );
  router.get("/order/getall", orders.getAllOrders);
  router.get("/order/getbyuser/:user_id", verifyToken, orders.getOrderByUser);
  router.get("/order/getbydate", orders.getOrderByDate);
  router.get("/order/getbytruck/:truck_id", orders.getOrderByTruck);
  router.put("/order/edit/:order_id", orders.updateOrder);

  app.use(baseUrl, router);
};
