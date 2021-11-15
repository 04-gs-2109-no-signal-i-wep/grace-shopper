const express = require('express');
const router = express.Router();
const Order = require('../db/models/Order');
const User = require('../db/models/User');
const Order_Detail = require('../db/models/Order_Detail');

module.exports = router;

router.get('/cart', async (req, res, next) => {
  try {
    let currentUser = await User.findByToken(req.body.jwt); // check if this is how we grab the JWT

    //check if this user has an open cart
    let cart = Order.findOne({
      where: {
        userId: currentUser.id,
        is_completed: false,
      },
    });

    if (!cart) {
      res.send("You haven't started shopping yet! Add a product to view cart.");
    } else {
      res.send(cart);
    }
  } catch (error) {
    next(error);
  }
});

router.get('/addToCart', async (req, res, next) => {
  try {
    let product = req.body.product; // is this just equal to the product's ID ? or is this giving us the whole product?
    let quantity = req.body.quantity; // this is the quantity that our user wants

    let currentUser = await User.findByToken(req.body.jwt); // check if this is how we grab the JWT

    //check if this user has an open cart
    let cart = Order.findOne({
      where: {
        userId: currentUser.id,
        is_completed: false,
      },
    });

    //check if Order_Detail includes a row where userId and cartID match current order
    let matchingOrder = Order_Detail.findOne({
      where: {
        productId: product.id,
        orderId: cart.id,
      },
    });

    //if we find a matchingOrder, grab its current quantity so we can calculate the new quantity and total price
    if (matchingOrder) {
      let newQuantity = matchingOrder.quantity + quantity;
      let newTotalPrice = newQuantity * product.price;

      //then, change the values in the matching order row
      matchingOrder.quantity = newQuantity;
      matchingOrder.total_price = newTotalPrice;

      //save the row with its updates
      await matchingOrder.save();

      //then send back the updated order line , could say in the thunk something like ... ${qty} ${product}(s) added to cart?
      res.send(matchingOrder);
    } else {
      let total_price = quantity * product.price; // the total price for a NEW row - simpler equation than if a row already exists because we only have to consider the quantity the user just selected

      //but first: if the cart wasn't found in the previous routes, then create a new Order (aka a new cart) with the info on the current user
      if (!cart) {
        cart = await Order.create(currentUser.id);
      }

      //whether or not a cart was open when we started this bloc, it should be open now. make an association that links the cart to the product the user wants, and use magic method to update the quantity and total_price columns at the moment we make the association
      await cart.add(product, {
        through: {
          quantity,
          total_price,
        },
      });

      //find the order we just created - is there a simpler way to do this ??
      let newOrder = Order_Detail.findOne({
        where: {
          productId: product.id,
          orderId: cart.id,
        },
      });

      res.send(newOrder);
    }
  } catch (error) {
    console.log('an error occurred in the addToCart get route');
    next(error);
  }
});

//OLD CODE
// router.put('/addToCart', async (req, res, next) => {
//   try {
//     console.log('hitting the check matching order phase');
//     let cart = req.body.cart;
//     let currentUser = req.body.currentUser;
//     let product = req.body.product;
//     let quantity = req.body.quantity;

//     //check if Order_Detail includes a row where userId and cartID match current order
//     // let matchingOrder = Order_Detail.findOne({
//     //   where: {
//     //     productId: product.id,
//     //     orderId: cart.id,
//     //   },
//     // });

//     //if we find a matchingOrder, grab its current quantity so we can calculate the new quantity and total price
//     if (matchingOrder) {
//       let newQuantity = matchingOrder.quantity + quantity;
//       let newTotalPrice = newQuantity * product.price;

//       //then, change the values in the matching order row
//       matchingOrder.quantity = newQuantity;
//       matchingOrder.total_price = newTotalPrice;

//       //save the row with its updates
//       await matchingOrder.save();

//       //then send back the updated order line , could say in the thunk something like ... ${qty} ${product}(s) added to cart?
//       res.send(matchingOrder);
//     } else {
//       //we have to check cases where there was no cart/open order or if there was a cart, but this product wasn't in it yet -->
//       next(cart, currentUser, product, quantity);
//     }
//   } catch (error) {
//     console.log('An error hit the matching order phase');
//     next(error);
//   }
// });

// router.post('/addToCart', async (req, res, next) => {
//   try {
//     console.log('hitting the if cart does not exist phase');
//     let cart = req.body.cart;
//     let currentUser = req.body.currentUser;
//     let product = req.body.product;
//     let quantity = req.body.quantity;

//     let total_price = req.body.quantity * req.body.product.price; // the total price for a NEW row - simpler equation than if a row already exists because we only have to consider the quantity the user just selected

//     //but first: if the cart wasn't found in the previous routes, then create a new Order (aka a new cart) with the info on the current user
//     if (!cart) {
//       cart = await Order.create(currentUser.id);
//     }

//     //whether or not a cart was open when we started this bloc, it should be open now. make an association that links the cart to the product the user wants, and use magic method to update the quantity and total_price columns at the moment we make the association
//     await cart.add(product, {
//       through: {
//         quantity,
//         total_price,
//       },
//     });

//     //find that new addition
//     let newOrder = await Order_Detail.findOne({
//       where: {
//         orderId: cart.id,
//         productId: product.id,
//       },
//     });

//     //then send back the updated info on the product in cart eg: 2 carrots added to cart
//     res.send(newOrder);
//   } catch (error) {
//     console.log('An error hit the no cart yet phase');
//     next(error);
//   }
// });
