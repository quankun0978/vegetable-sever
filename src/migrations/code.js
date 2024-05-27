"use strict";
const { v4: uuidv4 } = require("uuid"); // Thêm module uuid
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Codes", {
      code_id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: uuidv4(), // Sinh chuỗi UUID tự động
      },
      UserUserId: {
        type: Sequelize.UUID,
      },
      VoucherVoucherId: {
        type: Sequelize.UUID,
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Codes");
  },
};
