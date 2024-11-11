const Book = require('../models/Book');

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

// select all
exports.getBooks = async (req, res) => {
  try {
    const { clubId } = req.params;
    const books = await Book.findAll({ where: { clubId } });
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao obter a lista de livros.' });
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
