const express = require('express');
const router = express.Router();
const Order = require('../db/models/Order');
const User = require('../db/models/User');
const Order_Detail = require('../db/models/Order_Detail');
const { token } = require('morgan');

module.exports = router;

router.get('/cart/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    // let currentUser = await User.findByPk(userId);
    //find the user who is logged in
    //find their open Order using a method
    let cart = await Order.findCart(userId);
    console.log('THIS IS THE MATCHING ORDER', cart);
    //find the contents of that cart
    let cartContents = await Order.findCartContents(cart.dataValues.id);

    res.send(cartContents);
  } catch (error) {
    next(error);
  }
});

router.get('/addToCart', async (req, res, next) => {
  try {
    let product = req.body.product; // is this just equal to the product's ID ? or is this giving us the whole product?
    let quantity = req.body.quantity; // this is the quantity that our user wants

    const token = req.headers.authorization;
    let currentUser = await User.findByToken(token); // use the JWT to find the current User

    //get the user's cart
    let cart = await Order.findCart(currentUser.id);

    //check if Order_Detail includes a row where userId and cartID match current order
    let matchingOrder = Order_Detail.matchingOrder(product.id, cart.id);

    //if we find a matchingOrder, update that row's price and quantity .. but assuming that this is only hit when they hit the 'add to cart' button, quantity should only rise by one
    if (matchingOrder) {
      matchingOrder.adjustItemOrder(product.price, matchingOrder.quantity + 1);
      await matchingOrder.save();
      res.send(matchingOrder);
    } else {
      let total_price = quantity * product.price; // the total price for a NEW row

      //make an association that links the cart to the product the user wants, and use magic method to update the quantity and total_price columns at the moment we make the association
      await cart.add(product, {
        through: {
          quantity,
          total_price,
        },
      });

      //find the order we just created using the findMatching method
      let newOrder = Order_Detail.findMatchingOrder(product.id, cart.id);
      res.send(newOrder);
    }
  } catch (error) {
    next(error);
  }
});

router.put('/cart/updateItemQuantity', async (req, res, next) => {
  try {
    let product = req.body.product;
    let quantity = req.body.quantity;
    const token = req.headers.authorization;
    let currentUser = await User.findByToken(token);
    let cart = await Order.findCart(currentUser.id);

    //find the row that needs to be updated
    let matchingOrder = Order_Detail.matchingOrder(product.id, cart.id);
    //update the order detail row's price and quantity to reflect new price and quantity
    matchingOrder.adjustItemOrder(product.price, quantity);
    await matchingOrder.save();
    res.send(matchingOrder);
  } catch (error) {
    next(error);
  }
});

router.put('/cart/checkout', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    let user = await User.findByToken(token);
    let cart = await Order.findCart(user.id);
    cart.is_completed = true;
    await cart.save();
    //create a new cart in case they want to start shopping again right away ... we will set this as state
    let newCart = await Order.create({ userId: user.id });
    res.send(newCart);
  } catch (error) {
    next(error);
  }
});

router.delete('/cart/deleteItem', async (req, res, next) => {
  try {
    let product = req.body.product;
    const token = req.headers.authorization;
    let user = await User.findByToken(token);
    let cart = await Order.findCart(user.id);
    const deleted = await Order_Detail.matchingOrder(product.id, cart.id);
    //destroy the cart that matches the specified row
    await deleted.destroy();
    res.send(deleted);
  } catch (error) {
    next(error);
  }
});
