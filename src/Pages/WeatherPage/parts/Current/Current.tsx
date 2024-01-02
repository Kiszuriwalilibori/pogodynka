import { Fade } from "@mui/material";

import TabTitle from "../TabTitle";
import Loader from "components/Loader/Loader";

import { usePlaceContext } from "contexts";
import { useFetchCurrentWeather } from "hooks";
import { CurrentData } from "./parts";
import { WeatherDataStack } from "Pages/styled";
import { TIMEOUT_SHORT } from "fixtures";

import "./_CurrentWeather.scss";

const Current = () => {
  const { labelCurrent } = { ...usePlaceContext().place };

  const { currentWeatherData, isCurrentWeatherLoading } = useFetchCurrentWeather();

  if (!navigator.onLine) return null;
  if (isCurrentWeatherLoading) return <Loader />;
  if (!currentWeatherData) return null;

  return (
    <Fade in={true} timeout={TIMEOUT_SHORT}>
      <WeatherDataStack spacing="50px">
        <TabTitle title={labelCurrent} />
        <CurrentData weatherData={currentWeatherData} />
      </WeatherDataStack>
    </Fade>
  );
};

export default Current;
