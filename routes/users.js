const { Router } = require('express');
const { check } = require('express-validator');

const { validator } = require('../middlewares/validator');
const { isRoleValid } = require('../helpers/db-validators');

const { getUsers, postUser, putUser, deleteUser } = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Email not valid').isEmail(),
    check('password', 'Password is required and 6 characters min.').isLength({ min: 6 }),
    check('role').custom(isRoleValid),
    validator,
  ],
  postUser
);

router.put('/:id', putUser);

router.delete('/:id', deleteUser);

module.exports = router;
