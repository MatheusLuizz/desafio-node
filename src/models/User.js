const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // importando a conexão com o banco

const User = sequelize.define('User', {
  // atributos do user
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // email único
    validate: {
      isEmail: true, // garantindo que seja um email válido
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  timestamps: true,
});

// sincronizando o modelo com o banco de dados
async function syncDatabase() {
  try {
    await sequelize.sync({ force: false });
    console.log('Tabela de usuários sincronizada com o banco de dados');
  } catch (error) {
    console.error('Erro ao sincronizar a tabela:', error);
  }
}

syncDatabase();

module.exports = User;
