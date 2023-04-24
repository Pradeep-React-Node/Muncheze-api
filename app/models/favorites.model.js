module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('favorites', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'id',
      },
      allowNull: false,
    },
    truck_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'trucks',
        key: 'id',
      },
      allowNull: false,
    },
  });

  Favorite.associate = function (models) {
    Favorite.belongsTo(models.users, {
      foreignKey: 'user_id',
      targetKey: 'id',
      as: 'user',
    });
    Favorite.belongsTo(models.trucks, {
      foreignKey: 'truck_id',
      targetKey: 'id',
      as: 'truck',
    });
  };

  return Favorite;
};
