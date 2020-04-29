import React, { useRef, useEffect } from "react";

import "./Map.css";

//useRef can be used to get reference to DOM node
//useEffect allows us to register logic a function that should be executed when certain inputs change ex when
//dependencies change
const Map = props => {
  const mapRef = useRef(); // we initialized ref but haven't made a connection to div tag yet so we have to use hook useEffect
  const { center, zoom } = props; //object destructuring
  useEffect(() => {
    // will run when component first is rendered then zoom and center change. Run after JSX code runs
    const map = new window.google.maps.Map(mapRef.current, {
      center: center,
      zoom: zoom
    }); //needs a pointer to where map should be rendered telling where to render map

    //to render a marker on the center map is the map object above
    new window.google.maps.Marker({ position: center, map: map });
  }, [center, zoom]); //center and zoom are dependencies when they change we re render the map

  return (
    <div
      ref={mapRef}
      className={`map ${props.className}`}
      style={props.style}
    ></div>
  );
};

export default Map;
