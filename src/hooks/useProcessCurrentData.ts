import { t } from "i18next";
import { useState, useEffect } from "react";

import processFetchedData from "js/functions/processFetchedData";
import useDispatchAction from "./useDispatchAction";

import { ReportVariants } from "types";

export const useProcessCurrentData = (data: object | undefined) => {
  const [processedData, setProcessedData] = useState(undefined as undefined | string[]); // todo czy to na pewno musi być stan?
  const { showErrorMessage } = useDispatchAction();
  useEffect(() => {
    if (data) {
      try {
        let parameters = processFetchedData[ReportVariants.CURRENT](data);
        if (parameters.length === 0) throw new Error("No parameters found for current weather");
        setProcessedData(parameters);
      } catch (err) {
        if (err) {
          showErrorMessage(
            `${t("msgs.invalid_data", {
              type: " funkcji WeatherCurrent",
              name: (err as Error).name,
              description: (err as Error).message,
            })} `
          );
        }
      }
    }
  }, [data]);
  return processedData;
};

export default useProcessCurrentData;
