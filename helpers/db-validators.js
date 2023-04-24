const Role = require('../models/role');

const isRoleValid = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) throw new Error(`Role ${role} isn't valid`);
};

module.exports = {
  isRoleValid,
};
