import React, {useState, useEffect, useRef} from "react";
import classes from './NoteInScaleWindow.module.css';
import { pickAtRandomFromArray } from "../../../Utils/pickAtRandomFromArray";
import metronomeBeat from '../../../audio/metronome-85688.mp3';
import drumBeat from '../../../audio/drumsticks-pro-mark-la-special-2bn-hickory-no4-103712.mp3'

export const NoteInScaleWindow = ({notes, milliseconds, running}) => {
    const [{ scale, form }, setCurrentScale] = useState({scale: 'C', form: 'Maj'});
    const [currentNote, setCurrentNote] = useState(1);
    const intervalIdRef = useRef();
    const availableNumbers = [1,2,3,4,5,6,7];
    const oneBeat = new Audio(metronomeBeat);
    const otherBeats = new Audio(drumBeat);

    const beatRef = useRef(1);

    useEffect(() => {
        clearInterval(intervalIdRef.current);
        if (running === true) {
            const intervalId = startExercise();
            console.log({intervalId});
            intervalIdRef.current = intervalId;
            return;
        };
    }, [running, milliseconds]);

    const updateBeat = () => {
        if (beatRef.current === 1) {
            oneBeat.play();
        } else{
            otherBeats.play();
        }
        console.log('oldBeat', beatRef.current)
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
