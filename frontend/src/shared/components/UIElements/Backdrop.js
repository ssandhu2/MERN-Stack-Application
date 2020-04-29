import React from "react";
import ReactDOM from "react-dom";

import "./Backdrop.css";

//backdrop is used when we use sidedrawer and we click on the side to close the sidedrawer.
//we pass the closeDrawer function in the mainNavigation file to close drawer when we click the backdrop
const Backdrop = props => {
  return ReactDOM.createPortal(
    <div className="backdrop" onClick={props.onClick}></div>,
    document.getElementById("backdrop-hook")
  );
};

export default Backdrop;
