const LocalStrategy = require('passport-local').Strategy;
const User = require('./api/models').User;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    User.findByPk(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        if (err) {
          console.log(err);
        }
      });
  });
  passport.use(
    'local-users',
    new LocalStrategy({ usernameField: 'email' }, (email, password, done) => {
      User.findOne({
        where: {
          email: email
        }
      })
        .then((user, err) => {
          if (err) return done(err);
          if (!user) return done(null, false, { message: 'No such user' });
          user.comparePassword(password, (err, isMatch) => {
            if (err) return done(err);
            if (!isMatch)
              return done(null, false, { message: 'Incorrect password' });
            done(null, user);
          });
        })
        .catch(err => {
          console.log(err);
        });
    })
  );
};
