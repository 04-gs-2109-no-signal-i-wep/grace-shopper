const router = require('express').Router();
const Product = require('../db/models/Product');

module.exports = router;

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) {
    next(err);
  }
});
<<<<<<< HEAD
=======

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
})


module.exports = router;


>>>>>>> 5c6b39da5071439843eb2e0e9b1f0a47df0b2d26
