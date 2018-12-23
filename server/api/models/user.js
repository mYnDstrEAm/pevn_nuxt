'use strict';
const bcryptjs = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: {
      type: DataTypes.ENUM,
      values: ['Client', 'Manager', 'Admin'],
      defaultValue: 'Client'
    },
    lastLogin: DataTypes.DATE
  });

  User.prototype.comparePassword = function(candidatePassword, next) {
    bcryptjs.compare(candidatePassword, this.password, (err, isMatch) => {
      if (err) return next(err);
      next(null, isMatch);
    });
  };

  User.beforeSave(user => {
    return bcryptjs.genSalt(10).then(salt => {
      bcryptjs.hash(user.password, salt).then(hash => {
        user.password = hash;
        user.set('password', hash);
      });
    });
  });

  User.associate = models => {
    // associations can be defined here
  };
  return User;
};
