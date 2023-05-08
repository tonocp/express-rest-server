const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const User = require('../models/user');

const getUsers = (req = request, res = response) => {
  const { query, name, apiKey, page = 1, limit } = req.query;

  res.json({
    msg: 'GET USER',
    query,
    name,
    apiKey,
    page,
    limit,
  });
};

const postUser = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  // Password encryption
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

  const user = await User.findByIdAndUpdate(id, rest);

  res.status(500).json({
    msg: 'PUT USER',
    user,
  });
};

const deleteUser = (req = request, res = response) => {
  const id = req.params.id;

  res.json({
    msg: 'DELETE USER',
    id,
  });
};

module.exports = {
  getUsers,
  postUser,
  putUser,
  deleteUser,
};
