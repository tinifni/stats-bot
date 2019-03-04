/*
  Sequelize CLI configuration.

  Required by CLI to generate and run migrations
*/

const { postgres: dbConfig } = require("./config")(process.env);

module.exports = {
  ...dbConfig,
  logging: true,
  migrationStorageTableName: "sequelize_meta",
  dialectOptions: {
    ssl: dbConfig.ssl
  }
};
