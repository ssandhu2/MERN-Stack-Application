const uuid = require("uuid/v4"); //generating unique id's
const { validationResult } = require("express-validator");

const HttpError = require("../models/http-error");
const getCoordsForAddress = require("../util/location");
const Place = require("../models/place"); //model

let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous",
    location: {
      lat: 40.7484474,
      lng: -73.9871516
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1"
  }
];

const getPlaceByID = async (req, res, next) => {
  const placeId = req.params.pid; //{pid: 'p1'}
  let place;
  try {
    place = await Place.findById(placeId);
  } catch (err) {
    const error = new HttpError("Can't find place something went wrong", 500);
    return next(error);
  }

  //if input not found
  if (!place) {
    throw new HttpError("Can't find place for provided id", 404);
  }

  res.json({ place }); // can put this in else block but if we use return above this won't execute
};

const getPlacesByUserID = (req, res, next) => {
  const userId = req.params.uid;

  const places = DUMMY_PLACES.filter(p => {
    //find specific element in array
    return p.creator == userId;
  });

  //if input not found
  if (!places || places.length === 0) {
    //in app.js triggers error middleware

    return next(new HttpError("Can't find places for provided user id", 404));
  }
  res.json({ places });
};
const createPlace = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return next(
      new HttpError("Invalid inputs passed, please check your data.", 422)
    );
  }

  const { title, description, address, creator } = req.body;

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  // const title = req.body.title;
  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Empire_State_Building_%28aerial_view%29.jpg/400px-Empire_State_Building_%28aerial_view%29.jpg",
    creator
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError(
      "Creating place failed, please try again.",
      500
    );
    return next(error);
  }

  res.status(201).json({ place: createdPlace });
};

/*
const createPlace = async (req, res, next) => {
  const errors = validationResult(req); //if any error were caused based on the checks

  if (!errors.isEmpty()) {
    // print the errors and thrown in postman
    console.log(errors);
    return next(new HttpError("Invalid inputs ", 422)); //throw doesn't work good with errors
  }
  console.log("BODY " + req.body.title);
  const { title, description, address, creator } = req.body;
  //^ short for const title = req.body.title

  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }

  /*
  //creating place since we're using same names instead of
  //title: title we can just use names but for location we use
  //coordinates since it has long and lat
  const createdPlace = {
    id: uuid(), //unique id
    title,
    description,
    location: coordinates,
    address,
    creator
  };

  const createdPlace = new Place({
    title,
    description,
    address,
    location: coordinates,
    image:
      "https://imagesvc.meredithcorp.io/v3/mm/image?url=https%3A%2F%2Fcdn-image.travelandleisure.com%2Fsites%2Fdefault%2Ffiles%2Fstyles%2F1600x1000%2Fpublic%2F1559661596%2Fempire-state-building-EMPIREX0619.jpg%3Fitok%3D3hinpOrJ&w=400&c=sc&poi=face&q=85",
    creator
  });

  try {
    await createdPlace.save();
  } catch (err) {
    const error = new HttpError("Creating place failed try again", 500);

    return next(error); //to stop code execution, otherwise code execution would continue.
  }

  res.status(201).json({ place: createdPlace });
};*/

const updatePlace = (req, res, next) => {
  const errors = validationResult(req); //if any error were caused based on the checks

  if (!errors.isEmpty()) {
    // print the errors and thrown in postman
    console.log(errors);
    throw new HttpError("Invalid inputs ", 422);
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatePlace = { ...DUMMY_PLACES.find(p => p.id == placeId) }; //we put {... } because it creates a new object
  //and copies all key pair values to this object

  const placeIndex = DUMMY_PLACES.findIndex(p => p.id == placeId);

  updatePlace.title = title; //setting title in the array to our new title
  updatePlace.description = description;

  DUMMY_PLACES[placeIndex] = updatePlace;

  res.status(200).json({ place: updatePlace });
};

const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find(p => p.id === placeId)) {
    throw new HttpError("Could not find a place for that id", 404);
  }

  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId); //filter returns a new array after evaluating
  //function we pass in filter. IF ID'S match drop that in the array

  res.status(200).json({ message: "Deleted Place" });
};

exports.getPlaceByID = getPlaceByID; //export as getPlaceById, right side is the function
exports.getPlacesByUserID = getPlacesByUserID;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;
