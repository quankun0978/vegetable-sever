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
      CartItem.belongsTo(models.User);
      CartItem.belongsTo(models.Product);
    }
  }
  CartItem.init(
    {
      UserUserId: DataTypes.UUID,
      ProductProductId: DataTypes.UUID,
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
