import React, { Component } from "react";
import classes from "./SectionIntro.module.css";

class ContentEntry extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * [Guide]
   * Pass in these required props
   *  1. headerText: Short string to display as the header of the section. - Reminder to keep it short
   *  2. bodyText: String containing the majority of what will be shown on screen.
   */

  render() {
    return (
      <div className={classes.container}>
        <div className={classes.headerText}>{this.props.headerText}</div>
        <p className={classes.bodyText}>{this.props.bodyText}</p>
      </div>
    );
  }
}

export default ContentEntry;
