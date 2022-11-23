const db = require("../models");
const Payment = db.payments;
const Order = db.orders;
const User = db.users;
const Op = db.Sequelize.Op;

// -------------------------------------Add payment-----------------------------------------------------

exports.addPayment = (req, res) => {
  Payment.create(req.body)
    .then((data) => {
      res.send({ message: "Payment added", data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding payment",
      });
    });
};
// --------------------------------------Find payment  by payment ID------------------------------------------

exports.getPaymentById = async (req, res) => {
  const id = req.params.payment_id;
  try {
    const payment_data = await Payment.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Order,
          as: "order_info",
          attributes: ["cost", "quantity", "status"],
        },
        {
          model: User,
          as: "user_info",
          attributes: ["firstName", "lastName", "email", "phoneNumber"],
        },
      ],
    });
    res.status(200).send({
      data: payment_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
  // console.log(req)
};

// -------------------------------------Now status by order Id---------------------------------------------
exports.getPaymentByOrder = async (req, res) => {
  const id = req.params.order_id;
  try {
    const payment_data = await Payment.findAll({
      where: {
        order_id: id,
      },
    });
    res.status(200).send({
      data: payment_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};
// -------------------------------------Now status by user Id---------------------------------------------
exports.getPaymentByUser = async (req, res) => {
  const id = req.params.user_id;
  try {
    const payment_data = await Payment.findAll({
      where: {
        user_id: id,
      },
    });
    res.status(200).send({
      data: payment_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

// -------------------------------payment update-----------------------------------

exports.updatePayment = async (req, res) => {
  const id = req.params.payment_id;
  const updatePayment = { ...req.body, updatedAt: new Date() };
  Payment.update(updatePayment, {
    where: { id: id },
  })
    .then((num) => {
      if (num >= 1) {
        res.send({ message: "payment updated successfully" });
      } else {
        res.status(500).send({
          message: `Cannot update the payment with id=${id}. Maybe the order was not found or the update request is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating the payment with id=" + id,
      });
    });
};
