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
      Code.belongsTo(models.User);
      Code.belongsTo(models.Voucher);
    }
  }
  Code.init(
    {
      code_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      UserUserId: DataTypes.UUID,
      VoucherVoucherId: DataTypes.UUID,
    },
    {
      sequelize,
      modelName: "Code",
    }
  );
  return Code;
};
