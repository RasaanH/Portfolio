import React, { useState, useEffect } from "react";
import classes from "./Resolvve.module.css";
import SectionIntro from "../UIKit/SectionIntro/SectionIntro";
import ContentEntry from "../UIKit/ContentEntry/ContentEntry";

const Resolvve = (props) => {
  let sectionHeaderText = `Resolvve`;
  let sectionBodyText = `
    Here, you'll learn more about my startup Resolvve. I started it after my master's program
    with my Co-Founder Carlos. At Resolvve I learned how to code, how to manage a product, and how to lead a team.
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

export default Resolvve;
