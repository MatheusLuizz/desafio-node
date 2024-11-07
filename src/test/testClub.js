const Club = require('../models/Club');
const User = require('../models/User');

async function testCreateClub() {
  try {
    const user = await User.create({
      name: 'Maria Oliveira',
      email: 'maria.oliveira@example.com',
      password: 'senha123',
    });

    // criando um clube de leitura associado ao usuário criado
    const club = await Club.create({
      name: 'Clube de Leitura de Ficção',
      description: 'Um clube para discutir livros de ficção científica.',
      created_by: user.id,
    });

    console.log('Clube criado:', club);
  } catch (error) {
    console.error('Erro ao criar clube:', error);
  }
}

testCreateClub();
