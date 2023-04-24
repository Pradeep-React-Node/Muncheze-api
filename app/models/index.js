const dbConfig = require('./../config/db.config');
const Sequelize = require('sequelize');
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: 3306,
  define: {
    timestamps: false,
  },
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require('./user.model.js')(sequelize, Sequelize);
db.addresses = require('./address.model.js')(sequelize, Sequelize);
db.trucks = require('./truck.model.js')(sequelize, Sequelize);
db.menus = require('./menu.model.js')(sequelize, Sequelize);
db.categories = require('./category.model.js')(sequelize, Sequelize);
db.payments = require('./payment.model.js')(sequelize, Sequelize);

db.orders = require('./order.model.js')(sequelize, Sequelize);
db.items = require('./item.model.js')(sequelize, Sequelize);
db.statuses = require('./status.model.js')(sequelize, Sequelize);
db.otp = require('./otp.model.js')(sequelize, Sequelize);
db.truck_review = require('./truck_review.model.js')(sequelize, Sequelize);
db.favorites = require('./favorites.model.js')(sequelize, Sequelize);

Object.keys(db).forEach((key) => {
  if ('associate' in db[key]) {
    db[key].associate(db);
  }
});

module.exports = db;
