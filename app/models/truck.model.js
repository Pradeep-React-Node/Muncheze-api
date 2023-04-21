module.exports = (sequelize, Sequelize) => {
  const Truck = sequelize.define('trucks', {
    name: {
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.TEXT('medium'),
    },
    latitude: {
      type: Sequelize.STRING,
    },
    longitude: {
      type: Sequelize.STRING,
    },
    licenseNo: {
      type: Sequelize.STRING,
    },
    licensePhotoFront: {
      type: Sequelize.TEXT('medium'),
    },
    licensePhotoBack: {
      type: Sequelize.TEXT('medium'),
    },
    ratings: {
      type: Sequelize.DECIMAL(10, 2),
    },
    isFavorite: {
      type: Sequelize.ARRAY,
    },
    joiningDate: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: sequelize.models.users,
        key: 'id',
      },
      allowNull: false,
    },
    offline: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isApproved: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    isDisabled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
  });

  Truck.associate = function (models) {
    Truck.belongsTo(models.users, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'user_info',
    });
    Truck.hasMany(models.menus, { as: 'menus', foreignKey: 'truck_id' });
    Truck.hasMany(models.orders, { as: 'orders', foreignKey: 'truck_id' });
  };

  Truck.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    // delete values.createdAt;
    return values;
  };
  return Truck;
};
