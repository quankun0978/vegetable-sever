"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.Comment);
      Product.belongsToMany(models.Cart, { through: "CartItem" });
      Product.belongsToMany(models.Order, { through: "OrderItem" });
    }
  }
  Product.init(
    {
      product_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      price_sale: DataTypes.DOUBLE,
      category: DataTypes.STRING,
      countBuy: DataTypes.BIGINT,
      description: DataTypes.TEXT,
      imgPath: DataTypes.TEXT,
    },
    { 
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
