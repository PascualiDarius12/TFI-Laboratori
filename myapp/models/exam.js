'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Exam extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Exam.belongsToMany(models.Sample, { through: 'ExamSample' }); //N..N
      Exam.belongsToMany(models.Determinant, { through: 'ExamDeterminant' }); //N..N
      Exam.belongsToMany(models.Order, { through: models.OrderExam });
      Exam.belongsToMany(models.Sample, { through: models.ExamSample});
     
    }
  }
  Exam.init({
    name: DataTypes.STRING,
    abbreviation: DataTypes.STRING,
    detail: DataTypes.STRING,
    active: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'Exam',
  });
  return Exam;
};