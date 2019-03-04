module.exports = {
  serialize: member => {
    if (!member) {
      return;
    }

    return {
      id: member.id,
      name: member.name
    };
  }
};
