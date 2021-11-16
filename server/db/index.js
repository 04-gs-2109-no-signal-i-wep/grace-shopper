const db = require('./db');
const User = require('./models/User');
const Product = require('./models/Product');
const Order = require('./models/Order');
const Order_Detail = require('./models/Order_Detail');

User.hasMany(Order);
Order.belongsTo(User);
Product.belongsToMany(Order, { through: Order_Detail });
Order.belongsToMany(Product, { through: Order_Detail });
Order.hasMany(Order_Detail);

module.exports = {
  db,
  models: {
    User,
    Product,
    Order,
    Order_Detail,
  },
};
