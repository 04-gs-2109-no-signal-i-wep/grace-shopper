const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  order_total: Sequelize.INTEGER,
  total_quantity: Sequelize.INTEGER,
  is_completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  date_placed: Sequelize.DATEONLY,
  date_shipped: Sequelize.DATEONLY,
});

module.exports = Order;
