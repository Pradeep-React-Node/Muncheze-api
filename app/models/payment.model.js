module.exports = (sequelize, Sequelize) => {
  const Payment = sequelize.define("payments", {
    payment_type: {
      type: Sequelize.ENUM,
      values: ["Cash on delivery", "Online payment"],
    },
    payment: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    discount: {
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
    order_id: {
      type: Sequelize.INTEGER,
      references: {
        model: sequelize.models.orders,
        key: "id",
      },
      allowNull: false,
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: sequelize.models.users,
        key: "id",
      },
      allowNull: false,
    },
  });

  Payment.associate = function (models) {
    Payment.belongsTo(models.orders, {
      foreignKey: "order_id",
      targetKey: "id",
      as: "order_info",
    });
  };
  Payment.associate = function (models) {
    Payment.belongsTo(models.users, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "user_info",
    });
  };

  Payment.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    // delete values.createdAt;
    return values;
  };
  return Payment;
};
