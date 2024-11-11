const express = require('express');
const userController = require('../controllers/userController');
const authenticateToken = require('../middlewares/auth');

const router = express.Router();

// create
router.post('/', userController.createUser);

// select all
router.get('/', authenticateToken, userController.getUsers);

// select by id
router.get('/:id', authenticateToken, userController.getUserById);

// update
router.put('/:id', authenticateToken, userController.updateUser);

// delete
router.delete('/:id', authenticateToken, userController.deleteUser);

router.post('/login', userController.loginUser);

module.exports = router;
