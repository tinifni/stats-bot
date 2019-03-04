const Sequelize = require("sequelize");

module.exports = config => {
  return new Sequelize(config.database, config.username, config.password, {
    dialect: config.dialect,
    host: config.host,
    dialectOptions: {
      ssl: config.ssl
    }
  });
};
