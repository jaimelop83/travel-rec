// create a seeder for recommendation table in the travel database

// create a seeder for recommendation table in the travel database

'use strict';

const { User } = require('../models/index');

// Define sample destinations and reasons
const destinations = [
  { name: 'New York City', reason: 'Skyscrapers, food, and culture' },
  { name: 'Paris', reason: 'Romantic atmosphere, Eiffel Tower, and history' },
  { name: 'Sydney', reason: 'Beaches, Opera House, and wildlife' },
  { name: 'Tokyo', reason: 'Technology, food, and rich culture' },
  { name: 'London', reason: 'History, museums, and architecture' },
];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Fetch all users
    const users = await User.findAll();

    // Create an array of recommendations with valid userIds
    const recommendations = users.flatMap((user, index) => {
      return destinations.map(destination => ({
        userId: user.id,
        destination: destination.name,
        recommendation: `Recommendation for ${destination.name}`,
        reason: destination.reason,
        createdAt: new Date(),
        updatedAt: new Date(),
      }));
    });

    // Bulk insert recommendations
    await queryInterface.bulkInsert('Recommendations', recommendations, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Recommendations', null, {});
  },
};

  
  





// Path: server/seeders/recommendationSeeder.js