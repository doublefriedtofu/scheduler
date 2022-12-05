import React, { useState } from 'react';

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);

  const transition = ((newVal, replace = false) => {
    if (replace) {
      history.pop()
      setHistory([...history, newVal]);
      setMode(newVal);  
    } else {
      setHistory([...history, newVal]);
      setMode(newVal);
    }
  });

  const back = () => {
    if (history.length > 1) {
      history.pop();
    }
    setMode(history[history.length - 1]);
  };

  return { mode: mode, transition: transition, back: back };
}