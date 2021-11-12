const Sequelize = require('sequelize');
const db = require('../db');

const Order_Detail = db.define('order_detail', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
  total_price: {
    type: Sequelize.INTEGER,
    allowNull: true,
  },
});

module.exports = Order_Detail;
