module.exports = sequelize => {
  const membersModel = sequelize.import("../members/membersModel");
  const bansModel = sequelize.import("../bans/bansModel");

  // Define associations
  membersModel.hasOne(bansModel);
  bansModel.belongsTo(membersModel);

  return {
    membersModel,
    bansModel
  };
};
