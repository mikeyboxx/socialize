const Sequelize = require("sequelize");
require("dotenv").config();

let sequelize;
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306
      // dialectOptions: {
      //   typeCast: function (field, next) { // for reading from database
      //     if (field.type === 'DATETIME') {
      //       return field.string()
      //     }
      //       return next()
      //     },
      // },
    }
  );
}

module.exports = sequelize;
