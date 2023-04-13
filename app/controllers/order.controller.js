const moment = require("moment");
const sendNotification = require("../libs/sendNotification");
const db = require("../models");
const Order = db.orders;
const Item = db.items;
const Status = db.statuses;
const Payment = db.payments;
const Menu = db.menus;
const Category = db.categories;
const User = db.users;
const Truck = db.trucks;
const Op = db.Sequelize.Op;
const Items = db.items;
const Address = db.addresses;

// -------------------------------------New Order-----------------------------------------------------

exports.addOrder = (req, res) => {
  console.log(req?.body);
  Order.create(req.body)
    .then((data) => {
      res.send({ message: "Order item added successfully", data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while adding the Order item.",
      });
    });
};
// --------------------------------------Find One Order by ID------------------------------------------

exports.getOrderById = async (req, res) => {
  const id = req.params.order_id;
  try {
    const order_data = await Order.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: User,
          as: "user_info",
          attributes: [
            "firstName",
            "lastName",
            "phoneNumber",
            "isDisabled",
            "isVerified",
          ],
        },
        {
          model: Truck,
          as: "truck_info",
          attributes: ["name", "latitude", "longitude"],
        },
        {
          model: Items,
          as: "items",
          include: [
            {
              model: Menu,
              as: "menu_info",
            },
          ],
        },
        {
          model: Payment,
          as: "payments",
          attributes: [
            "id",
            "payment_type",
            "payment",
            "discount",
            "order_id",
            "user_id",
          ],
        },
        {
          model: Status,
          as: "statuses",
        },
      ],
    });
    res.status(200).send({
      data: order_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

// --------------------------------------Find all Orders ------------------------------------------

exports.getAllOrders = async (req, res) => {
  try {
    const all_orders = await Order.findAll({
      include: [
        {
          model: User,
          as: "user_info",
          attributes: [
            "firstName",
            "lastName",
            "phoneNumber",
            "isDisabled",
            "isVerified",
          ],
        },
        {
          model: Truck,
          as: "truck_info",
          attributes: ["name", "latitude", "longitude"],
        },
      ],
    });
    res.status(200).send({
      data: all_orders,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};
// -------------------------------------Find Orders by user Id---------------------------------------------
exports.getOrderByUser = async (req, res) => {
  const id = req.params.user_id;
  try {
    const Order_data = await Order.findAll({
      where: {
        user_id: id,
      },
      include: [
        {
          model: User,
          as: "user_info",
          attributes: [
            "firstName",
            "lastName",
            "phoneNumber",
            "isDisabled",
            "isVerified",
          ],
          include: [
            {
              model: Address,
              as: "addresses",
            },
          ],
        },
        {
          model: Items,
          as: "items",
          include: [
            {
              model: Menu,
              as: "menu_info",
            },
          ],
        },
        {
          model: Truck,
          as: "truck_info",
          attributes: ["name", "id"],
        },
        {
          model: Payment,
          as: "payments",
          attributes: [
            "id",
            "payment_type",
            "payment",
            "discount",
            "order_id",
            "user_id",
          ],
        },
        {
          model: Status,
          as: "statuses",
        },
      ],
    });
    res.status(200).send({
      data: Order_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

//---------------------------------------------Find Orders by Truck ID----------------------------

exports.getOrderByTruck = async (req, res) => {
  const id = req.params.truck_id;
  try {
    const Order_data = await Order.findAll({
      where: {
        truck_id: id,
      },
      include: [
        {
          model: User,
          as: "user_info",
          attributes: [
            "firstName",
            "lastName",
            "phoneNumber",
            "isDisabled",
            "isVerified",
          ],
          include: [
            {
              model: Address,
              as: "addresses",
            },
          ],
        },
        {
          model: Items,
          as: "items",
          include: [
            {
              model: Menu,
              as: "menu_info",
            },
          ],
        },
        {
          model: Truck,
          as: "truck_info",
          attributes: ["name", "id"],
        },
        {
          model: Payment,
          as: "payments",
          attributes: [
            "id",
            "payment_type",
            "payment",
            "discount",
            "order_id",
            "user_id",
          ],
        },
        {
          model: Status,
          as: "statuses",
        },
      ],
    });
    res.status(200).send({
      data: Order_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

//--------------------------------------Edit and Update a order-------------------------------------

exports.updateOrder = async (req, res) => {
  const id = req.params.order_id;
  const updatedData = { ...req.body, updatedAt: new Date() };
  if (req?.body?.isCompleted) {
    let userDetails = await User.findOne({ where: { id: req?.body?.user_id } });
    if (userDetails?.fcmToken) {
      await sendNotification({
        title: "Order Completed",
        description: "WooHoo!! Your order is marked as completed",
        tokens: [userDetails?.fcmToken],
      });
    }
  }
  Order.update(updatedData, {
    where: { id: id },
  })
    .then((num) => {
      if (num >= 1) {
        res.send({ message: "Order item updated successfully" });
      } else {
        res.status(500).send({
          message: `Cannot update the Order item with id=${id}. Maybe the order was not found or the update request is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating the Order item with id=" + id,
      });
    });
};
//------------------------------------------find order to show item and status---------------------------
exports.getOrderItemStatus = async (req, res) => {
  const id = req.params.order_id;
  try {
    const order_data = await Order.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Item,
          as: "items",
          attributes: ["id", "cost", "menu_id", "order_id"],
          include: [
            {
              model: Menu,
              as: "menu_info",
              attributes: ["id", "name", "category_id", "cost", "ratings"],
              include: [
                {
                  model: Category,
                  as: "category",
                  attributes: ["name"],
                },
              ],
            },
          ],
        },
        {
          model: Status,
          as: "statuses",
          attributes: ["id", "status", "order_id"],
        },
        {
          model: Payment,
          as: "payments",
          attributes: [
            "id",
            "payment_type",
            "payment",
            "discount",
            "order_id",
            "user_id",
          ],
        },
      ],
    });
    res.status(200).send({
      data: order_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
    console.log(e);
  }
};
//-----------------------------------------------find orders between dates--------------------------------------//
exports.getOrderByDate = async (req, res) => {
  console.log(req.query);
  try {
    const Order_data = await Order.findAll({
      where: {
        truck_id: req.query.truck_id,
        createdAt: {
          [Op.gte]: moment
            .utc(moment(`${req.query.startDate} 00:00:00`))
            .format(),
          [Op.lte]: moment
            .utc(moment(`${req.query.endDate} 11:59:59`))
            .format(),
        },
      },
      include: [
        {
          model: User,
          as: "user_info",
          attributes: [
            "firstName",
            "lastName",
            "phoneNumber",
            "isDisabled",
            "isVerified",
          ],
        },
        {
          model: Truck,
          as: "truck_info",
        },
        {
          model: Payment,
          as: "payments",
          attributes: [
            "id",
            "payment_type",
            "payment",
            "discount",
            "order_id",
            "user_id",
          ],
        },
      ],
    });
    res.status(200).send({
      data: Order_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};
