const { Router } = require("express");
const router = new Router();
const bcryptjs = require("bcryptjs");
const saltRounds = 10;
const User = require("../models/User.model");

//Get route => to display the signup form
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

//Get route => to display the user profile

router.get("/userProfile", (req, res) => {
  res.render("users/user-profile");
  //User.findById
});

//Post route => to process the data
router.post("/signup", (req, res) => {
  const { username, email, password } = req.body;

  bcryptjs
    .genSalt(saltRounds)
    .then((salt) => bcryptjs.hash(password, salt))
    .then((hashedPassword) => {
      return User.create({
        username,
        email,
        passwordHash: hashedPassword,
      })
        .then((userFromDB) => {
          res.redirect("/userProfile");
        })
        .catch((error) => console.log("user was not created"));
    })
    .catch((err) => next(err));
});

module.exports = router;
