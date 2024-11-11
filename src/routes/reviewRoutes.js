const express = require('express');
const reviewController = require('../controllers/reviewController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

// create
router.post('/', authenticateToken, reviewController.createReview);

// select by id (do livro)
router.get('/book/:bookId', authenticateToken, reviewController.getReviewsByBook);

// select all
router.get('/', authenticateToken, reviewController.getAllReviews);

module.exports = router;
