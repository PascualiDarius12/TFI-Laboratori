'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Determinants', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      abbreviation: {
        type: Sequelize.STRING
      },
      detail: {
        type: Sequelize.STRING
      },
      measurement: {
        type: Sequelize.STRING
      },
      value_max_male: {
        type: Sequelize.INTEGER
      },
      value_min_male: {
        type: Sequelize.INTEGER
      },
      value_max_female: {
        type: Sequelize.INTEGER
      },
      value_min_female: {
        type: Sequelize.INTEGER
      },
      active: {
        type: Sequelize.BOOLEAN
      },
      examSubGroupId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Exam_sub_groups", 
          key: "id", 
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Determinants');
  }
};