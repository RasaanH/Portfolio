import React, { useState, useEffect } from "react";
import classes from "./Home.module.css";
import ContentEntry from "../UIKit/ContentEntry/ContentEntry";
import SectionIntro from "../UIKit/SectionIntro/SectionIntro";

const Home = (props) => {
  let sectionHeaderText = `Welcome!`;
  let sectionBodyText = `
    Hi, thanks for taking the time to check out my portfolio! I built it from scratch with React.JS and Google's Firestore. This section
    will help you get to know more about me. 
    `;
  const entryJSX = !props.content ? (
    <div>No Content Available, Try again later</div>
  ) : (
    props.content.map((item, index) => {
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
      <SectionIntro headerText={sectionHeaderText} bodyText={sectionBodyText} />
      {entryJSX}
    </div>
  );
};

export default Home;
