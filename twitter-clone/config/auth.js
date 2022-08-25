require("dotenv").config()

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const db = require("./dbConfig");
module.exports = function (passport) {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      db.searchByValue({
        table: "user",
        searchAttribute: "email",
        searchValue: email,
        attributes: ["*"],
      })
        .then((result) => {
          const users = result.data;
          if (users.length === 0) {
            return done(null, false, { message: "No user found" });
          }
          else{
            const foundUser = users[0];
            bcrypt.compare(password, foundUser.password, (err, isMatch) => {
              if (err) throw err;
              if (isMatch) {
                return done(null, foundUser);
              } else {
                return done(null, false, { message: "Password incorrect" });
              }
            })
          }
        })
        .catch((err) => {
          console.log(err);
          return done(err);
        });
    })
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
      },
      function (accessToken, refreshToken, profile, cb) {
        console.log(profile)
        db.searchByValue({
          table: "user",
          searchAttribute: "email",
          searchValue: profile.emails[0].value,
          attributes: ["*"],
        })
          .then((result) => {
            const userData = result.data;
            console.log(userData)
            if (userData.length > 0) {
              return cb(null, { id: userData[0].id });
            } else {
              db.insert({
                table: "user",
                records: [
                  {
                    googleId: profile.id,
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    avatar: profile.photos[0].value,
                    username: profile.emails[0].value.split("@")[0],
                  },
                ],
              })
                .then((result) => {
                  return cb(null, { id: result.data.inserted_hashes[0]});
                })
                .catch((err) => {
                  console.log(err);
                  return cb(err, null);
                });
            }
          })
          .catch((err) => {
            console.log(err);
            return cb(err, null);
          });
      }
    )
  );

  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    db.searchByHash(
      {
        table: "user",
        hashValues: [id],
        attributes: ["*"],
      },
      function (err, user) {
        done(err, user);
      }
    );
  });
};
