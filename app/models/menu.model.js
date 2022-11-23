module.exports = (sequelize, Sequelize) => {
  const Menu = sequelize.define("menus", {
    name: {
      type: Sequelize.STRING,
    },
    photo: {
      type: Sequelize.TEXT("medium"),
    },
    cost: {
      type: Sequelize.STRING,
    },
    soldCount: {
      type: Sequelize.INTEGER,
      defaultValue: 0,
    },
    ratings: {
      type: Sequelize.DECIMAL(10, 2),
    },
    review: {
      type: Sequelize.STRING,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    truck_id: {
      type: Sequelize.INTEGER,
      references: {
        model: sequelize.models.trucks,
        key: "id",
      },
      allowNull: false,
    },
    available: {
      type: Sequelize.BOOLEAN,
      defaultValue: true,
    },
    category_id: {
      type: Sequelize.INTEGER,
      references: {
        model: sequelize.models.categories,
        key: "id",
      },
      allowNull: false,
    },
  });

  Menu.associate = function (models) {
    Menu.belongsTo(models.trucks, {
      foreignKey: "truck_id",
      targetKey: "id",
      as: "truck_info",
    });
    Menu.hasMany(models.items, { as: "items", foreignKey: "menu_id" });
    Menu.belongsTo(models.categories, {
      foreignKey: "category_id",
      targetKey: "id",
      as: "category",
    });
  };

  Menu.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    return values;
  };
  return Menu;
};
