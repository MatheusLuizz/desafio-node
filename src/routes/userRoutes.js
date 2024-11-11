const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// create
router.post('/users', userController.createUser);

// select all
router.get('/users', userController.getUsers);

// select by id
router.get('/users/:id', userController.getUserById);

// update
router.put('/users/:id', userController.updateUser);

// delete
router.delete('/users/:id', userController.deleteUser);

module.exports = router;
