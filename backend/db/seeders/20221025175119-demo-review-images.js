'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('ReviewImages', [
      {
        reviewId: 1,
        url: "https://www.housedigest.com/img/gallery/heres-where-you-can-visit-walter-whites-house-from-breaking-bad/where-to-find-the-breaking-bad-house-1649249304.jpg"
      },
      {
        reviewId: 2,
        url: "https://keyimg.hiphoplately.com/1527825600/tekashi-6ix9ine-visits-chicagos-o-block-to-taunt-chief-keef--lil-reese.1528900361.med.jpg"
      },
      {
        reviewId: 3,
        url: "https://i.ytimg.com/vi/J613wJr2lSI/maxresdefault.jpg"
      },
      {
        reviewId: 4,
        url: "https://static1.srcdn.com/wordpress/wp-content/uploads/2022/04/Jujutsu-Kaisen-Gojo-smiling.jpg"
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('ReviewImages', {
      reviewId: { [Op.in]: [1, 2, 3, 4] }
    }, {})
  }
};
