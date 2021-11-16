const Sequelize = require('sequelize');
const db = require('../db');
const Product = require('../models/Product');
const Order_Detail = require('../models/Order_Detail');

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
Order.findOrCreateCart = async function (userId) {
  try {
    let cart = await this.findOne({
      where: {
        userId: userId,
        is_completed: false,
      },
    });

    if (!cart) {
      cart = await Order.create({ userId: userId });
    }

    return cart;
  } catch (ex) {
    const error = Error('Error finding cart');
    throw error;
  }
};

//find the contents of a cart , aka an order that matches the orderId passed in ... and include details on the related products
Order.findCartContents = async function (orderId) {
  try {
    const cartContents = this.findAll({
      where: {
        id: orderId,
      },
      include: [
        {
          model: Product,
        },
        {
          model: Order_Detail,
        },
      ],
    });
    return cartContents;
  } catch (ex) {
    const error = Error('Error finding cart contents');
    throw error;
  }
};

Order.prototype.findTotalPrice = function (itemPrices) {
  try {
    let sum = 0;
    itemPrices.forEach((item) => {
      sum += item.dataValues.total_price;
    });
    this.order_total = sum;
    return sum;
  } catch (ex) {
    const error = Error('Error finding total cost');
    throw error;
  }
};

module.exports = Order;
