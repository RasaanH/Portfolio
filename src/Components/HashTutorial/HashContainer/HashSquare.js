import React, { useState, useEffect } from "react";
import classes from "./HashSquare.module.css";

const HashSquare = (props) => {
  let determineStyle = () => {
    switch (props.fill) {
      case "empty":
        return "transparent";
        break;
      case "filled":
        return "cyan";
        break;
      case "multiple":
        return "salmon";
        break;
      default:
        return "white"; //should never happen
        break;
    }
  };
  let styleVar = determineStyle();
  return (
    <div className={classes.numWrapper}>
      {props.ind}
      <div
        className={classes.container}
        style={{ backgroundColor: styleVar }}
      ></div>
    </div>
  );
};

export default HashSquare;
