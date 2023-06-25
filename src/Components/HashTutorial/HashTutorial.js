import React, { Component } from "react";
import HashLogic from "./HashContainer/HashLogic";
import classes from "./HashTutorial.module.css";
import SectionIntro from "../UIKit/SectionIntro/SectionIntro";
import ContentEntry from "../UIKit/ContentEntry/ContentEntry";

class HashTutorial extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let sectionHeaderText = `Visual Hashmap`;
    let sectionBodyText = `
      Call me a nerd but I think hashmaps are pretty cool. I figured they would be even cooler if you could see them in action.
      `;
    const entryJSX = !this.props.content ? (
      <div>No Content Available, Try again later</div>
    ) : (
      this.props.content.map((item, index) => {
        return (
          <ContentEntry
            key={index}
            headerText={item.header}
            image={item.image_url}
            bodyText={item.body}
          />
        );
      })
    );
    return (
      <div className={classes.container}>
        <SectionIntro
          headerText={sectionHeaderText}
          bodyText={sectionBodyText}
        />
        <HashLogic />
        {entryJSX}
      </div>
    );
  }
}

export default HashTutorial;
