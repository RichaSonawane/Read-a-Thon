const { sequelize } = require("../util/database");
const { DataTypes } = require("sequelize");

module.exports = {
  Tracker: sequelize.define("tracker", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    progress: DataTypes.INTEGER,
    bookid: DataTypes.INTEGER,
  }),
};
