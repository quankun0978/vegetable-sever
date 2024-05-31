"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Voucher extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Voucher.hasOne(models.Code, {
        foreignKey: "voucher_id",
        as: "voucherData",
      });
      Voucher.belongsTo(models.Allcodes, {
        foreignKey: "voucher_id",
        targetKey: "value",
        as: "voucherAllcodes",
      });
    }
  }
  Voucher.init(
    {
      voucher_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      discount: DataTypes.DOUBLE,
      point: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Voucher",
    }
  );
  return Voucher;
};
