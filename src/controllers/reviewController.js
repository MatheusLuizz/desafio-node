const Review = require('../models/Review');
const User = require('../models/User');
const Book = require('../models/Book');

// create
exports.createReview = async (req, res) => {
  const { rating, opinion, bookId } = req.body;
  const userId = req.user.id;

  try {
    const review = await Review.create({ rating, opinion, userId, bookId });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao criar avaliação' });
  }
};

exports.getReviewsByBook = async (req, res) => {
  const { bookId } = req.params;

  try {
    const reviews = await Review.findAll({
      where: { bookId },
      include: [{ model: User, attributes: ['name', 'email'] }], // Incluir informações do usuário que fez a avaliação
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar avaliações do livro' });
  }
};

exports.getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: User, attributes: ['name', 'email'] }, { model: Book, attributes: ['title'] }],
    });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao listar avaliações' });
  }
};
