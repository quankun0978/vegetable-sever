"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CartItem.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "user_id",
        as: "userCart",
      });
      CartItem.belongsTo(models.Product, {
        foreignKey: "product_id",
        targetKey: "product_id",
        as: "productCart",
      });
    }
  }
  CartItem.init(
    {
      user_id: DataTypes.UUID,
      product_id: DataTypes.UUID,
      quantity: DataTypes.INTEGER,
      total: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
