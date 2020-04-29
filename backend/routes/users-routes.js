const express = require("express");
const { check } = require("express-validator");

const userControllers = require("../controllers/users-controllers");
const router = express.Router();

//url parameter. Place-controller will hold logic related to this route
router.get("/", userControllers.getUsers); //point to the controller

router.post(
  "/signup",
  [
    check("name")
      .not()
      .isEmpty(),
    check("email")
      .normalizeEmail() // will convert test@test.com to test@test.com
      .isEmail(), //then make sure that it's email

    check("password").isLength({ min: 6 })
  ],
  userControllers.signup
);

router.post("/login", userControllers.login);

module.exports = router; //export router to app.js
