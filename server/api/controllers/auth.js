const User = require('../models').User;
const passport = require('passport');

module.exports = {
  register(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' });
    }

    User.findOrCreate({
      where: {
        email: email
      },
      defaults: {
        // Set the default properties if it doesn't exist
        email: email,
        password: password
      }
    })
      .then(result => {
        // boolean stating if it was created or not
        let created = result[1];
        if (!created) {
          // False if author already exists and was not created.
          return res.status(409).json({ message: 'Already exists' });
        }
        // Created user
        return res.status(200).json(result[0]);
      })
      .catch(error => {
        console.log(error);
        return res.status(500).json({ message: 'Error creating user' });
      });
  },

  login(req, res) {
    passport.authenticate('local-users', function(err, user, info) {
      if (err) {
        user.password = undefined;
        console.log('Passport err: ' + err);
        return res.status(500).json({ message: 'Passport error' });
      }
      if (!user) {
        user.password = undefined;
        return res.status(401).json({ message: 'No user found!' });
      }
      req.logIn(user, function(err) {
        if (err) {
          console.log('Login error: ' + err);
          return res.status(500).json({ message: 'Login error' });
        }
        user.password = undefined;
        return res.status(200).json(user);
      });
    })(req, res);
  },

  changePassword(req, res) {
    if (!req.user || !req.user.id) return res.sendStatus(401);
    User.findOne({
      where: {
        email: req.user.email
      }
    }).then((user, err) => {
      if (err) {
        console.log(err);
        return res.sendStatus(404);
      }
      user.comparePassword(req.body.currentPassword, (err, isMatch) => {
        if (err || !isMatch) return res.sendStatus(400);
        user
          .update({ password: req.body.newPassword })
          .then(updatedInstance => {
            return res.sendStatus(200);
          });
      });
    });
  },

  logout(req, res) {
    req.logout();
    res.json({ ok: true });
  }
};
