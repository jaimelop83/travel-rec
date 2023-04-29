// seed the user table in the travel database with some data
"use strict";

const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword1 = await bcrypt.hash("password1", 10);
    const hashedPassword2 = await bcrypt.hash("password2", 10);

    await queryInterface.bulkInsert(
      "Users",
      [
        {
          id: uuidv4(),
          email: "user1@example.com",
          username: "user1",
          password: hashedPassword1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          email: "user2@example.com",
          username: "user2",
          password: hashedPassword2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        // Add more user entries here
        {
          id: uuidv4(),
          email: "john.doe@example.com",
          username: "johndoe",
          password: hashedPassword1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          email: "jane.doe@example.com",
          username: "janedoe",
          password: hashedPassword2,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: uuidv4(),
          email: "mark.smith@example.com",
          username: "marksmith",
          password: hashedPassword1,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
