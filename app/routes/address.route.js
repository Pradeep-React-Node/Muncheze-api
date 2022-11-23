const { verifyToken } = require("../src/util/authenticationHandler.js");

module.exports = app => {
    const addresses = require("../controllers/address.controller.js");
    var router = require("express").Router();

    const baseUrl = '/api'
    
    router.post("/address/add", verifyToken, addresses.addAddress);
    router.get("/address/get/:user_id", verifyToken, addresses.getAddress)
   
    // router.put("/edit/:id", users.update)
  
    app.use(baseUrl, router);
  };