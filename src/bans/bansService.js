const R = require("ramda");

module.exports = ({
  sequelize,
  bansModel,
  bansSerializer,
  membersModel
}) => {
  return {
    list: async () => {
      const bans = await bansModel.findAll({
        include: [{ model: membersModel }]
      });
      return R.map(bansSerializer.serialize, bans);
    },
    create: async (params) => {
      if (R.isNil(params.name)) {
      }

      const ban = await bansModel.create({
        memberId: params.memberId,
        note: params.note
      }).then(ban => {
        return ban;
      });

      return bansSerializer.serialize(ban);
    },
    destroy: async (name) => {
      if (R.isNil(name)) {
      }

      const member = await membersModel.findOne({
        attributes: ["id", "name"],
        where: { name }
      });

      const ban = member.ban;

      await sequelize.transaction(async transaction => {
        await bansModel.destroy({
          where: { id: ban.id },
          transaction
        });
      });

      return ban;
    }
  };
};
