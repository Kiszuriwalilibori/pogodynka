import { t } from "i18next";
import processFetchedData from "../js/functions/processFetchedData";
import useDispatchAction from "./useDispatchAction";
import { ReportVariants, WeatherDataWithEndpoint, ComparableWeatherData, ComparisonResult } from "types";

function useCreateComparisonData(
  favoritesWeather: WeatherDataWithEndpoint[],
  currentWeather: ComparableWeatherData | undefined
): (string | ComparisonResult)[][] | undefined {
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
          type: "funkcji useCreateComparisonData",
          name: (err as Error).name,
          description: (err as Error).message,
        })} `
      );
    } else {
      showErrorMessage(`W useCreateComparisonData wystąpił błąd nieznanego typu.`);
    }
    return undefined;
  }
}

export default useCreateComparisonData;
