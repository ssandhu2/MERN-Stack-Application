import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the tallest buliding",
    imageUrl:
      " https://www.esbnyc.com/sites/default/files/styles/timely_content_image_large__885x590_/public/default_images/brs_0330.jpg?itok=m3gzF1YH",
    address: "20 W 34th St, NEW YORK, NY 10001",
    location: {
      lat: 40.75,
      lng: -73.98
    },
    creator: "u1"
  },

  {
    id: "p2",
    title: "Empire State Building",
    description: "One of the tallest buliding",
    imageUrl:
      " https://www.esbnyc.com/sites/default/files/styles/timely_content_image_large__885x590_/public/default_images/brs_0330.jpg?itok=m3gzF1YH",
    address: "20 W 34th St, NEW YORK, NY 10001",
    location: {
      lat: 40.75,
      lng: -73.98
    },
    creator: "u2"
  }
];
const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = DUMMY_PLACES.filter(place => place.creator === userId);
  return <PlaceList items={loadedPlaces} />;
};
export default UserPlaces;
