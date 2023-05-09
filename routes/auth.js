const { Router } = require('express');
const { check } = require('express-validator');

const { validator } = require('../middlewares/validator');

const { login } = require('../controllers/auth');

const router = Router();

router.post(
  '/login',
  [check('email', 'Email is required').isEmail(), check('password', 'Password is required').not().isEmpty(), validator],
  login
);

module.exports = router;
