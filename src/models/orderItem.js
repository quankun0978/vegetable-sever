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
      OrderItem.belongsTo(models.Order);
      OrderItem.belongsTo(models.Product);
    }
  }
  OrderItem.init(
    {
      OrderOrderId: DataTypes.UUID,
      ProductProductId: DataTypes.UUID,
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
