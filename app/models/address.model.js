module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define("addresses", {
        city: {
            type: Sequelize.STRING,
            allowNull: false
        },
        state: {
            type: Sequelize.STRING,
            allowNull: false
        },
        pincode: {
            type: Sequelize.STRING,
            allowNull: false
        },
        createdAt: {
            type: Sequelize.DATE,
            defaultValue: new Date()
        },
        updatedAt: {
            type: Sequelize.DATE,
            defaultValue: new Date()
        },
        user_id: {
            type: Sequelize.INTEGER,
            references: {
                model: sequelize.models.users,
                key: 'id'
            },
            allowNull: false
        }
    });
    
    Address.associate = function (models) {
        Address.belongsTo(models.users, { foreignKey: 'user_id', targetKey: 'id', as: 'user_info' })
    };

    Address.prototype.toJSON = function () {
        var values = Object.assign({}, this.get());
        // delete values.createdAt;
        return values;
    }
    return Address;
};

