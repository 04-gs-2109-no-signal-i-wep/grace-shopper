const Sequelize = require('sequelize');
const db = require('../db');
const Order = require('./Order');
const Product = require('./Product');

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

//take a products id and order id, passed in from route, and return the row in order detail that contains both - if such an order exists
Order_Detail.findMatchingOrder = async function (productId, orderId) {
  try {
    const matchingOrder = this.findOne({
      where: {
        productId: productId,
        orderId: orderId,
      },
    });
    return matchingOrder;
  } catch (ex) {
    const error = Error('Error finding matching order');
    throw error;
  }
};

// //find the contents of a cart , aka an order that matches the orderId passed in ... and include details on the related products
// Order_Detail.findCartContents = async function (orderId) {
//   try {
//     const cartContents = this.findAll({
//       where: {
//         orderId: orderId,
//       },
//       include: [
//         {
//           model: Product,
//         },
//       ],
//     });
//     return cartContents;
//   } catch (ex) {
//     const error = Error('Error finding cart contents');
//     throw error;
//   }
// };

//take in a product's price and the quantity a user has added to their previous quantity choice
Order_Detail.prototype.adjustItemOrder = function (price, quantity) {
  this.quantity = quantity;
  this.total_price = price * quantity;
  return this;
};

module.exports = Order_Detail;
