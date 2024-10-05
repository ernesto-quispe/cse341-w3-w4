const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.get('/', usersController.getAll);

router.get('/:id', usersController.getSingle);

router.put('/:id', usersController.updateUser);

router.post('/', usersController.createUser);

router.delete('/:id', usersController.deleteUser);

module.exports = router;