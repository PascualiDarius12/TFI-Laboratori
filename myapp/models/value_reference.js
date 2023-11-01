'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Value_reference extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Value_reference.init({
    gender: DataTypes.STRING,
    age: DataTypes.STRING,
    pregnant: DataTypes.BOOLEAN,
    max_value: DataTypes.DOUBLE,
    min_value: DataTypes.DOUBLE,
    max_limit: DataTypes.DOUBLE,
    min_limit: DataTypes.DOUBLE,
    active: DataTypes.BOOLEAN,
  }, {
    sequelize,
    modelName: 'Value_reference',
  });
  return Value_reference;
};