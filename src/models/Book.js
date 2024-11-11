const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Club = require('./Club');

const Book = sequelize.define('Book', {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  clubId: {
    type: DataTypes.INTEGER,
    references: {
      model: Club,
      key: 'id',
    },
  },
});

Club.hasMany(Book, { foreignKey: 'clubId' });
Book.belongsTo(Club, { foreignKey: 'clubId' });

module.exports = Book;
