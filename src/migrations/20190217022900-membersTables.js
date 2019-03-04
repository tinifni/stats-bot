"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("members", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });

    await queryInterface.createTable("bans", {
      id: {
        primaryKey: true,
        type: Sequelize.UUID,
        allowNull: false,
        defaultValue: Sequelize.UUIDV4
      },
      member_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "members",
          key: "id"
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE"
      },
      note: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },

  down: async queryInterface => {
    queryInterface.dropTable("bans");
    return queryInterface.dropTable("members");
  }
};
