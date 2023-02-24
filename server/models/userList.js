const { DataTypes } = require("sequelize");

const { sequelize } = require("../util/database");

module.exports = {
  UserList: sequelize.define("userlist", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    bookid: DataTypes.INTEGER,
    title: DataTypes.STRING,
    imageurl: DataTypes.TEXT,
  }),
};
