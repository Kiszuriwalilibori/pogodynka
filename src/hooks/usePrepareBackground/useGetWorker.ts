import { useMemo } from "react";

export const useGetWorker = () => {
  const getPrepareBackgroundWorker: Worker = useMemo(
    () => new Worker(new URL("./prepareBackgroundWorker.ts", import.meta.url)),
    []
  );
  return getPrepareBackgroundWorker;
};

export default useGetWorker;
