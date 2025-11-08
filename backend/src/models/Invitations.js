const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");
const Intentions = require("./Intentions");

//**invitations**: id, intention_id, token, expires_at, used

const Invitations = sequelize.define("invitations", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  intention_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: "intentions",
      key: "id",
    },
    onUpdate: "CASCADE",
    onDelete: "CASCADE",
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  used: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

// ✅ declarar associações
Invitations.belongsTo(Intentions, {
  foreignKey: "intention_id",
  as: "intention",
});

Intentions.hasOne(Invitations, {
  foreignKey: "intention_id",
  as: "invitation",
});

module.exports = Invitations;
