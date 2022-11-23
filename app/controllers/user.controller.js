const db = require('../models');
const User = db.users;
const passwordLib = require('./../libs/generatePassword');
const Truck = db.trucks;
const Op = db.Sequelize.Op;
const util = require('../src/util/index');
const auth = require('../src/util/authenticationHandler');
const sendNotification = require('../libs/sendNotification');

exports.register = async (req, res) => {
  try {
    const user_data = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user_data) {
      res.status(403).send({
        message: 'The email is already registered.',
      });
    } else {
      const newUser = {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: passwordLib.hashpassword(req.body.password),
        phoneNumber: req.body.phoneNumber,
        address: req.body.address,
        isAdmin: req.body.isAdmin,
        isCustomer: req.body.isCustomer,
        isVendor: req.body.isVendor,
      };

      User.create(newUser)
        .then((data) => {
          res.send({ message: 'user created successfully', data: data });
        })
        .catch((err) => {
          res.status(500).send({
            message:
              err.message || 'Some error occurred while creating the user.',
          });
        });
    }
  } catch (e) {
    res.status(500).send({
      message: err.message,
    });
  }
};

exports.login = async (req, res) => {
  try {
    const user_data = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (user_data) {
      let retrievedUserDetails = user_data.toJSON();
      passwordLib.comparePassword(
        req.body.password,
        user_data.dataValues.password,
        async (err, isMatch) => {
          if (err) {
            res.status(403).send({
              message: 'Login failed! Some error occurred.',
            });
          } else if (isMatch) {
            console.log(user_data.isAdmin);
            const token = await auth.generateToken(
              user_data.id,
              user_data.email,
              user_data.isVendor,
              user_data.isAdmin,
              user_data.isCustomer
            );
            retrievedUserDetails.token = token;
            await User.update(
              { fcmToken: req?.body?.fcmToken },
              {
                where: {
                  id: user_data?.id,
                },
              }
            );
            res.status(200).send({
              message: 'Login Successful',
              data: retrievedUserDetails,
            });
          } else {
            res.status(403).send({
              message: 'Incorrect Password!',
            });
          }
        }
      );
    } else {
      res.status(403).send({
        message: 'The entered email is not registered.',
      });
    }
  } catch (e) {
    console.log(e, 'eeeeee');
    res.status(500).send({
      message: e,
    });
  }
};

exports.getUser = async (req, res) => {
  const id = req.params.id;
  try {
    const user_data = await User.findOne({
      where: {
        id,
      },
    });
    console.log(user_data);
    res.status(200).send({
      data: user_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};
exports.getUsers = async (req, res) => {
  const id = 11;
  try {
    const user_data = await User.findOne({
      where: {
        id,
      },
    });
    console.log(user_data);
    res.status(200).send({
      data: user_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.getUserWithTrucks = async (req, res) => {
  const id = req.params.id;
  try {
    const user_data = await User.findOne({
      where: {
        id,
      },
      include: {
        model: Truck,
        as: 'trucks',
        attributes: ['name', 'latitude', 'longitude'],
      },
    });
    res.status(200).send({
      data: user_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};

exports.getUserWithTrucks = async (req, res) => {
  const id = req.params.id;
  try {
    const user_data = await User.findOne({
      where: {
        id,
      },
      include: {
        model: Truck,
        as: 'trucks',
        attributes: ['name', 'latitude', 'longitude'],
      },
    });
    res.status(200).send({
      data: user_data,
    });
  } catch (e) {
    res.status(500).send({
      message: e,
    });
  }
};
