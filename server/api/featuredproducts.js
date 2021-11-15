const express = require('express');
const router = express.Router();
const Product = require('../db/models/Product');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const featuredProducts = await Product.findAll({
      where: {
        featured: true,
      },
    });
    res.send(featuredProducts);
  } catch (error) {
    next(error);
  }
});
