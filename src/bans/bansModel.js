module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "bans",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      memberId: {
        type: DataTypes.UUID,
        field: "member_id"
      },
      note: {
        type: DataTypes.STRING,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: "created_at"
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at"
      }
    },
    {
      underscored: true,
      tableName: "bans"
    }
  );
};
