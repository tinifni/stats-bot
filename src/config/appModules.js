/*
  Register all your controllers, services and models here.
  Do not require your dependencies in other files as it will make it hard to test it.
*/
module.exports = ({ config }) => {
  const sequelize = require("./sequelize.js")(config.postgres);

  const {
    membersModel,
  } = require("./models.js")(sequelize);
  const {
    bansModel,
  } = require("./models.js")(sequelize);

  const membersSerializer = require("../members/membersSerializer.js");
  const bansSerializer = require("../bans/bansSerializer.js");

  const membersService = require("../members/membersService.js")({
    sequelize,
    membersModel,
    membersSerializer,
    bansModel
  });
  const bansService = require("../bans/bansService.js")({
    sequelize,
    bansModel,
    bansSerializer,
    membersModel
  });

  return {
    sequelize,
    membersService,
    bansService
  };
};
