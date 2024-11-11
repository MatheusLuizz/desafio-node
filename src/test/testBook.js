const Club = require('../models/Club');
const Book = require('../models/Book');
const User = require('../models/User');

async function testCreateBook() {
  try {

    const user = await User.create({
      name: 'Nalyne Santana',
      email: 'nalyne.santana@example.com',
      password: 'senha321',
    });

    const club = await Club.create({
      name: 'Clube de Leitura de Romance',
      description: 'Um clube para discutir livros de romance.',
      created_by: user.id,
    });

    const book = await Book.create({
      title: 'Heartstopper',
      author: 'Alice Oseman',
      clubId: club.id,
    });

    console.log('Livro criado:', book);
  } catch (error) {
    console.error('Erro ao criar livro:', error);
  }
}

testCreateBook();
