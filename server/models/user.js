// user.js
"use strict";

const { Model, DataTypes } = require("sequelize");
const { v4: uuidv4 } = require("uuid");

module.exports = (sequelize) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.Recommendation, {
        foreignKey: "userId",
        as: "recommendations",
      });
    }
    // add findByEmail function to User model
    static async findByEmail(email) {
      try {
        const user = await User.findOne({ where: { email: email } });
        return user;
      } catch (error) {
        throw error;
      }
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: uuidv4(),
        allowNull: false,
        primaryKey: true,
      },
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
