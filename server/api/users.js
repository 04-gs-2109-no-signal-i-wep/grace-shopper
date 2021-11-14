const router = require('express').Router();
const {
  models: { User },
} = require('../db');
const { requireToken } = require('./gatekeeper')

module.exports = router;

router.get('/', requireToken, async (req, res, next) => {
  try {
    console.log('what is user', req.user)
    if (!req.user.is_admin) {
      return res.status(403).send('You shall not pass!')
    }
    const users = await User.findAll({
      attributes: ['id', 'first_name'],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});
