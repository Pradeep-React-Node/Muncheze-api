module.exports = (app) => {
  const files = require("../controllers/file.controller");
  var router = require("express").Router();
  const baseUrl = "/api";

  router.post("/file/upload", files.uploadFile);
  app.use(baseUrl, router);
};
