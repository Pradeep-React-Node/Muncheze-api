const db = require("../models");
const Address = db.addresses;
const User = db.users;
const Truck = db.trucks;
const Menu = db.menus;
const Category = db.categories;
const Op = db.Sequelize.Op;

exports.addMenuItem = (req, res) => {
  if (req.decoded.isAdmin || req.decoded.isVendor === true) {
    Menu.create(req.body)
      .then((data) => {
        res.send({ message: "Menu item added successfully", data: data });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding the menu item.",
        });
      });
  } else {
    res.status(403).send({ message: "Not authorised as admin or vendor" });
  }
};

exports.getMenuByTruck = async (req, res) => {
  const id = req.params.truck_id;
  try {
    const menu_data = await Menu.findAll({
      where: {
        truck_id: id,
      },
      include: {
        model: Category,
        as: "category",
        attributes: ["name", "id"],
      },
    });
    res.status(200).send({
      data: menu_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.getMenuById = async (req, res) => {
  const id = req.params.menu_id;
  try {
    const menu_data = await Menu.findOne({
      where: {
        id,
      },
      include: {
        model: Category,
        as: "category",
        attributes: ["name", "id"],
      },
    });
    res.status(200).send({
      data: menu_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.updateMenuItem = async (req, res) => {
  if (req.decoded.isAdmin || req.decoded.isVendor === true) {
    const id = req.params.item_id;
    const updatedData = { ...req.body, updatedAt: new Date() };
    Menu.update(updatedData, {
      where: { id: id },
    })
      .then((num) => {
        if (num == 1) {
          res.send({ message: "Menu item updated successfully" });
        } else {
          res.status(500).send({
            message: `Cannot update the menu item with id=${id}. Maybe the item was not found or the update request is empty!`,
          });
        }
      })
      .catch((err) => {
        res.status(500).send({
          message: "Error updating the menu item with id=" + id,
        });
      });
  } else {
    res.status(403).send({ message: "Not authorised as admin or vendor" });
  }
};
