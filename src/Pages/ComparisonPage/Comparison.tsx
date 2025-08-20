import { useEffect } from "react";
import { t } from "i18next";
import { Fade } from "@mui/material";

import ComparisionData from "./ComparisonData";

import { Loader, TabHeader } from "components";
import { useFetchCurrentWeather, useCreateComparisonData, useFetchComparison, useDelayedCondition } from "hooks";
import { WeatherDataStack } from "styles/Common.styles";
import { showErrorMessage } from "js/Redux/actionCreators";
import { WEATHER_DATA_STACK_SPACING } from "./config";

const Comparision = () => {
  const { favoritesWeatherDataForComparison, isComparisonLoading, isComparisonError, label } = useFetchComparison();
  const { isCurrentWeatherLoading, currentWeatherDataForComparision } = useFetchCurrentWeather();
  const isLoading = useDelayedCondition(isComparisonLoading || isCurrentWeatherLoading);

  const weatherComparisionData = useCreateComparisonData(
    favoritesWeatherDataForComparison,
    currentWeatherDataForComparision
  );

  useEffect(() => {
    isComparisonError && showErrorMessage(t("favs.fetch_error")); // todo w tym momencie nie rozróżnia sytuacji pojedynczego błędu gdzie powinno dać tylko komentarz ale i wyświetlić resztę od błędu całości. W sumie powinno wywalać ciąg złożony z poszczególnych błędów
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComparisonError]);

  if (isLoading) return <Loader />;

  if (!weatherComparisionData) return null;
  return (
    <Fade in={true} timeout={400}>
      <WeatherDataStack spacing={WEATHER_DATA_STACK_SPACING}>
        <TabHeader title={label} />
        <ComparisionData parameters={weatherComparisionData} />
      </WeatherDataStack>
    </Fade>
  );
};

export default Comparision;
