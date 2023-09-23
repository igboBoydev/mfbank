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
      "medications",
      [
        {
          uuid: uuid(),
          name: "DANASEED",
          weight: 1000,
          code: "BGGLBKGVG",
          image: "www.cloudinary.com/images/",
          drone_id: "1",
        },

        {
          uuid: uuid(),
          name: "PROCOLD",
          weight: 1000,
          code: "JNGVGLVVGGKGKCJYF",
          image: "www.cloudinary.com/images/",
          drone_id: "3",
        },
        {
          uuid: uuid(),
          name: "PARACETAMOL",
          weight: 1000,
          code: "KNCHBHCKHKHJC",
          image: "www.cloudinary.com/images/",
          drone_id: "5",
        },
        {
          uuid: uuid(),
          name: "ANTICEPTIC",
          weight: 1000,
          code: "IUGJHCJHKJHK.JJ",
          image: "www.cloudinary.com/images/",
          drone_id: "9",
        },
        {
          uuid: uuid(),
          name: "EYEDROP",
          weight: 1000,
          code: "IKJGHJHJHGNB",
          image: "www.cloudinary.com/images/",
          drone_id: "11",
        },
        {
          uuid: uuid(),
          name: "EYEDROP",
          weight: 1000,
          code: "IUYTHGRDFGHJG",
          image: "www.cloudinary.com/images/",
          drone_id: "14",
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
    await queryInterface.bulkDelete("medications", null, {});
  },
};

// 1. impliment user profile  --- deposite, transfer
// 2.
