module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('users', {
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    address: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    fcmToken: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    isVendor: {
      type: Sequelize.BOOLEAN,
      // defaultValue: false
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      // defaultValue: false
    },
    isCustomer: {
      type: Sequelize.BOOLEAN,
      // defaultValue: false
    },
    isDisabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isVerified: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    joiningDate: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    stripe_id: {
      type: Sequelize.STRING,
    },
  });

  User.associate = function (models) {
    User.hasMany(models.addresses, { as: 'addresses', foreignKey: 'user_id' });
    User.hasMany(models.trucks, { as: 'trucks', foreignKey: 'user_id' });
    User.hasMany(models.orders, { as: 'orders', foreignKey: 'user_id' });
    User.hasMany(models.payments, { as: 'payments', foreignKey: 'user_id' });
    User.hasMany(models.truck_review, {
      as: 'truck_review',
      foreignKey: 'user_id',
    });
  };
  User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    delete values.updatedAt;
    // delete values.createdAt;
    return values;
  };
  return User;
};
