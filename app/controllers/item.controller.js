const db = require("../models");
const Item = db.items;
const Order = db.orders;
const Menu = db.menus;
const Op = db.Sequelize.Op;

// <-------------------------------------New item----------------------------------------------------->

exports.addItem = (req, res) => {
  Item.bulkCreate(req.body, {returning: true})
    .then((data) => {
      res.send({ message: "items added successfully", data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while adding the item.",
      });
    });
};
// <--------------------------------------Find item by item ID------------------------------------------>

exports.getItemById = async (req, res) => {
  const id = req.params.item_id;
  try {
    const item_data = await Item.findOne({
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
          model: Menu,
          as: "menu_info",
          attributes: ["name", "photo", "cost", "ratings", "review"],
        },
      ],
    });
    res.status(200).send({
      data: item_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

// <--------------------------------------Find all items ------------------------------------------>

exports.getAllItems = async (req, res) => {
  try {
    const all_items = await Item.findAll({
      include: [
        {
          model: Order,
          as: "order_info",
          attributes: ["cost", "quantity", "status"],
        },
        {
          model: Menu,
          as: "menu_info",
          attributes: ["name", "photo", "cost", "ratings", "review"],
        },
      ],
    });
    res.status(200).send({
      data: all_items,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};
// -------------------------------------Find item by order Id---------------------------------------------
exports.getItemByOrder = async (req, res) => {
  const id = req.params.order_id;
  try {
    const item_data = await Item.findAll({
      where: {
        order_id: id,
      },
    });
    res.status(200).send({
      data: item_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

//---------------------------------------------Find items by menu ID----------------------------

exports.getItemByMenu = async (req, res) => {
  const id = req.params.menu_id;
  try {
    const item_data = await Item.findAll({
      where: {
        menu_id: id,
      },
    });
    res.status(200).send({
      data: item_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

//--------------------------------------Edit and Update a item -------------------------------------

exports.updateItem = async (req, res) => {
  const id = req.params.item_id;
  const updatedData = { ...req.body, updatedAt: new Date() };
  Item.update(updatedData, {
    where: { id: id },
  })
    .then((num) => {
      if (num >= 1) {
        res.send({ message: "item updated successfully" });
      } else {
        res.status(500).send({
          message: `Cannot update the item with id=${id}. Maybe the item was not found or the update request is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating the item with id=" + id,
      });
    });
};
