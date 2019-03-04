module.exports = ({
  membersService
}) => {
  return {
    list: async () => {
      const members = await membersService.list();
      return members;
    },
    add: async (name) => {
      const member = await membersService.create({ name: name });
      return member;
    },
    remove: async (name) => {
      const member = await membersService.destroy(name);
      return member;
    },
    ban: async (name) => {
      const member = await membersService.ban(name);
      return member;
    }
  };
};
