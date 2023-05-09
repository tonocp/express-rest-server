const { request, response } = require('express');

const isAdminRole = (req = request, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'RoleValidation without token',
    });
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `User ${name} isn't ADMIN`,
    });
  }
  next();
};

const hasRole = (...roles) => {
  return (req = request, res = response, next) => {
    if (!req.user) {
      return res.status(500).json({
        msg: 'RoleValidation without token',
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `Service requires one of these roles ${roles}`,
      });
    }

    next();
  };
};

module.exports = {
  hasRole,
  isAdminRole,
};
