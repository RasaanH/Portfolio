import React, { Component } from 'react';
import NumberNoteInScale from './ExercisesContainer/NumberNoteInScale'
import classes from './MusicExercises.module.css';
import SectionIntro from '../UIKit/SectionIntro/SectionIntro';
import ContentEntry from '../UIKit/ContentEntry/ContentEntry'

class MusicExercises extends Component {
    constructor(props) {
      super(props);
    }

    render() {
      let sectionHeaderText = `Music Exercises`
      let sectionBodyText = `
      This is a section for practicing music theory! I figured I could code up a cool practice routine, so here it goes!
      `
    //   const entryJSX = !this.props.content ? <div>No Content Available, Try again later</div> : this.props.content.map((item, index) => {
    //     return (
    //         <ContentEntry 
    //             key={index}
    //             headerText={item.header}
    //             image={item.image_url}
    //             bodyText={item.body}
    //         />
    //     )
    // })
      return (
        <div className={classes.container}>
            <SectionIntro 
                headerText={sectionHeaderText}
                bodyText={sectionBodyText}
            />
            <NumberNoteInScale />
            {/* {entryJSX} */}
        </div>
      );
    }
  }
  
  export default MusicExercises;
