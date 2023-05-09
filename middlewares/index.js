const JWTValidator = require('../middlewares/jwt-validator');
const rolesValidator = require('../middlewares/roles-validator');
const validator = require('../middlewares/validator');

module.exports = {
  ...JWTValidator,
  ...rolesValidator,
  ...validator,
};
