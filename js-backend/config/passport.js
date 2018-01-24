let passport = require("passport");
let Local = require("passport-local");

let User = require("../models/users");

module.exports = () => {
  passport.use(
    new Local.Strategy(
      {
        usernameField: "email",
        passwordField: "password"
      },
      (email, password, done) => {
        // Ensure that this will be executed asynchronously
        process.nextTick(() => {
          User.findOne({
            email: email
          })
            .select("+password")
            .exec((err, user) => {
              if (err) {
                return done(err);
              }
              if (!user) {
                return done(null, false, {
                  message: "Incorrect email or password."
                });
              }
              // We are checking if password is the same as the one stored and encrypted in db
              user.validPassword(password, (err, match) => {
                if (err || !match) {
                  return done(err || "Incorrect user email or password", false);
                }
                return done(null, user);
              });
            });
        });
      }
    )
  );

  return passport;
};
