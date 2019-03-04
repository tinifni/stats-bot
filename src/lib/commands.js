const R = require("ramda");

module.exports = ({
  bansService,
  membersService
}) => {
  const banCommand = require('./commands/ban')({ bansService });
  const memberCommand = require('./commands/member')({ membersService });

  return {
    ban: async (command, name) => {
      let message = '';

      switch (command) {
        case 'list':
          let bans = await banCommand.list();

          if (R.isEmpty(bans)) {
            message = `There are no banned members.`
            break;
          }

          message = `banned members: ${R.map((ban) => {
            return ban.memberName;
          }, bans)}`
          break;
        default:
          message = "The `ban` command takes the following subcommands: `list`"
      }

      return message;
    },
    member: async (command, name) => {
      let message = '';
      let member;

      switch (command) {
        case 'add':
          member = await memberCommand.add(name);
          message = `Added member: ${member.name}`;
          break;
        case 'list':
          let members = await memberCommand.list();

          if (R.isEmpty(members)) {
            message = `There are no members.`
            break;
          }

          message = `Members: ${R.map((member) => {
            return member.name;
          }, members)}`
          break;
        case 'remove':
          member = await memberCommand.remove(name);
          message = `Removed member: ${member.name}`;
          break;
        case 'ban':
          member = await memberCommand.ban(name);
          message = `Banned member: ${member.name}`;
          break;
        default:
          message = "The `member` command takes the following subcommands:\n" +
            "```\n" +
            "add <member id>\n" +
            "remove <member_id>\n" +
            "ban <member_id>\n" +
            "list\n" +
            "```";
      }

      return message;
    }
  };
};
