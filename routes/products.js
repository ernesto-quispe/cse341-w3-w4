const express = require('express');
const router = express.Router();
const { validateProductId, validateCreateProduct, validateUpdateProduct } = require('../validator');
const productsController = require('../controllers/products');
const { validationResult } = require('express-validator');

// Error handling middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

router.get('/', productsController.getAll);
router.get('/:id', validateProductId, validate, productsController.getSingle);
router.put('/:id', validateProductId, validateUpdateProduct, validate, productsController.updateProduct);
router.post('/', validateCreateProduct, validate, productsController.createProduct);
router.delete('/:id', validateProductId, validate, productsController.deleteProduct);

module.exports = router;
