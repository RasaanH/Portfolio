import React, {useState, useEffect, useRef} from "react";
import classes from './NoteInScaleWindow.module.css';
import { pickAtRandomFromArray } from "../../../Utils/pickAtRandomFromArray";
import metronomeBeat from '../../../audio/metronome-85688.mp3';
import drumBeat from '../../../audio/drumsticks-pro-mark-la-special-2bn-hickory-no4-103712.mp3'

export const NoteInScaleWindow = ({notes, numbers, milliseconds, running, lockedNumber, lockedScale}) => {
    const [{ scale, form }, setCurrentScale] = useState({scale: 'C', form: 'Maj'});
    const [currentNote, setCurrentNote] = useState(1);
    const intervalIdRef = useRef();
    const oneBeat = new Audio(metronomeBeat);
    const otherBeats = new Audio(drumBeat);

    const beatRef = useRef(1);

    useEffect(() => {
        clearInterval(intervalIdRef.current);
        if (running === true) {
            const intervalId = startExercise();
            intervalIdRef.current = intervalId;
            return;
        };
    }, [running, milliseconds, lockedNumber, lockedScale]);

    const updateBeat = () => {
        if (beatRef.current === 1) {
            oneBeat.play();
        } else{
            otherBeats.play();
        }
        if (beatRef.current === 4) {
            beatRef.current = 1;
            return;
        }
        return beatRef.current = beatRef.current + 1
        
    }

    const startExercise = () => 
        setInterval(() => {
            updateBeat();
            updateCurrentScale();
        },  milliseconds
        )
    

    const updateCurrentScale = () => {
        const randomScale = pickAtRandomFromArray(notes);
        const nextScale = lockedScale !== 'none' ? lockedScale : randomScale;
        const randomNumber = pickAtRandomFromArray(numbers);
        const nextNumber = lockedNumber > 0 ? lockedNumber : randomNumber;
        const nextForm = Math.random() > 0.5 ? 'Min' : 'Maj'
        setCurrentScale({scale: nextScale, form: nextForm});
        setCurrentNote(nextNumber);
    }
    
    return (
        <div className={classes.wrapper}>
            <div style={{marginRight: '10px'}}>
                <span className={classes.largeFont} style={{marginRight: '3px'}}>{scale}</span>
                <span className={classes.smallFont}>{form}</span>
            </div>
            <div className={classes.largeFont}>
                {currentNote}
            </div>
        </div>
    )
}
