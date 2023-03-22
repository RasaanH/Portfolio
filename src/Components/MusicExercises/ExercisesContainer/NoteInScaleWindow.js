import React, {useState, useEffect, useRef} from "react";
import classes from './NoteInScaleWindow.module.css';
import { pickAtRandomFromArray } from "../../../Utils/pickAtRandomFromArray";

export const NoteInScaleWindow = ({notes, milliseconds, running}) => {
    const [{ scale, form }, setCurrentScale] = useState({scale: 'C', form: 'Maj'});
    const [currentNote, setCurrentNote] = useState(1);
    const intervalIdRef = useRef();
    const availableNumbers = [1,2,3,4,5,6,7];

    useEffect(() => {
        clearInterval(intervalIdRef.current);
        if (running === true) {
            const intervalId = startExercise();
            console.log({intervalId});
            intervalIdRef.current = intervalId;
            return;
        };
    }, [running, milliseconds]);

    const startExercise = () => 
        setInterval(() => {
            updateCurrentScale();
        },  milliseconds
        )
    

    const updateCurrentScale = () => {
        const nextScale = pickAtRandomFromArray(notes);
        const nextNumber = pickAtRandomFromArray(availableNumbers);
        const nextForm = Math.random() > 0.5 ? 'Min' : 'Maj'
        setCurrentScale({scale: nextScale, form: nextForm});
        setCurrentNote(nextNumber);
    }
    
    return (
        <div className={classes.wrapper}>
            <div style={{marginRight: '10px'}}>
                <span style={{fontSize: '120px', marginRight: '3px'}}>{scale}</span>
                <span style={{fontSize: '45px'}}>{form}</span>
            </div>
            <div style={{fontSize: '120px'}}>
                {currentNote}
            </div>
        </div>
    )
}
