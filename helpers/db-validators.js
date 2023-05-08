const Role = require('../models/role');
const User = require('../models/user');

const isRoleValid = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) throw new Error(`Role "${role}" isn't valid`);
};

const emailExists = async (email = '') => {
  const emailExists = await User.findOne({ email });
  if (emailExists) throw new Error(`Email "${email}" already exists`);
};

const userExists = async (id = '') => {
  const userExists = await User.findOne({ id });
  if (!userExists) throw new Error(`_id "${id}" don't exists`);
};

module.exports = {
  isRoleValid,
  emailExists,
  userExists,
};
