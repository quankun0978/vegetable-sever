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
      Product.hasMany(models.Comment, { foreignKey: "product_id" });
      Product.belongsTo(models.Allcodes, {
        foreignKey: "category",
        targetKey: "value",
        as: "categoryData",
      });
      Product.belongsToMany(models.User, { through: "CartItem" ,foreignKey:"product_id",as:"productCart"});

      // Product.belongsToMany(models.OrderItem, { through: "Order" ,foreignKey:"product_id",as:"productOrder"});
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
