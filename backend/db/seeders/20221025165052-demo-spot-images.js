'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'https://www.fancypantshomes.com/wp-content/uploads/2020/03/original_1333066725walts.jpg',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://freerangestock.com/sample/28816/breaking-bad-walter-white-house.jpg',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://upload.wikimedia.org/wikipedia/commons/e/ee/Image_Parkway_Gardens.jpg',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://i.pinimg.com/736x/d7/3e/55/d73e55ab547743fb3658eb8bd9b46d8c--regular-show.jpg',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://m.media-amazon.com/images/M/MV5BYjFkNjU3ZGEtNTBjOS00ZTYyLTkxZGQtMDJkYjQ3M2I2ODk5XkEyXkFqcGdeQXVyNjAwNDUxODI@._V1_.jpg',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://media.istockphoto.com/id/1141078602/photo/emerald-lake-on-a-cloudy-day-with-its-thawed-lake-summer-and-fun-rocky-mountain-canada.jpg?b=1&s=170667a&w=0&k=20&c=0hv6eWuKuPhYAHdKo4rJPgrz-aW-bUBCn7-JSOGBvX8=',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJ_LMvf59pxaT_xTfQCg77Qyk8B0oNc6V4veBMqIMtOjA1koEKzUiCkN3o3wKphh7iHDU&usqp=CAU',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://www.sunset.com/wp-content/uploads/cozy-cabins-cathedral-mountain-lodge-bc-pr-0919-900x500.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://c4.wallpaperflare.com/wallpaper/771/768/18/canada-cabin-bridge-wallpaper-thumb.jpg',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://s1.1zoom.me/b4854/318/Canada_Parks_Lake_Houses_Bridges_Emerald_Lake_Fir_513462_1366x768.jpg',
        preview: false
      },
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
