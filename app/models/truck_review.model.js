module.exports = (sequelize, Sequelize) => {
  const TruckReview = sequelize.define("review", {
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: sequelize.models.users,
        key: "id",
      },
      allowNull: false,
    },
    truck_id: {
      type: Sequelize.INTEGER,
      references: {
        model: sequelize.models.trucks,
        key: "id",
      },
      allowNull: false,
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: true,
    },
    review_message: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    createdAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
    updatedAt: {
      type: Sequelize.DATE,
      defaultValue: new Date(),
    },
  });

  TruckReview.associate = function (models) {
    TruckReview.belongsTo(models.users, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "user_info",
    });
  };

  TruckReview.associate = function (models) {
    TruckReview.belongsTo(models.trucks, {
      foreignKey: "truck_id",
      targetKey: "id",
      as: "truck_info",
    });
  };

  TruckReview.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    // delete values.createdAt;
    return values;
  };
  return TruckReview;
};
