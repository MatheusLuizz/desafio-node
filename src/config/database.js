const { Sequelize } = require('sequelize');
require('dotenv').config(); 

// conexão com o banco de dados MySQL
const sequelize = new Sequelize({
  host: process.env.DB_HOST,
  dialect: 'mysql',             // Definindo o banco de dados como MySQL
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  logging: false, // Desativa o log das consultas SQL
});

// testando a conexão
async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
  } catch (error) {
    console.error('Não foi possível conectar ao banco de dados:', error);
  }
}

testConnection();

module.exports = sequelize;
