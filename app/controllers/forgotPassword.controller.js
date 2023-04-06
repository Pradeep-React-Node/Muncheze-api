const moment = require('moment-timezone');
const { sendMail } = require('../libs/sendMail');
const db = require('../models');
const Op = db.Sequelize.Op;
const Otp = db.otp;
const User = db.users;
const passwordLib = require('./../libs/generatePassword');

exports.sendMail = async (req, res) => {
  let { email } = req.body;
  console.log('email', req.body);
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    if (!email) {
      res?.status(500).send({
        status: 'failed',
        message: 'Email is required',
      });
      return;
    }

    const userRes = await User.findOne({
      where: {
        email,
      },
    });

    if (!userRes?.dataValues) {
      res?.status(500).send({
        status: 'failed',
        message: 'User does not exist',
      });
      return;
    }

    let existingOtpData = await Otp.findOne({
      where: {
        user_id: userRes?.dataValues?.id,
      },
    });

    let response;

    if (existingOtpData?.dataValues) {
      response = await Otp.update(
        {
          otp,
          updatedAt: new Date(),
        },
        {
          where: {
            user_id: userRes?.dataValues?.id,
          },
        }
      );
      response = await Otp.findOne({
        where: {
          otp,
        },
      });
    } else {
      response = await Otp.create({ otp, user_id: userRes?.dataValues?.id });
    }

    await sendMail({
      subject: 'no-reply',
      email,
      content: `Your otp is ${otp}\nNote: This OTP is valid only for 5 minutes`,
    });
    res.status(200).send({
      status: 'success',
      data: response,
    });
  } catch (e) {
    res.status(500).send({
      status: 'failed',
      message: e.message,
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    let { otp, user_id } = req.body;
    if (!otp || !user_id) {
      res.send({
        status: 'failed',
        message: 'Otp and user id are required',
      });
      return;
    }

    var timeFiveMinsBefore = moment().subtract({ minute: 1 }).toDate();

    const otpFromDb = await Otp.findOne({
      where: {
        otp,
        user_id,
        updatedAt: { [Op.gte]: timeFiveMinsBefore },
      },
    });

    if (!otpFromDb?.dataValues) {
      res.send({
        status: 'failed',
        message: 'Invalid OTP',
      });
      return;
    }

    let user = await User.findOne({ where: { id: user_id } });

    res.status(200).send({
      status: 'success',
      otpFromDb,
      user,
    });
  } catch (e) {
    res.send({
      status: 'failed',
      message: e.message,
    });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { newPassword, user_id } = req.body;
    if (!newPassword || !user_id) {
      res.send({
        status: 'failed',
        message: 'New Password and User Id are required',
      });
      return;
    }
    const password = passwordLib.hashpassword(newPassword);
    await User.update({ password }, { where: { id: user_id } });
    var updatedPassword = await User.findOne({ where: { id: user_id } });
    if (updatedPassword) {
      res.send({
        status: 'success',
        data: updatedPassword,
      });
    }
  } catch (e) {
    res.send({
      status: 'failed',
      message: e.message,
    });
  }
};
