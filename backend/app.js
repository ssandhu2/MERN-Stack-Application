const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const placesRoutes = require("./routes/place-routes"); //use this as middleware
const usersRoutes = require("./routes/users-routes");

const HttpError = require("./models/http-error");

const app = express();

//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); //middleware to parse body will parse incoming body
//and  extract any json data in there, convert it to js data like array,
// and call next automatically and add json data there

//routes that we created are added as middleware in app.js
app.use("/api/places", placesRoutes); // => /api/places/   placeRoutes adds to /api/places
app.use("/api/users", usersRoutes);

app.use((req, res, next) => {
  const error = new HttpError("Could not find this route", 404);
  throw error; //reach below function with error to send response
});

//middleware function applied on every incoming request
//error handling middleware only executed on request that have an error attached or throw error
app.use((error, req, res, next) => {
  if (res.headerSent) {
    //if response has been sent already we won't send any
    return next(error);
  }

  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error" });
});

mongoose
  .connect(
    "mongodb+srv://ssandhu:pass123@cluster0-2zwt3.mongodb.net/places?retryWrites=true&w=majority"
  )
  .then(() => {
    app.listen(5000);
  })
  .catch(err => {
    console.log(err);
  });
