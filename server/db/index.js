const db = require("./db");
const User = require("./models/User");
const Product = require("./models/Product");
const Order = require("./models/Order");

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
