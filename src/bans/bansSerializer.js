module.exports = {
  serialize: ban => {
    if (!ban) {
      return;
    }

    return {
      id: ban.id,
      note: ban.note,
      memberId: ban.memberId,
      memberName: ban.member.name
    };
  }
};
