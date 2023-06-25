import React, { Component } from "react";
import NumberNoteInScale from "./ExercisesContainer/NumberNoteInScale";
import classes from "./MusicExercises.module.css";
import SectionIntro from "../UIKit/SectionIntro/SectionIntro";

class MusicExercises extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sectionHeaderText = `Music Exercises`;
    let sectionBodyText = `
      This is a section for practicing music theory! I figured I could code up a cool practice routine, so here it goes!
      `;
    return (
      <div className={classes.container}>
        <SectionIntro
          headerText={sectionHeaderText}
          bodyText={sectionBodyText}
        />
        <NumberNoteInScale />
      </div>
    );
  }
}

export default MusicExercises;
