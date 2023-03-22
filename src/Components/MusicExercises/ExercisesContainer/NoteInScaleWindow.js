import React, {useState} from "react";
import classes from './NoteInScaleWindow.module.css';

export const NoteInScaleWindow = ({notes}) => {
    const [{ scale, form }, setCurrentScale] = useState({scale: 'C', form: 'Maj'});
    const [currentNote, setCurrentNote] = useState(1);
    
    return (
        <div className={classes.wrapper}>
            <div style={{marginRight: '10px'}}>
                <span style={{fontSize: '120px'}}>{scale}</span>
                <span style={{fontSize: '45px'}}>{form}</span>
            </div>
            <div style={{fontSize: '120px'}}>
                {currentNote}
            </div>
        </div>
    )
}
