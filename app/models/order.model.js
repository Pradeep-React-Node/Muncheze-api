module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('orders', {
    cost: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    isCompleted: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: sequelize.models.users,
        key: 'id',
      },
      allowNull: false,
    },
    truck_id: {
      type: Sequelize.INTEGER,
      references: {
        model: sequelize.models.trucks,
        key: 'id',
      },
      allowNull: false,
    },
  });

  Order.associate = function (models) {
    Order.belongsTo(models.users, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'user_info',
    });
    Order.belongsTo(models.trucks, {
      foreignKey: 'truck_id',
      targetKey: 'id',
      as: 'truck_info',
    });
    Order.hasMany(models.items, {
      as: 'items',
      foreignKey: 'order_id',
    });
    Order.hasOne(models.statuses, {
      as: 'statuses',
      foreignKey: 'order_id',
    });
    Order.hasOne(models.payments, {
      as: 'payments',
      foreignKey: 'order_id',
    });
  };

  Order.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    // delete values.createdAt;
    return values;
  };
  return Order;
};
