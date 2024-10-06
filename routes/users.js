const express = require('express');
const router = express.Router();
const { validateUserId, validateCreateUser, validateUpdateUser } = require('../validator');
const usersController = require('../controllers/users');
const { validationResult } = require('express-validator');

// Error handling middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', usersController.getAll);
router.get('/:id', validateUserId, validate, usersController.getSingle);
router.put('/:id', validateUserId, validateUpdateUser, validate, usersController.updateUser);
router.post('/', validateCreateUser, validate, usersController.createUser);
router.delete('/:id', validateUserId, validate, usersController.deleteUser);

module.exports = router;
