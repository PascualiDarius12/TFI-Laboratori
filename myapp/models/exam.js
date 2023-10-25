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
      Exam.hasMany(models.Exam_sub_group); // 1..N
      Exam.belongsToMany(models.Sample, { through: 'Examsample' }); //N..N
     
    }
  }
  Exam.init({
    name: DataTypes.STRING,
    detail: DataTypes.STRING,
    active: DataTypes.BOOLEAN,

  }, {
    sequelize,
    modelName: 'Exam',
  });
  return Exam;
};