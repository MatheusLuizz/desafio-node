const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// create
router.post('/', userController.createUser);

// select all
router.get('/', userController.getUsers);

// select by id
router.get('/:id', userController.getUserById);

// update
router.put('/:id', userController.updateUser);

// delete
router.delete('/:id', userController.deleteUser);

module.exports = router;
