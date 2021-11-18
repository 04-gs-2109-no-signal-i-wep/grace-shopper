const router = require('express').Router();
const Order = require('../db/models/Order');
const User = require('../db/models/User');
module.exports = router;

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) });
  } catch (err) {
    next(err);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { email_address, first_name, last_name, password } = req.body;
    const user = await User.create({
      email_address,
      first_name,
      last_name,
      password,
    });
    res.send({ token: await user.generateToken() });
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists');
    } else {
      next(err);
    }
  }
});

router.get('/me', async (req, res, next) => {
  try {
    let user = await User.findByToken(req.headers.authorization);
    let cart = await Order.findCart(user.id);
    //if not, make a cart (aka an incomplete order)
    if (!cart) {
      cart = await Order.create({ userId: user.id });
    }
    res.send(user);
  } catch (ex) {
    next(ex);
  }
});
