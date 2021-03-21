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
        <div>
            In the ContentEntry
        </div>
      );
    }
  }
  
  export default ContentEntry;