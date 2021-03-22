import React, {useState, useEffect} from "react";
import classes from './Resolvve.module.css';
import SectionIntro from '../UIKit/SectionIntro/SectionIntro';

const Resolvve = props => {
    let sectionHeaderText = `Resolvve`
    let sectionBodyText = `
    Here, you'll learn more about my startup Resolvve. I started it after my master's program
    with my Co-Founder Carlos. At Resolvve I learned how to code, how to manage a product, and how to lead a team.
    `
    return (
        <div className={classes.container}>
            <SectionIntro 
                headerText={sectionHeaderText}
                bodyText={sectionBodyText}
            />
        </div>
    )
}

export default Resolvve;