'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Determinant extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Determinant.hasMany(models.Value_reference);
    }
  }
  Determinant.init({
    name: DataTypes.STRING,
    abbreviation: DataTypes.STRING,
    detail: DataTypes.STRING,
    measurement: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Determinant',
  });
  return Determinant;
};