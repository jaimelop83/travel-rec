'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Recommendation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Recommendation.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });      
    }
  }
  Recommendation.init({
    userId: DataTypes.UUID,
    destination: DataTypes.STRING,
    recommendation: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Recommendation',
  });
  return Recommendation;
};