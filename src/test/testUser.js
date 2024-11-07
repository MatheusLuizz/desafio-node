const User = require('../models/User');

async function testCreateUser() {
  try {
    const user = await User.create({
      name: 'Matheus Luiz',
      email: 'matheus.luiz@gmail.com',
      password: 'senha123',
    });
    console.log('Usuário criado:', user);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
  }
}

testCreateUser();