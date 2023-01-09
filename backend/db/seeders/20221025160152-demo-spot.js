'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA; 
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    return queryInterface.bulkInsert(options, [
      {
        ownerId: 1,
        address: "3452 Country Club Dr",
        city: "Aurora",
        state: "Colorado",
        country: "United States of America",
        lat: 39.372211,
        lng: -104.856087,
        name: "Colorado Luxury",
        description: "Housed in one of the best-gated communities, this spot has sublime views of Pikes Peak and Mt Evans. Perfect spot to relax for a weekend",
        price: 600
      },
      {
        ownerId: 2,
        address: "6 W 14th St Unit B",
        city: "Manhattan",
        state: "New York",
        country: "United States of America",
        lat: 40.753250,
        lng: -74.003807,
        name: "A Night Out",
        description: "Beautiful luxury apartment in the heart of Manhattan, perfect for the night life. Enjoy a night out at this wonderful spot.",
        price: 1000
      },
      {
        ownerId: 2,
        address: "1269 S Van Ness Ave Apt A",
        city: "San Francisco",
        state: "California",
        country: "United States of America",
        lat: 37.752860,
        lng: -122.415950,
        name: "The High Life",
        description: "Cute apartment in San Francisco. Perfect for hosting guests and going out.",
        price: 600
      },
      {
        ownerId: 2,
        address: "4765 Chapel Hill Rd",
        city: "Dallas",
        state: "Texas",
        country: "United States",
        lat: 32.848620,
        lng: -96.733280,
        name: "Modern Sleek",
        description: "Luxurious mansion in the heart of Dallas. Yeehaw!",
        price: 1000
      },
      {
        ownerId: 3,
        address: "1959 Wewatta St Ph 3-1309",
        city: "Denver",
        state: "Colorado",
        country: "United States",
        lat: 39.739235,
        lng: -104.990250,
        name: "Luxury Denver Condo",
        description: "Beautiful condo in downtown Denver. Perfect for a night out with friends.",
        price: 1200
      },
      {
        ownerId: 3,
        address: "5520 Wilshere Blvd",
        city: "Los Angeles",
        state: "California",
        country: "United States",
        lat: 34.052235,
        lng: -118.243683,
        name: "Desmond at Wilshere",
        description: "Lovely condo for family or friends. In the heart of LA. Perfect for night life.",
        price: 800
      },
      {
        ownerId: 1,
        address: "9830 Cardigan Pl",
        city: "Beverly Hills",
        state: "California",
        country: "United States",
        lat: 34.080292,
        lng: -118.404678,
        name: "Bazyler Studio",
        description: "Extreme luxury here! This is THE house you want to stay in while in Beverly Hills.",
        price: 1300
      },
      {
        ownerId: 1,
        address: "303 W 5th St",
        city: "Austin",
        state: "Texas",
        country: "United States",
        lat: 30.267153,
        lng: -97.743057,
        name: "Hanover Republic Square",
        description: "Lovely apartment in the middle of Austin. Enjoy all of what the city of Austin has to offer you here!",
        price: 800
      },
      {
        ownerId: 3,
        address: "6607 Overbrook Dr",
        city: "Parker",
        state: "Texas",
        country: "United States",
        lat: 33.060060,
        lng: -96.635730,
        name: "Texas Style Home",
        description: "Lovely Texas style family home. Perfect to bring the family to during your stay. Your fam will love it!",
        price: 900
      },
      {
        ownerId: 2,
        address: "145 W 110th St Apt 8C",
        city: "New York",
        state: "New York",
        country: "United States",
        lat: 40.712776,
        lng: -74.005974,
        name: "Downtown Life",
        description: "Luxurious New York apartment perfect for the big shot callers. Beautiful view of the city and amazing night life.",
        price: 1500
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Spots'
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete(options, {
      name: { [Op.in]: ["Breaking Bad House", "O-Block", "The Park", "Tokyo Metropolitan Curse Technical College"] }
    }, {});
  }
};
