const router = require('express').Router();
const User = require('../db/models/User');
const { requireToken, isAdmin } = require('./gatekeeper');

module.exports = router;

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      attributes: ['id', 'first_name'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//IN THE MORNING - LINK THIS TO USERS THUNK / STATE
router.put('/', async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const user = await User.findByToken(token);

    user.address_line_1 = req.body.address_line_1;
    user.address_line_2 = req.body.address_line_2;
    user.city = req.body.city;
    user.zip_code = req.body.zip_code;
    user.state = req.body.state;
    user.country = req.body.country;

    res.json(user);
  } catch (error) {
    next(error);
  }
});
