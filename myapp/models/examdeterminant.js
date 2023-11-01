'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ExamDeterminant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  ExamDeterminant.init({
    
  }, {
    sequelize,
    modelName: 'ExamDeterminant',
  });
  return ExamDeterminant;
};