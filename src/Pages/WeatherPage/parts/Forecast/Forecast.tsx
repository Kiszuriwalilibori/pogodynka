import { Fade } from "@mui/material";

import ForecastData from "./ForecastData";

import { useDelayedCondition, useFetchForecast } from "hooks";
import { usePlaceContext } from "contexts";
import { WeatherDataStack } from "styles/Common.styles";
import { Loader, TabHeader } from "components";
import { TIMEOUT_SHORT } from "fixtures";

const Forecast = () => {
  const labelForecast = usePlaceContext().place.labelForecast;
  const { forecastData, isLoading } = useFetchForecast();
  const shouldDisplayLoader = useDelayedCondition(isLoading);

  if (shouldDisplayLoader) return <Loader />;

  if (!forecastData || !forecastData.length) return null;

  return (
    <Fade in={true} timeout={TIMEOUT_SHORT}>
      <WeatherDataStack spacing="50px">
        <TabHeader title={labelForecast} />
        <ForecastData forecastData={forecastData} />
      </WeatherDataStack>
    </Fade>
  );
};

export default Forecast;
