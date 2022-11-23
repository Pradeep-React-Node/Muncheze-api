module.exports = (sequelize, Sequelize) => {
    const Category = sequelize.define("categories", {
        name: {
            type: Sequelize.STRING,
            unique: true
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: new Date()
        },

    });
    
    Category.associate = function (models) {
        Category.hasMany(models.menus, { foreignKey: 'category_id', as: 'food_info' })
    };

    Category.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());
        return values;
    }
    return Category;
};

