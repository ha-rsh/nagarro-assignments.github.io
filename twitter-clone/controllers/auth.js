const passport = require("passport");
const bcrypt = require("bcrypt");
const db = require("../config/dbConfig");
module.exports.authenticateGoogle = passport.authenticate("google", {
  scope: ["profile", "email"],
});

module.exports.authenticateGoogleCallback = passport.authenticate("google", {
  successRedirect: "/home",
  failureRedirect: "/",
});

module.exports.logOut = (req, res) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
    }
    res.redirect("/");
  });
};

module.exports.signUp = (req, res) => {
  const { name, email, password, confirmPassword } = req.body;
  if (password !== confirmPassword) {
    res.redirect("/");
  }
  db.searchByValue({
    table: "user",
    searchAttribute: "email",
    searchValue: email,
    attributes: ["*"],
  })
    .then((result) => {
      const users = result.data;
      if (users.length > 0) {
        res.redirect("/");
      } else {
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) {
            console.log(err);
          } else {
            db.insert({
              table: "user",
              records: [
                {
                  name: name,
                  email: email,
                  password: hash,
                  avatar: "/images/default-avatar.png",
                  username: email.split("@")[0],
                },
              ],
            })
              .then((result) => {
                console.log(result);
                passport.authenticate("local")(req, res, () => {
                  res.redirect("/home");
                });
              })
              .catch((err) => {
                console.log(err);
                res.redirect("/");
              });
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.redirect("/");
    });
};

module.exports.login = (req, res) =>
  passport.authenticate("local", { failureRedirect: "/" })(req, res, () => {
    res.redirect("/home");
  });
