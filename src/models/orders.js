"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "user_id",
        as: "orderUser",
      });
      Order.belongsTo(models.Allcodes, {
        foreignKey: "payment_id",
        targetKey: "value",
        as: "paymentData",
      });
      Order.belongsTo(models.Allcodes, {
        foreignKey: "status",
        targetKey: "value",
        as: "statusData",
      });
      Order.belongsToMany(models.OrderItem, {
        through: "CartItem",
        foreignKey: "order_id",
        as: "orderData",
      });
    }
  }
  Order.init(
    {
      user_id: DataTypes.UUID,
      order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      total: DataTypes.DOUBLE,
      status: DataTypes.STRING,
      payment_id: DataTypes.STRING,
      address: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
