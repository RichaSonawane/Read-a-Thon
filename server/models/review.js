const { DataTypes } = require("sequelize");
const { sequelize } = require("../util/database");

module.exports = {
  Review: sequelize.define("review", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: DataTypes.STRING,
    content: DataTypes.TEXT,
    privateStatus: DataTypes.BOOLEAN,
  }),
};
