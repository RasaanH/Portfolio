import React, { Component } from 'react';
import classes from './ContentEntry.module.css';

class ContentEntry extends Component {
    constructor(props) {
      super(props);
    }

    /**
     * [Guide]
     * Pass in these required props
     *  1. headerText: Short string to display as the header of the panel
     *  2. image: String URL to image to render
     *  3. bodyText: String containing the majority of what will be shown on screen. This should be 3-5 sentences.
     */

    render() {
      
      return (
        <div className={classes.container}>
            <div className={classes.window}>
              <img className={classes.image} src={this.props.image} alt={`image for ${this.props.headerText}`} />
            </div>
            <div className={classes.headerText}>{this.props.headerText}</div>
            <p className={classes.bodyText}>{this.props.bodyText}</p>
        </div>
      );
    }
  }
  
  export default ContentEntry;