'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  /**
   * @description Adds columns for "firstName" and "lastName" to a User table using
   * Sequelize's `addColumn` method.
   * 
   * @param { asynchronous function. } queryInterface - Sequelize Query Interface, which
   * provides a simple way to execute SQL queries directly against the database.
   * 
   * 	* `queryInterface`: This is the interface that provides methods for interacting
   * with the database. It is a Sequelize class.
   * 
   * @param { object } Sequelize - object used for interacting with databases and
   * providing operations to perform on the database.
   */
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('Users', 'firstName', {
      type: Sequelize.STRING(256)
    });
    await queryInterface.addColumn('Users', 'lastName', {
      type: Sequelize.STRING(256)
    });
  },

  /**
   * @description Removes two columns ("firstName" and "lastName") from a table called
   * " Users".
   * 
   * @param { `InstanceType`. } queryInterface - object that allows for interacting
   * with the underlying database management system through the Sequelize interface.
   * 
   * 	* `removeColumn()` is a method of `QueryInterface` that allows for removing a
   * column from a database table.
   * 	* `Users` is the name of the table for which columns are being removed.
   * 
   * 	Without any additional context or information, the `down` function only removes
   * two columns named 'firstName' and 'lastName' from the ` Users` table.
   * 
   * @param { object } Sequelize - Sequelize instance object used to execute the database
   * queries.
   */
  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('Users', 'firstName');
    await queryInterface.removeColumn('Users', 'lastName');
  }
};
