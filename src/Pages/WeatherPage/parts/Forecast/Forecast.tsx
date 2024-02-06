import { Fade } from "@mui/material";

import ForecastData from "./ForecastData";

import { useDelayedCondition, useFetchForecast, useProcessForecastData } from "hooks";
import { usePlaceContext } from "contexts";
import { WeatherDataStack } from "styles/Common.styles";
import { Loader, WeatherPageHeader } from "components";
import { TIMEOUT_SHORT } from "fixtures";

const Forecast = () => {
  const labelForecast = usePlaceContext().place.labelForecast;
  const { data, isLoading } = useFetchForecast();
  const shouldDisplayLoader = useDelayedCondition(isLoading);
  const preparedData = useProcessForecastData(data);

  if (shouldDisplayLoader) return <Loader />;

  if (!preparedData || !preparedData.length) return null;

  return (
    <Fade in={true} timeout={TIMEOUT_SHORT}>
      <WeatherDataStack spacing="50px">
        <WeatherPageHeader title={labelForecast} />
        <ForecastData forecastData={preparedData} />
      </WeatherDataStack>
    </Fade>
  );
};

export default Forecast;
