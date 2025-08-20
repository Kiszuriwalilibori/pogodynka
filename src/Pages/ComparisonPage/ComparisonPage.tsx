
import { useFetchCurrentWeather, useCreateComparisonData, useFetchComparison, useDelayedCondition } from "hooks";
import { WeatherDataStack } from "styles/Common.styles";
import { showErrorMessage } from "js/Redux/actionCreators";
import { Fade, Typography } from "@mui/material";
import Loader from "components/Loader";
import TabHeader from "components/TabHeader";
import { t } from "i18next";
import { useEffect } from "react";
import ComparisionData from "./ComparisonData";
import { WEATHER_DATA_STACK_SPACING } from "./config";

export const ComparisonPage = () => {
  const { favoritesWeatherDataForComparison, isComparisonLoading, isComparisonError, label } = useFetchComparison();
  const { isCurrentWeatherLoading, currentWeatherDataForComparision } = useFetchCurrentWeather();
  const isLoading = useDelayedCondition(isComparisonLoading || isCurrentWeatherLoading);

const weatherComparisionData = useCreateComparisonData(
    favoritesWeatherDataForComparison,
    currentWeatherDataForComparision
  );

useEffect(() => {
    if (!favoritesWeatherDataForComparison || !currentWeatherDataForComparision) {
      showErrorMessage(t("favs.fetch_error"));
    }
  }, [favoritesWeatherDataForComparison, currentWeatherDataForComparision]);







  useEffect(() => {
    isComparisonError && showErrorMessage(t("favs.fetch_error")); // todo w tym momencie nie rozróżnia sytuacji pojedynczego błędu gdzie powinno dać tylko komentarz ale i wyświetlić resztę od błędu całości. W sumie powinno wywalać ciąg złożony z poszczególnych błędów
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isComparisonError]);

  if (isLoading) return <Loader />;

  if (!weatherComparisionData) return (<
    Typography variant="body1" color="error">
      No favorites selected. Please add some locations to your favorites first.
    </Typography>);
  return (
    <Fade in={true} timeout={400}>
      <WeatherDataStack spacing={WEATHER_DATA_STACK_SPACING}>
        <TabHeader title={label} />
        <ComparisionData parameters={weatherComparisionData} />
      </WeatherDataStack>
    </Fade>
  );
};

export default ComparisonPage;
