"use strict";

// /** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("drones", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      uuid: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      serial_num: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      model: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      weight: {
        allowNull: true,
        type: Sequelize.DECIMAL(12, 2),
      },
      availabile_weight: {
        allowNull: true,
        type: Sequelize.DECIMAL(12, 2),
      },
      battery_capacity: {
        allowNull: true,
        type: Sequelize.INTEGER,
      },
      state: {
        allowNull: true,
        type: Sequelize.STRING,
      },
      createdAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
      updatedAt: {
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("drones");
  },
};
