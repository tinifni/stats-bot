module.exports = ({
  bansService
}) => {
  return {
    list: async () => {
      const bans = await bansService.list();
      return bans;
    }
  };
};
