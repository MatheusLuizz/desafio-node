const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); 
const User = require('./User');

// definindo o modelo Club
const Club = sequelize.define('Club', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  created_by: {
    type: DataTypes.INTEGER,
    allowNull: false, 
    references: {
      model: User, // relacionando com o modelo de User
      key: 'id', // campo de referência do usuário criador do clube
    },
  },
}, {
  tableName: 'clubs',
  timestamps: true,
});

async function syncDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log('Tabela de clubes sincronizada com o banco de dados');
  } catch (error) {
    console.error('Erro ao sincronizar a tabela:', error);
  }
}

syncDatabase();

module.exports = Club;
