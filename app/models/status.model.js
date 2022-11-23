module.exports = (sequelize, Sequelize) => {
  const Status = sequelize.define("statuses", {
    status: {
      type: Sequelize.ENUM,
      values: ["processing", "ready to pick", "in transit", "delivered"],
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
  });

  Status.associate = function (models) {
    Status.belongsTo(models.orders, {
      foreignKey: "order_id",
      targetKey: "id",
      as: "order_info",
    });
  };

  Status.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    // delete values.createdAt;
    return values;
  };
  return Status;
};
