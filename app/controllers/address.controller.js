const db = require('../models');
const Address = db.addresses;
const User = db.users;
const Op = db.Sequelize.Op;

exports.addAddress = (req, res) => {
  Address.create(req.body)
    .then((data) => {
      res.send({ message: 'Address added successfully', data: data });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while adding the location.',
      });
    });
};
exports.updateAddress = (req, res) => {
  const id = req.params.id;

  Address.findByIdAndUpdate(id, req.body, { new: true })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          message: `Address not found with id=${id}`,
        });
      }
      res.send({ message: 'Address updated successfully', data: data });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: `Address not found with id=${id}`,
        });
      }
      return res.status(500).send({
        message: `Error updating address with id=${id}`,
      });
    });
};

exports.getAddress = async (req, res) => {
  const id = req.params.user_id;
  try {
    const address_data = await Address.findAll({
      where: {
        user_id: id,
      },
    });
    if (address_data) {
      res.status(200).send({
        message: 'Addresses found',
        data: address_data,
      });
    } else {
      res.status(403).send({
        message: 'No address found related to the user',
      });
    }
  } catch (e) {
    console.log(e);
    res.status(500).send({
      message: e,
    });
  }
};
