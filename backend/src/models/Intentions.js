const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

// intentions**: id, name, email, phone, message, status

const Intentions = sequelize.define("intentions", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  message: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: false,
    defaultValue: true,
  },
});


module.exports = Intentions;
