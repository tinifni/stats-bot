const R = require("ramda");

module.exports = ({
  sequelize,
  membersModel,
  membersSerializer,
  bansModel
}) => {
  return {
    list: async () => {
      const members = await membersModel.findAll();
      return R.map(membersSerializer.serialize, members);
    },
    create: async (params) => {
      if (R.isNil(params.name)) {
      }

      const member = await membersModel.create({
        name: params.name
      }).then(member => {
        return member;
      });

      return membersSerializer.serialize(member);
    },
    destroy: async (name) => {
      if (R.isNil(name)) {
      }

      const member = await membersModel.findOne({
        attributes: ["id", "name"],
        where: { name }
      });

      await sequelize.transaction(async transaction => {
        await membersModel.destroy({
          where: { id: member.id },
          transaction
        });
      });

      return member;
    },
    ban: async (name) => {
      if (R.isNil(name)) {
      }
 
      const member = await membersModel.findOrCreate({
        where: { name }
      }).spread((member, created) => {
        console.log("New member created?", created);
        return member;
      });

      const ban = await bansModel.findOrCreate({
        where: { memberId: member.id }
      }).spread((ban, created) => {
        console.log("New ban created?", created);
        return ban;
      });

      return membersSerializer.serialize(member);
    }
  };
};
