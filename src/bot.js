/**
    This is the requirement / dependency setup. 
    I did it this way to create a cleaner look.
    Although, absolutely not required.
*/
const { Client } = require('discord.js');
const { RedisClient } = require('discord.js-redis');
const dcParser = require('discord-command-parser');
const config = require("./config/config")(process.env);
const appModules = require("./config/appModules")({
  config
});

/**
    We're now setting up both our Bot client and our Redis
    client here.
*/
const client = new Client();

/** 
    Redis client using discord.js-redis.
    When using the constructor for discord.js-redis you can specific options for 
    node-redis as well (such as amount of databases, host, port, password, etc)
*/
const redis = new RedisClient(client, {
  host: 'redis'
});

/**
    Postgres client
*/
const { bansService, membersService } = appModules;

/**
    Bot commands
 */
const commands = require('./lib/commands')({ bansService, membersService });

/** 
    Fire events! 
*/
redis.on('ready', () => console.log('Redis ready!'));
client.on('ready', () => console.log('Discord ready!'));

/* 
    Message Handler 
*/
client.on('message', async (msg) => {
  let parsed = dcParser.parse(msg, config.settings.prefix);
  if (!parsed.success) return;
  if (msg.author.bot) return;

  let command = parsed.command;
  let parsedArguments = parsed.arguments;
  let subCommand = parsedArguments[0];
  let name = parsedArguments[1];
  let message;

  switch (command) {
    case 'hi':
      msg.channel.send('hi :upside_down:');
      break;
    case 'ban':
      message = await commands.ban(subCommand, name);

      msg.channel.send(message);
      break;
    case 'member':
      message = await commands.member(subCommand, name);

      msg.channel.send(message);
      break;
    default:
      message = "help:\n" +
        "```\n" +
        "member add <member id>\n" +
        "member remove <member_id>\n" +
        "member ban <member_id>\n" +
        "member list\n" +
        "ban list\n" +
        "```";

      msg.channel.send(message);
  }
});


/**
    Start and login.
*/
client.login(config.settings.token);
