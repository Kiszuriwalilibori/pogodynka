import { useEffect } from "react";

import useGetWorker from "./useGetWorker";

import { setBackground } from "js/functions";
import { useDispatchAction } from "hooks";
import { WorkerMessage } from "./model";

export function usePrepareBackground() {
  const worker = useGetWorker();

  const { setBackgroundReady } = useDispatchAction();
  const isMobile = window.matchMedia("(max-width: 768px)").matches;

  useEffect(() => {
    if (!process.env.REACT_APP_UNSPLASH_ACCESS_KEY) {
      setBackgroundReady();
      return;
    }

    if (window.Worker) {
      worker.postMessage(isMobile);
      worker.onerror = function (e) {
        setBackgroundReady();
      };
      worker.onmessage = (e: MessageEvent<WorkerMessage["on"]>) => {
        if (e.data.error) {
          setBackgroundReady();
        }
        if (e.data.image) {
          const image = e.data.image;
          if (image) {
            setBackground(setBackgroundReady, image);
          } else {
            setBackgroundReady();
          }
        }
      };
    }
  }, []);
}

export default usePrepareBackground;
