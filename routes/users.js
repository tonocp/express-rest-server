const { Router } = require('express');
const { check } = require('express-validator');

const { validator, JWTValidation, isAdminRole, hasRole } = require('../middlewares');

const { isRoleValid, emailExists, userExists } = require('../helpers/db-validators');

const { getUsers, postUser, putUser, deleteUser } = require('../controllers/users');

const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    JWTValidation,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password is required and 6 characters min.').isLength({ min: 6 }),
    check('email', 'Email not valid').isEmail(),
    check('email').custom(emailExists),
    check('role').custom(isRoleValid),
    validator,
  ],
  postUser
);

router.put(
  '/:id',
  [
    JWTValidation,
    isAdminRole,
    // hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', '_id not valid').isMongoId(),
    check('id').custom(userExists),
    check('role').custom(isRoleValid),
    validator,
  ],
  putUser
);

router.delete(
  '/:id',
  [
    JWTValidation,
    isAdminRole,
    // hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', '_id not valid').isMongoId(),
    check('id').custom(userExists),
    validator,
  ],
  deleteUser
);

module.exports = router;
