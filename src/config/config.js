module.exports = envVariables => {
  return {
    postgres: {
      database: envVariables.POSTGRES_DATABASE,
      host: envVariables.POSTGRES_HOST,
      password: envVariables.POSTGRES_PASSWORD,
      port: envVariables.POSTGRES_PORT,
      username: envVariables.POSTGRES_USER,
      dialect: "postgres",
      ssl: false
    },
    settings: {
      token: envVariables.DISCORD_TOKEN,
      prefix: envVariables.BOT_PREFIX
    }
  };
};
