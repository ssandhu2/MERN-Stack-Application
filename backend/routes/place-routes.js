const express = require("express");
const { check } = require("express-validator"); //to check values

const placesControllers = require("../controllers/places-controller");
const router = express.Router();

//url parameter. Place-controller will hold logic related to this route
router.get("/:pid", placesControllers.getPlaceByID); //point to the controller

router.get("/user/:uid", placesControllers.getPlacesByUserID);

/*
router.post(
  "/",
  [
    check("title")
      .not()
      .isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address")
      .not()
      .isEmpty()
  ],
  placesControllers.createPlace
); //placesControllers.createPlace is a middleware,
// executed left to right. CHECK IF TITLE IS NOT EMPTY and runs before controller. check('title) only checks title,
//but doesn't tell what to do with it
*/

router.post(
  "/",
  [
    check("title")
      .not()
      .isEmpty(),
    check("description").isLength({ min: 5 }),
    check("address")
      .not()
      .isEmpty()
  ],
  placesControllers.createPlace
);

router.patch(
  "/:pid",
  [
    check("title")
      .not()
      .isEmpty(),
    check("description").isLength({ min: 5 })
  ],
  placesControllers.updatePlace
);

router.delete("/:pid", placesControllers.deletePlace);

module.exports = router; //export router to app.js
