import { t } from "i18next";
import { useState, useEffect } from "react";

import processFetchedData from "js/functions/processFetchedData";
import { ReportVariants, ForecastObject } from "types";
import useDispatchAction from "./useDispatchAction";

export const useProcessForecastData = (data: Object | undefined) => {
  const [preparedData, setPreparedData] = useState(undefined as undefined | (string | number)[][]);
  const { showErrorMessage } = useDispatchAction();
  useEffect(() => {
    if (data) {
      try {
        let parameters = processFetchedData[ReportVariants.FORECAST](data as ForecastObject);
        setPreparedData(parameters);
      } catch (err) {
        if (err) {
          showErrorMessage(
            `${t("msgs.invalid_data", {
              type: " funkcji WeatherForecast",
              name: (err as Error).name,
              description: (err as Error).message,
            })} `
          );
        }
      }
    }
  }, [data, showErrorMessage]);
  return preparedData;
};

export default useProcessForecastData;
