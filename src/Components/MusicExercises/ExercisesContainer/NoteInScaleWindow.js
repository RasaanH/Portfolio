import React, { useState, useEffect, useRef } from "react";
import classes from "./NoteInScaleWindow.module.css";
import { pickAtRandomFromArray } from "../../../Utils/pickAtRandomFromArray";
import metronomeBeat from "../../../audio/metronome-85688.mp3";
import drumBeat from "../../../audio/drumsticks-pro-mark-la-special-2bn-hickory-no4-103712.mp3";

export const NoteInScaleWindow = ({
  notes,
  numbers,
  milliseconds,
  running,
  lockedNumber,
  lockedScale,
  lockedRoot,
}) => {
  const [{ root, scale }, setCurrentRoot] = useState({
    root: "C",
    scale: "Maj",
  });
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
    }
  }, [running, milliseconds, lockedNumber, lockedScale, lockedRoot]);

  const updateBeat = () => {
    if (beatRef.current === 1) {
      oneBeat.play();
    } else {
      otherBeats.play();
    }
    if (beatRef.current === 4) {
      beatRef.current = 1;
      return;
    }
    return (beatRef.current = beatRef.current + 1);
  };

  const startExercise = () =>
    setInterval(() => {
      updateBeat();
      updateCurrentScale();
    }, milliseconds);

  const updateCurrentScale = () => {
    const randomRoot = pickAtRandomFromArray(notes);
    const nextRoot = lockedRoot !== "none" ? lockedRoot : randomRoot;
    const randomNumber = pickAtRandomFromArray(numbers);
    const nextNumber = lockedNumber > 0 ? lockedNumber : randomNumber;
    const randomScale = Math.random() > 0.5 ? "Min" : "Maj";
    const nextScale = lockedScale !== "none" ? lockedScale : randomScale;
    setCurrentRoot({ root: nextRoot, scale: nextScale });
    setCurrentNote(nextNumber);
  };

  return (
    <div className={classes.wrapper}>
      <div style={{ marginRight: "10px" }}>
        <span className={classes.largeFont} style={{ marginRight: "3px" }}>
          {root}
        </span>
        <span className={classes.smallFont}>{scale}</span>
      </div>
      <div className={classes.largeFont}>{currentNote}</div>
    </div>
  );
};
