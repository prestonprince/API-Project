'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Spots', [
      {
        ownerId: 1,
        address: "308 Negra Arroyo Lane",
        city: "Albuquerque",
        state: "New Mexico",
        country: "United States of America",
        lat: 35.316116,
        lng: -106.581197,
        name: "Breaking Bad House",
        description: "Home of the infamous White family",
        price: 500
      },
      {
        ownerId: 2,
        address: "6400 S King Dr",
        city: "Chicago",
        state: "Illinois",
        country: "United States of America",
        lat: 41.777713,
        lng: -87.595033,
        name: "O-Block",
        description: "Place where Chief Keef grew up",
        price: 1000
      },
      {
        ownerId: 2,
        address: "Park AV 300",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.77493,
        lng: -122.419416,
        name: "The Park",
        description: "Regular Show's famous Park",
        price: 200
      },
      {
        ownerId: 3,
        address: "7 Chome-3-1 Hongo",
        city: "Bunkyo City",
        state: "Tokyo",
        country: "Japan",
        lat: 35.711224,
        lng: 139.766525,
        name: "Tokyo Metropolitan Curse Technical College",
        description: "Training ground for the next generation of sorcerers",
        price: 700
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      name: { [Op.in]: ["Breaking Bad House", "O-Block", "The Park", "Tokyo Metropolitan Curse Technical College"] }
    }, {});
  }
};
