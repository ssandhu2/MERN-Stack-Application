const axios = require("axios");

const HttpError = require("../models/http-error.js");

const API_KEY = "AIzaSyBUZ7pMyjJ2BbUb5BtlJFpYc5oX9NZ-Pos";

//axios allows to send request from node server to another server or backend
//converts address to coordinates
//encodedURIcomponent gives back a string rid of spaces etc
async function getCoordForAddress(address) {
  const response = await axios.get(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      address
    )}&key= ${API_KEY}`
  );

  const data = response.data;
  if (!data || data.status === "ZERO_RESULTS") {
    const error = new HttpError("Could not find location for the address", 422);
    throw error;
  }

  const coordinates = data.results[0].geometry.location;

  return coordinates;
}

module.exports = getCoordForAddress;
