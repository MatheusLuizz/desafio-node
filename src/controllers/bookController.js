const Book = require('../models/Book');
const redis = require('../config/redis');

// create
exports.addBook = async (req, res) => {
  try {
    const { title, author } = req.body;
    const { clubId } = req.params;
    const newBook = await Book.create({ title, author, clubId });
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar o livro.' });
  }
};

// select by id
const getBooksFromDatabase = async (clubId) => {
  try {
    const books = await Book.findAll({
      where: { clubId }, 
    });
    return books;
  } catch (err) {
    console.error('Erro ao buscar livros no banco de dados:', err);
    throw err;
  }
};

// select all
exports.getBooks = async (req, res) => {
  const { clubId } = req.params;

  console.log('Buscando livros para o clube ID:', clubId);

  try {
    const cacheKey = `club:${clubId}:books`;
    console.log('Buscando no cache Redis com a chave:', cacheKey);

    const cachedBooks = await redis.get(cacheKey);
    if (cachedBooks) {
      console.log('Livros encontrados no cache Redis');
      return res.json(JSON.parse(cachedBooks));
    }

    console.log('Livros não encontrados no cache, buscando no banco de dados...');
    const books = await getBooksFromDatabase(clubId);
    if (books) {
      console.log('Livros encontrados no banco de dados, armazenando no cache...');
      await redis.set(cacheKey, JSON.stringify(books), {
        EX: 3600, // Expiração de 1 hora
      });

      return res.json(books);
    }

    return res.status(404).json({ message: 'Livros não encontrados' });
  } catch (err) {
    console.error('Erro ao obter livros:', err);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
};


// update
exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author } = req.body;
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ error: 'Livro não encontrado.' });

    book.title = title;
    book.author = author;
    await book.save();
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o livro.' });
  }
};

// delete
exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByPk(id);
    if (!book) return res.status(404).json({ error: 'Livro não encontrado.' });

    await book.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o livro.' });
  }
};
