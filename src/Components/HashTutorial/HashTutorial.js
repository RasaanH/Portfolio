import React, { Component } from 'react';
import HashLogic from './HashContainer/HashLogic'
import classes from './HashTutorial.module.css';
import SectionIntro from '../UIKit/SectionIntro/SectionIntro';

class HashTutorial extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      let sectionHeaderText = `Visual Hashmap`
      let sectionBodyText = `
      Call me a nerd but I think hashmaps are pretty cool. I figured they would be even cooler if you could see them in action.
      `
      return (
        <div className={classes.container}>
            <SectionIntro 
                headerText={sectionHeaderText}
                bodyText={sectionBodyText}
            />
            <HashLogic />
        </div>
      );
    }
  }
  
  export default HashTutorial;
