module.exports = (sequelize, Sequelize) => {
  const Otp = sequelize.define("otps", {
    otp: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    expired: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    createdAt: {
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
        key: "id",
      },
      allowNull: false,
      unique: true,
    },
  });

  Otp.associate = function (models) {
    Otp.belongsTo(models.users, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "user_info",
    });
  };

  Otp.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    return values;
  };
  return Otp;
};
