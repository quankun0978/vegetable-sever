"use strict";
const { v4: uuidv4 } = require("uuid"); // Thêm module uuid

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  News.init(
    {
      news_id: {
        type: DataTypes.UUID,
        primaryKey: true,
      },
      type_new: DataTypes.STRING,
      title: DataTypes.TEXT,
      content: DataTypes.TEXT,
      description: DataTypes.TEXT,
      imgPath: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "News",
    }
  );
  return News;
};
