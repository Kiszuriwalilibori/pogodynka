import { Fade } from "@mui/material";

import Loader from "components/Loader/Loader";
import TabTitle from "../TabTitle";
import ForecastData from "./ForecastData";

import { useFetchForecast, useProcessForecastData } from "hooks";
import { usePlaceContext } from "contexts";
import { WeatherDataStack } from "Pages/styled";

const Forecast = () => {
  const labelForecast = usePlaceContext().place.labelForecast;
  const { data, isLoading } = useFetchForecast();
  const preparedData = useProcessForecastData(data);

  if (isLoading) return <Loader />;

  if (!preparedData || !preparedData.length) return null;

  return (
    <Fade in={true} timeout={300}>
      <WeatherDataStack spacing="50px">
        <TabTitle title={labelForecast} />
        <ForecastData forecastData={preparedData} />
      </WeatherDataStack>
    </Fade>
  );
};

export default Forecast;
