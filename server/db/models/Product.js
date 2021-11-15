const Sequelize = require('sequelize');
const db = require('../db');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  image_url: {
    type: Sequelize.STRING,
    defaultValue:
      'https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1287&q=80',
  },
  featured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  color: Sequelize.STRING,
  size: Sequelize.STRING,
  inventory_quantity: Sequelize.INTEGER,
});

module.exports = Product;
