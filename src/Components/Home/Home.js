import React, {useState, useEffect} from "react"
import classes from './Home.module.css';
import ContentEntry from '../UIKit/ContentEntry/ContentEntry';

const Home = props => {
    //console.log("props.content", props.content);
    const entryJSX = !props.content ? <div>No Content Available, Try again later</div> : props.content.map((item, index) => {
        return (
            <ContentEntry 
                key={index}
                headerText={item.header}
                image={item.image_url}
                bodyText={item.body}
            />
        )
    })
    return (
        <div className={classes.container}>
            {entryJSX}
        </div>
    )
}

export default Home;