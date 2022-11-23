const db = require("../models");
const User = db.users;
const TruckReview = db.truck_review;
const Truck = db.trucks;

exports.addTruckReview = async (req, res) => {
  if (req?.body?.id) {
    const updatedData = { ...req.body, updatedAt: new Date() };
    let [num] = await TruckReview.update(updatedData, {
      where: { id: req?.body?.id },
    });
    if (num >= 1) {
      var updatedReview = await TruckReview.findOne({
        where: { id: req?.body?.id },
      });
      res.send({ status: "success", data: updatedReview });
    } else {
      res.status(500).send({
        message: `Cannot update the truck. Maybe the truck was not found or the update request is empty!`,
      });
    }
  } else {
    TruckReview.create(req.body)
      .then((data) => {
        res.send({
          status: "success",
          data,
        });
      })
      .catch((err) => {
        res.status(500).send({
          status: "failed",
          message: err.message || "Some error occurred while adding the truck.",
        });
      });
  }
};

exports.getTruckReviews = async (req, res) => {
  try {
    const all_reviews = await TruckReview.findAll({
      where: { truck_id: Number(req?.query?.id) },
      include: [
        {
          model: Truck,
          as: "truck_info",
          include: [
            {
              model: User,
              as: "user_info",
            },
          ],
        },
      ],
    });

    res.status(200).send({
      status: "success",
      data: all_reviews,
    });
  } catch (e) {
    res.status(500).send({
      status: "failed",
      message: e,
    });
  }
};
