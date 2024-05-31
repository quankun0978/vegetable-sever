"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderItem.belongsTo(models.Order, {
        foreignKey: "order_id",
        as: "orderData",
        targetKey: "order_id",
      });
      OrderItem.belongsTo(models.Product, {
        foreignKey: "product_id",
        as: "productOrder",
        targetKey: "product_id",
      });
    }
  }
  OrderItem.init(
    {
      order_id: DataTypes.UUID,
      product_id: DataTypes.UUID,
      quantity: DataTypes.INTEGER,
      total: DataTypes.DOUBLE,
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
