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

//this method will find a cart - the open order associated with a userId passed into the method
Order.findCart = async function (userId) {
  try {
    const cart = Order.findOne({
      where: {
        userId: userId,
        is_completed: false,
      },
    });
    return cart;
  } catch (ex) {
    const error = Error('Error finding cart');
    throw error;
  }
};

module.exports = Order;
