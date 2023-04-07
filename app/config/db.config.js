module.exports = {
  HOST: process.env.DB_URL,
  // USER: "root",
  // PASSWORD: "",
  USER: process.env.DB_USER,
  PASSWORD: process.env.DB_PASSWORD,
  // PASSWORD: 'test1234*',
  DB: process.env.DB_NAME,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
// if u r creating apk please uncomment upside code and comment out bellow code
// module.exports = {
//   HOST: 'localhost',
//   USER: 'root',
//   PASSWORD: 'root',
//   // USER: 'admin',
//   // PASSWORD: 'Truck@123',
//   // PASSWORD: "test1234*",
//   DB: 'mancheez',
//   // DB: 'muncheze',
//   dialect: 'mysql',
//   pool: {
//     max: 5,
//     min: 0,
//     acquire: 30000,
//     idle: 10000,
//   },
// };

