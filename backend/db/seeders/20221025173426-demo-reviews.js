'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 2,
        review: 'VERY GOOD MMMM VERY BADDDDDDD heheeh',
        stars: 5,
      },
      {
        spotId: 2,
        userId: 1,
        review: 'scary but fun........',
        stars: 3,
      },
      {
        spotId: 3,
        userId: 3,
        review: 'gumball machine runs the place... dont approve. would give negative stars if i could',
        stars: 1,
      },
      {
        spotId: 4,
        userId: 2,
        review: 'very calming place! felt at peace, thanks to Gojo :D',
        stars: 4,
      },
      {
        spotId: 4,
        userId: 1,
        review: 'boring. nothing here...whats the big deal???',
        stars: 2,
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Reviews', {
      spotId: { [Op.in]: [1, 2, 3, 4] }
    }, {});
  }
};
