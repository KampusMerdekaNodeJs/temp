const bcrypt = require('bcrypt');
const { User } = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Generate a hashed password
    const hashedPassword = await bcrypt.hash('your_password', 10);

    // Create a user with the hashed password
    await User.create({
      full_name: "dummmytest",
        email: "dummy@gmail.com",
        password: "123456",
        gender:"male",
        role:"admin",
        balance: 1000000,
        createdAt: new Date(),
        updatedAt: new Date(),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Delete the user
    await User.destroy({
      where: {
        email: 'john@example.com'
      }
    });
  }
};
