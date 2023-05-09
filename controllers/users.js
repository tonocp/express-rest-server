const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getUsers = async (req = request, res = response) => {
  const { limit = 5, from = 0 } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    User.countDocuments(query),
    User.find(query).skip(Number(from)).limit(Number(limit)),
  ]);

  res.json({
    total,
    users,
  });
};

const postUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  const salt = bcrypt.genSaltSync();
  user.password = bcrypt.hashSync(password, salt);

  await user.save();

  res.status(201).json({
    user,
  });
};

const putUser = async (req = request, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...rest } = req.body;

  if (password) {
    const salt = bcrypt.genSaltSync();
    rest.password = bcrypt.hashSync(password, salt);
  }

  const updatedUser = await User.findByIdAndUpdate(id, rest, { new: true });

  res.json(updatedUser);
};

const deleteUser = async (req = request, res = response) => {
  const { id } = req.params;

  const removedUser = await User.findByIdAndUpdate(id, { status: false }, { new: true });

  res.json(removedUser);
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
