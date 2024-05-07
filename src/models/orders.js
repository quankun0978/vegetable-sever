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
      Order.belongsTo(models.User);
      Order.belongsToMany(models.Product, { through: "OrderItem" });
    }
  }
  Order.init(
    {
      UserUserId: DataTypes.UUID,
      order_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      total: DataTypes.DOUBLE,
      status: DataTypes.STRING,
      payment_id: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
