const { Sequelize } = require("sequelize/types");
const db = require("./db");
const { User, Product, Order } = require("./models");

User.hasMany(Order);
Order.belongsTo(User);
Product.belongsToMany(Order, { through: 'order_details' });
Order.belongsToMany(Product, { through: 'order_details' });

module.exports = {
  db,
  models: {
    User,
    Product,
    Order
  },
};
