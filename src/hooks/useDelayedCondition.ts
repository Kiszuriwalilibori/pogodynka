import { LOADING_DELAY } from "fixtures";
import { useEffect, useRef, useState } from "react";

export const useDelayedCondition = (condition: boolean) => {
  const [delayedCondition, setDelayedCondition] = useState(false);
  const myTimeout = useRef(undefined as undefined | NodeJS.Timeout);
  const startTime = useRef(undefined as undefined | number);

  useEffect(() => {
    if (condition) {
      myTimeout.current = setTimeout(() => {
        setDelayedCondition(true);
        startTime.current = Date.now();
      }, LOADING_DELAY);
    }
    if (!condition) {
      myTimeout.current && clearTimeout(myTimeout.current);
      setDelayedCondition(false);
    }
  }, [condition]);

  return { delayedCondition };
};

export default useDelayedCondition;
