import React from "react";
import classes from "./GitHub.module.css";
import SectionIntro from "../UIKit/SectionIntro/SectionIntro";

const GitHub = () => {
  let sectionHeaderText = `Github & Links`;
  let sectionBodyText = `
    Below you'll find various links. I spent most of my time coding on the ResolveTOK account,
    but all of the contributions are to private repos. I recently made the RasaanH account to have some code publicly visible.
    You'll find the code for this portfolio website and any future public projects there. Please connect with me on LinkedIn if you want to talk! Feel free
    to check out the Resolvve apps and/or website
    `;

  return (
    <div className={classes.container}>
      <SectionIntro headerText={sectionHeaderText} bodyText={sectionBodyText} />
      <div className={classes.umbrella}>
        <div>
          RasaanH GitHub:{" "}
          <a
            href="https://github.com/RasaanH"
            className={classes.Link}
            target="_blank"
            rel="noopener"
          >
            Link
          </a>
        </div>
        <div>
          ResolvveTOK GitHub:{" "}
          <a
            href="https://github.com/ResolveTOK"
            className={classes.Link}
            target="_blank"
            rel="noopener"
          >
            Link
          </a>
        </div>
        <div>
          LinkedIn:{" "}
          <a
            href="https://www.linkedin.com/in/rasaan-hollis-27389590/"
            className={classes.Link}
            target="_blank"
            rel="noopener"
          >
            Link
          </a>
        </div>
        <div>
          Resolvve Web App:{" "}
          <a
            href="https://resolvve.com/post/jCAE6P89IamyVJzog075"
            className={classes.Link}
            target="_blank"
            rel="noopener"
          >
            Link
          </a>
        </div>
        <div>
          Resolvve Android App:{" "}
          <a
            href="https://play.google.com/store/apps/details?id=com.resolvetok.resolvve"
            className={classes.Link}
            target="_blank"
            rel="noopener"
          >
            Link
          </a>
        </div>
        <div>
          Resolvve iOS App:{" "}
          <a
            href="https://apps.apple.com/us/app/resolvve/id1548225324"
            className={classes.Link}
            target="_blank"
            rel="noopener"
          >
            Link
          </a>
        </div>
      </div>
    </div>
  );
};

export default GitHub;
