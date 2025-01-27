"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Allcodes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Allcodes.hasOne(models.Product, {
        foreignKey: "category",
        as: "categoryData",
      });
      Allcodes.hasOne(models.Order, {
        foreignKey: "payment_id",
        as: "paymentData",
      });
      Allcodes.hasOne(models.Voucher, {
        foreignKey: "voucher_id",
        as: "voucherAllcodes",
      });
    }
  }
  Allcodes.init(
    {
      type: DataTypes.STRING,
      value: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      label: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Allcodes",
    }
  );
  return Allcodes;
};
