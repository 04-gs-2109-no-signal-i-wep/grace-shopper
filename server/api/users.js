const router = require('express').Router();
const User = require('../db/models/User');
const { requireToken, isAdmin } = require('./gatekeeper')

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
