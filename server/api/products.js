const router = require('express').Router();
const Product = require('../db/models/Product');
const { requireToken, isAdmin } = require('./gatekeeper')

// GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// GET /api/products/:id
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(product);
  } catch (error) {
    next(error);
  }
});


// PUT /api/products
router.put('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    res.send(await product.update(req.body))
  } catch (error) {
    next(error)
  }
});


// POST /api/products
router.post('/', async (req, res, next) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch(error) {
    next(error);
  }
});

// DELETE /api/products/:id
router.delete('/:id', requireToken, isAdmin, async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.id);
    await product.destroy();
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
