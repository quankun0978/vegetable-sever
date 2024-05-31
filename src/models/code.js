"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Code extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Code.belongsTo(models.User, {
        foreignKey: "user_id",
        targetKey: "user_id",
        as: "userData",
      });
      Code.belongsTo(models.Voucher, {
        foreignKey: "voucher_id",
        targetKey: "voucher_id",
        as: "voucherData",
      });
    }
  }
  Code.init(
    {
      code_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      user_id: DataTypes.UUID,
      voucher_id: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Code",
    }
  );
  return Code;
};
