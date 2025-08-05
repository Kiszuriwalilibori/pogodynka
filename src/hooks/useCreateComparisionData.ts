import { t } from "i18next";
import processFetchedData from "../js/functions/processFetchedData";
import useDispatchAction from "./useDispatchAction";
import { ReportVariants, WeatherDataWithEndpoint, ComparableWeatherData, ComparisionResult } from "types";

function useCreateComparisionData(
  favoritesWeather: WeatherDataWithEndpoint[],
  currentWeather: ComparableWeatherData | undefined
): (string | ComparisionResult)[][] | undefined {
  const { showErrorMessage } = useDispatchAction();

  try {
    if (favoritesWeather && favoritesWeather.length && currentWeather) {
      return processFetchedData[ReportVariants.COMPARISION](favoritesWeather, currentWeather);
    } else {
      return undefined;
    }
  } catch (err) {
    if (err instanceof Error) {
      showErrorMessage(
        `${t("msgs.invalid_data", {
          type: "funkcji useCreateComparisionData",
          name: (err as Error).name,
          description: (err as Error).message,
        })} `
      );
    } else {
      showErrorMessage(`W useCreateComparisionData wystąpił błąd nieznanego typu.`);
    }
    return undefined;
  }
}

export default useCreateComparisionData;
