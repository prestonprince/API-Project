'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://static.wikia.nocookie.net/breakingbad/images/6/6c/White_Residence.png/revision/latest?cb=20120619230021',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://us.v-cdn.net/5021068/uploads/editor/sn/4voup8mfgk24.png',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://static.wikia.nocookie.net/chiraqwar/images/2/20/Parkway_Gardens.png/revision/latest?cb=20220528233132',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://static.wikia.nocookie.net/theregularshow/images/5/5b/S6E27_The_Park.png/revision/latest?cb=20150626014644',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://static.wikia.nocookie.net/jujutsu-kaisen/images/d/d9/Tokyo_Metropolitan_Jujutsu_Technical_School_%28Anime%29.png/revision/latest?cb=20201010033541',
        preview: true
      }
    ], {})
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('SpotImages', {
      url: {
        [Op.in]: [
          'https://static.wikia.nocookie.net/breakingbad/images/6/6c/White_Residence.png/revision/latest?cb=20120619230021',
          'https://us.v-cdn.net/5021068/uploads/editor/sn/4voup8mfgk24.png',
          'https://static.wikia.nocookie.net/chiraqwar/images/2/20/Parkway_Gardens.png/revision/latest?cb=20220528233132',
          'https://static.wikia.nocookie.net/theregularshow/images/5/5b/S6E27_The_Park.png/revision/latest?cb=20150626014644',
          'https://static.wikia.nocookie.net/jujutsu-kaisen/images/d/d9/Tokyo_Metropolitan_Jujutsu_Technical_School_%28Anime%29.png/revision/latest?cb=20201010033541'
        ]
      }
    }, {});
  }
};
