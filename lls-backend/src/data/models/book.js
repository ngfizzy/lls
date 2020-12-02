'use strict';
const {
  Model
} = import('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Book.init({
    cover: DataTypes.STRING,
    title: DataTypes.STRING,
    author: DataTypes.STRING,
    description: DataTypes.STRING,
    summary: DataTypes.STRING,
    copies: DataTypes.INTEGER,
    ebook: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Book',
  });
  return Book;
};