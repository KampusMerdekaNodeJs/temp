"use strict";
const { v4: uuidv4 } = require("uuid");
const hashingData = require("../utils/hash.bcrypt");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("Users", [
      {
        id: uuidv4(),
        full_name: "ujangsuracep",
        email: "emailtesting@gmail.com",
        password: hashingData("testes123"),
        gender: "male",
        role: "admin",
        balance: 10000000,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
