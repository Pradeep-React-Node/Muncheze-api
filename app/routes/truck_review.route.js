const { verifyToken } = require("../src/util/authenticationHandler.js");

module.exports = (app) => {
  const truck_reviews = require("../controllers/truck_review.controller.js");
  var router = require("express").Router();

  const baseUrl = "/api";

  router.post("/review/add", truck_reviews.addTruckReview);
  router.get("/review/get", truck_reviews.getTruckReviews);

  app.use(baseUrl, router);
};
