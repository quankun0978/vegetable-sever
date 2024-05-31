"use strict";
const { v4: uuidv4 } = require("uuid"); // Thêm module uuid

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Order, {
        foreignKey: "user_id",
        as: "orderUser",
      });
      User.hasOne(models.Code, {
        foreignKey: "user_id",
      });
      User.hasMany(models.Comment, {
        foreignKey: "user_id",
        as: "userData",
      }); // User.hasOne(models.Cart);
      User.belongsToMany(models.Product, {
        through: "CartItem",
        foreignKey: "user_id",
        as: "userCart",
      });
    }
  }
  User.init(
    {
      user_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      address: DataTypes.STRING,
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      password: DataTypes.STRING,
      refresh_token: DataTypes.STRING,
      point: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
