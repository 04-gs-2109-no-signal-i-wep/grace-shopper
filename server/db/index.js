//this is the access point for all things database related!

const db = require("./db");

const { User, Product } = require("./models");

const Order_Details = db.define('Order_Details', {
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

Product.belongsToMany(Order, { through: 'Order_Details' });
Order.belongsToMany(Product, { through: 'Order_Details' });

module.exports = {
  db,
  models: {
    User,
    Product
  },
};
