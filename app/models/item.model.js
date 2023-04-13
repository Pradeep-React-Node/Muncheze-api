module.exports = (sequelize, Sequelize) => {
  const Item = sequelize.define("items", {
    cost: {
      type: Sequelize.INTEGER,
    },
    quantity: {
      type: Sequelize.INTEGER,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    menu_id: {
      type: Sequelize.INTEGER,
      references: {
        model: sequelize.models.menus,
        key: "id",
      },
      allowNull: false,
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

  Item.associate = function (models) {
    Item.belongsTo(models.menus, {
      foreignKey: "menu_id",
      targetKey: "id",
      as: "menu_info",
    });
    Item.belongsTo(models.orders, {
      foreignKey: "order_id",
      targetKey: "id",
      as: "order_info",
    });
  };

  Item.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    // delete values.createdAt;
    return values;
  };
  return Item;
};
