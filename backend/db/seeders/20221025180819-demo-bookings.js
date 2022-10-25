'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 2,
        startDate: "2022-12-27",
        endDate: "2023-01-10"
      },
      {
        spotId: 2,
        userId: 1,
        startDate: "2022-11-23",
        endDate: "2022-12-05"
      },
      {
        spotId: 3,
        userId: 3,
        startDate: "2022-10-25",
        endDate: "2022-11-03"
      },
      {
        spotId: 4,
        userId: 1,
        startDate: "2023-04-25",
        endDate: "2023-05-03"
      }
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Bookings', {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
