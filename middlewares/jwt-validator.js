const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const JWTValidation = async (req = request, resp = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return resp.status(401).json({
      msg: 'Token not found',
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(uid);

    if (!user || !user.status) {
      return resp.status(401).json({
        msg: 'Token not valid',
      });
    }

    req.user = user;

    next();
  } catch (error) {
    console.error(error);
    resp.status(401).json({
      msg: 'Token not valid',
    });
  }
};

module.exports = {
  JWTValidation,
};
