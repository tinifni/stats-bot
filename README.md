# Stats Bot

This is a Discord bot for managing members of a clan in Tap Titans 2.

# Development

1. Copy `example.env` to `.env` and put your own values
2. Start the bot
    ```sh
    docker-compose up -d
    ```

3. Initialize the database
    ```sh
    docker-compose run --rm bot node_modules/.bin/sequelize db:create
    ```

4. Run migrations
    ```sh
    docker-compose run --rm bot node_modules/.bin/sequelize db:migrate
    ```
