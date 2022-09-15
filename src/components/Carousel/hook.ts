import { useState, useEffect, useRef, useCallback } from "react";

export default function useIntervalWithStop(callback: VoidFunction, delay: any) {
  const savedCallback = useRef();
  const intervalId = useRef();
  const [currentDelay, setDelay] = useState(delay);

  const toggleRunning = useCallback(() => {
    setDelay((currentDelayVar: any) => (currentDelayVar === null ? delay : null))
  }, [delay]);

  const clear = useCallback(() => clearInterval(intervalId.current), []);

  useEffect(() => {
    (savedCallback as any).current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    const tick = () => {
      (savedCallback as any).current();
    }
    if (intervalId.current) clear();
    if (currentDelay !== null) {
      (intervalId as any).current = setInterval(tick, currentDelay);
    }
    return clear;
  }, [currentDelay, clear]);

  return [toggleRunning, !!currentDelay];
};