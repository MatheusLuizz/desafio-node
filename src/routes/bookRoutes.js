// src/routes/bookRoutes.js
const express = require('express');
const bookController = require('../controllers/bookController');
const router = express.Router();

// Rota para adicionar um livro a um clube específico
router.post('/clubs/:clubId/books', bookController.addBook);

// Rota para obter todos os livros de um clube específico
router.get('/clubs/:clubId/books', bookController.getBooks);

// Rota para atualizar um livro
router.put('/books/:id', bookController.updateBook);

// Rota para excluir um livro
router.delete('/books/:id', bookController.deleteBook);

module.exports = router;
