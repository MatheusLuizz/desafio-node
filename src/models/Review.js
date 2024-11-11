const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Book = require('./Book');

const Review = sequelize.define('Review', {
  rating: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      min: 1,
      max: 5,
    },
  },
  opinion: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  tableName: 'reviews',
  timestamps: true,
});

// aqui estou definindo as associações do usuário com o livro avaliado
Review.belongsTo(User, { foreignKey: 'userId' });
Review.belongsTo(Book, { foreignKey: 'bookId' });

async function syncDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log('Tabela de avaliações sincronizada com o banco de dados');
  } catch (error) {
    console.error('Erro ao sincronizar a tabela de avaliações:', error);
  }
}

syncDatabase();

module.exports = Review;
