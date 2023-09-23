"use strict";
var uuid = require("node-uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      "drones",
      [
        {
          uuid: uuid(),
          serial_num:
            "L1NE8GZhwRp951815oRQBou7ufOk7FidTQNgf5QcMkexV56zk3yp2RR7UQH4l3N25f5o1628kbLy3CSG2D5W7w3U6393bNe873FS",
          model: "Anything",
          weight: 4000,
          availabile_weight: 4000,
          battery_capacity: 100,
          state: "IDLE",
        },

        {
          uuid: uuid(),
          serial_num:
            "L1NE8GZhwRp951815678Bou7ufOk7FidTQNgf5QcMkexV56zk3yp2RR7UQH4l3N25f5o1628kbLy3CSG2D5W7w3U6393bNe873FS",
          model: "Anything",
          weight: 2000,
          availabile_weight: 2000,
          battery_capacity: 100,
          state: "IDLE",
        },
        {
          uuid: uuid(),
          serial_num:
            "L17GIHJhwRp951815oRQBou7ufOk7FidTQNgf5QcMkexV56zk3yp2RR7UQH4l3N25f5o1628kbLy3CSG2D5W7w3U6393bNe873FS",
          model: "Anything",
          weight: 1000,
          availabile_weight: 1000,
          battery_capacity: 100,
          state: "IDLE",
        },
        {
          uuid: uuid(),
          serial_num:
            "L1NE8GZhwRp951815oRQBou7u889HJidTQNgf5QcMkexV56zk3yp2RR7UQH4l3N25f5o1628kbLy3CSG2D5W7w3U6393bNe873FS",
          model: "Anything",
          weight: 1000,
          availabile_weight: 1000,
          battery_capacity: 100,
          state: "IDLE",
        },
        {
          uuid: uuid(),
          serial_num:
            "L1NE8GZhwRp951815oRQ66YHGJOk7FidTQNgf5QcMkexV56zk3yp2RR7UQH4l3N25f5o1628kbLy3CSG2D5W7w3U6393bNe873FS",
          model: "Anything",
          weight: 1000,
          availabile_weight: 1000,
          battery_capacity: 100,
          state: "IDLE",
        },
        {
          uuid: uuid(),
          serial_num:
            "L1NE8GZhwRp9511234HQBou7ufOk7FidTQNgf5QcMkexV56zk3yp2RR7UQH4l3N25f5o1628kbLy3CSG2D5W7w3U6393bNe873FS",
          model: "Anything",
          weight: 4000,
          availabile_weight: 4000,
          battery_capacity: 100,
          state: "IDLE",
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("drones", null, {});
  },
};

// 1. impliment user profile  --- deposite, transfer
// 2.
