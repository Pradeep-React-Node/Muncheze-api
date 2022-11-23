const bcrypt = require('bcrypt');
const validator = require('validator');
const config = require('../config');

class Util {
  static async generateHash(password) {
    return await bcrypt.hash(password, config.get("bcrypt.salt"));
  }

  static filterUndefinedValues(object) {
    if (!object && object.constructor.name !== 'Object') {
      return object;
    }
    const returnObject = {};

    Object.keys(object).forEach((key) => {
      if (object[key] !== undefined) {
        returnObject[key] = object[key];
      }
    });

    return returnObject;
  }

  static validateEmail(email) {
    return validator.isEmail(email)
  }

  static validatePassword(password) {
    return validator.isStrongPassword(password,
      { minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}
    );
  }

  static compareHash(password, hash) {
    return bcrypt.compareSync(password, hash);
  }

  static parseData(data) {
    if (data) return data.get({ plain: true });

    return data;
  }

  static getSixDigitRandomNo() {
    const minm = 100000;
    const maxm = 999999;

    return Math.floor(Math.random() * (maxm - minm + 1)) + minm;
  }

  static sendExceptionResponse(res, err) {
    console.log(err);
    const error = {
      error: { message: err.message },
    }

    if (err instanceof SyntaxError) return res.status(400).send(error);
    if (err instanceof EvalError) return res.status(403).send(error);
    if (err instanceof RangeError) return res.status(401).send(error);
    if (err instanceof ReferenceError) return res.status(409).send(error);

    return res.status(500).send('Something went wrong');
  }

  static isEmpty(object) {
    if (!object) {
      return true;
    }

    const className = object.constructor.name;
    let status = true;

    switch (className) {
      case 'String':
        status = object.trim().length === 0;
        break;

      case 'Number':
        status = false;
        break;

      case 'Array':
        status = object.length === 0;
        break;

      case 'Object':
        status = Object.keys(object).length === 0;
        break;
    }

    return status;
  }
}

module.exports = Util;