import React from "react";
import classes from "./HashSquare.module.css";

const HashSquare = (props) => {
  let determineStyle = () => {
    switch (props.fill) {
      case "empty":
        return "transparent";
      case "filled":
        return "cyan";
      case "multiple":
        return "salmon";
      default:
        return "white"; //should never happen
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
