const { verifyToken } = require("../src/util/authenticationHandler.js");

module.exports = app => {
    const categories = require("../controllers/category.controller.js");
    var router = require("express").Router();
    const baseUrl = '/api'
    
    router.post("/category/add", verifyToken, categories.addCategory);
    router.get("/category/getall", verifyToken, categories.getAllCategory);
    router.put("/category/edit/:category_id", verifyToken, categories.updateCategory)
    router.get("/category/getbyid/:category_id", verifyToken,categories.getCategoryById)
    // router.get("/category/getbymenuid/:menu_id", verifyToken, categories.getCategoryByMenuId)
    app.use(baseUrl, router);
  };