const { verifyToken } = require("../src/util/authenticationHandler.js");

module.exports = app => {
    const menus = require("../controllers/menu.controller.js");
    var router = require("express").Router();

    const baseUrl = '/api'
    
    router.post("/menu/add",verifyToken, menus.addMenuItem);
    router.get("/menu/getbytruck/:truck_id", verifyToken, menus.getMenuByTruck)
    router.get("/menu/getbyid/:menu_id", verifyToken, menus.getMenuById)
    router.put("/menu/edit/:item_id",verifyToken, menus.updateMenuItem)
  
    app.use(baseUrl, router);
  };