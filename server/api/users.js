const router = require('express').Router();
const User = require('../db/models/User');
const { requireToken, isAdmin } = require('./gatekeeper');

module.exports = router;

router.get('/', requireToken, isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({

      attributes: ['id', 'first_name', 'last_name', 'email_address', 'is_admin'],

    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

//IN THE MORNING - LINK THIS TO USERS THUNK / STATE
router.put('/updateShippingInfo/:userId', async (req, res, next) => {
  try {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

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

router.delete('/:id', async(req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    await user.destroy();
    res.send(user);
  } catch (e) {
    next(e);
  }
});
