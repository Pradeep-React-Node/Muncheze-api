const db = require("../models");
const User = db.users;
const passwordLib = require("./../libs/generatePassword");
const Truck = db.trucks;
const Menu = db.menus;
const Category = db.categories;
const Op = db.Sequelize.Op;
const auth = require("../src/util/authenticationHandler");

exports.addCategory = (req, res) => {
  if (req.decoded.isAdmin === true) {
    Category.create(req.body)
      .then((data) => {
        res.send({ message: "Category added successfully", data: data });
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while adding the category.",
        });
      });
  } else {
    res.status(403).send({ message: "Not authorised as admin" });
  }
};

exports.updateCategory = async (req, res) => {
  const id = req.params.category_id;
  const updatedData = { ...req.body, updatedAt: new Date() };
  Category.update(updatedData, {
    where: { id: id },
  })
    .then((num) => {
      if (num >= 1) {
        res.send({ message: "Category item updated successfully" });
      } else {
        res.status(500).send({
          message: `Cannot update the category item with id=${id}. Maybe the item was not found or the update request is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating the menu item with id=" + id,
      });
    });
};

exports.getCategoryById = async (req, res) => {
  const id = req.params.category_id;
  try {
    const category_data = await Category.findOne({
      where: {
        id: id,
      },
      include: {
        model: Menu,
        as: "food_info",
        attributes: ["name", "cost", "soldCount", "truck_id"],
      },
    });
    res.status(200).send({
      data: category_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.getAllCategory = async (req, res) => {
  try {
    const all_categories = await Category.findAll();

    res.status(200).send({
      data: all_categories,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

// exports.getCategoryByMenuId = async(req, res) => {
//     const id = req.params.menu_id;
//     try {
//         const category_data = await Category.findOne({
//             where: {
//                id: id
//             },
//             include: {
//                 model: Menu,
//                 as: 'food_info',
//                 attributes: ['name', 'cost', 'soldCount', 'truck_id']
//             }
//         })
//         res.status(200).send({
//             data: category_data
//         })
//     } catch (e) {
//         res.status(500).send({
//             message: e
//         });
//     }
// }
