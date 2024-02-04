import { useEffect, useRef, useState } from "react";

const DELAY = 1000;

export const useDelayedCondition = (condition: boolean, delay = DELAY) => {
  const [delayedCondition, setDelayedCondition] = useState(false);
  const delayTimeout = useRef(undefined as undefined | NodeJS.Timeout);

  useEffect(() => {
    if (condition) {
      delayTimeout.current = setTimeout(() => {
        setDelayedCondition(true);
      }, delay);
    }
    if (!condition) {
      delayTimeout.current && clearTimeout(delayTimeout.current);
      setDelayedCondition(false);
    }
  }, [condition]);

  return { delayedCondition };
};

export default useDelayedCondition;
