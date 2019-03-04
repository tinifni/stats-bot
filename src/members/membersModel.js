module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    "members",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
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
      tableName: "members"
    }
  );
};
