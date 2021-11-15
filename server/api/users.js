const router = require('express').Router();
const {
  models: { User },
} = require('../db');

module.exports = router;

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'first_name', 'last_name', 'email_address', 'is_admin'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
