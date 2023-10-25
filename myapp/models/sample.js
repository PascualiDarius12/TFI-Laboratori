'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sample extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Sample.belongsToMany(models.Exam, { through: 'Examsample' }); //N..N, through es la tabla intermedia que se genera entre las dos relacions
    }
  }
  Sample.init({
    type: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sample',
  });
  return Sample;
};